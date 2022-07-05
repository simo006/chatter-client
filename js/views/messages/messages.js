import { html } from '../../util/lib.js';
import { chatLabelTemplate } from './chat-label.js';
import { chatInfoTemplate } from './chat-info.js';
import { getChats, getChat, getUserChatRooms } from '../../api/data.js';
import { showError } from '../../util/show-message.js';
import { stompHandler } from '../../socket.js';
import { AuthenticationError } from '../../error/AuthenticationError.js';
import { getUserData, removeUserData } from '../../util/storage.js';


const messagesTemplate = (chats, onChatClick, activeChat, onChatSend) => {
    let chatLabels = '';
    if (Object.keys(chats).length > 0) {
        chatLabels = Object.values(chats).map(c => chatLabelTemplate(c, onChatClick, activeChat ? activeChat['id'] : undefined));
    }

    let chatInfoView = html`
    <div class="card-body">
        <h3 class="h4 mb-3">No chat opened</h3>
    </div>`;

    if (activeChat) {
        chatInfoView = chatInfoTemplate(activeChat, onChatSend);
    }

    return html`
    <section class="messages-page container">
        <div class="row">
            <div class="col-4">
                <div class="card border-0 floating-sidebar">
                    <div class="card-body">
                        <h2 class="h4 mb-3">Messages</h2>
                        <div class="list-group message-list">
                            ${chatLabels}
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-8">
                <div class="card border-0 floating-sidebar">
                    ${chatInfoView}
                </div>
            </div>
        </div>
    </section>`
};

let activeChat = {}, chats = {};

/**
 * Events happening when the page is loading
 * @param  {Context} context - useful functions passed by the router
 */
export async function messagesPage(context) {
    context.updateUserNav(context, 'messages');
    const chatId = Number(context.params['chatId']);

    stompHandler.subscribeToRoom('/user/queue/status', updateUserStatusHandler);
    stompHandler.sendStatusRefresh();

    try {
        const userChatRooms = (await getUserChatRooms())['data'];
        userChatRooms.forEach(r => stompHandler.subscribeToRoom(r, receivedChatHandler));

        (await getChats())['data'].forEach(chat => {
            let online;
            if (chats.hasOwnProperty(chat['id'])) {
                online = chats[chat['id']]['online'];
            }

            chats[chat['id']] = chat;
            chats[chat['id']]['online'] = online;
        });

        if (chatId > 0) {
            stompHandler.sendSeenChatNotification(chatId);

            const newChat = (await getChat(chatId))['data'];
            if (newChat['id'] === activeChat['id']) {
                activeChat['messages'] = newChat['messages'];
            } else {
                activeChat = newChat;
            }
        }

        context.render(messagesTemplate(chats, onChatClick, activeChat, onChatSend));
    } catch (err) {
        if (err instanceof AuthenticationError) {
            removeUserData();
            context.page.redirect('/home');

            showError('Authentication error', err.message);
        } else {
            showError(err.error, err.message);
        }
    }

    async function onChatClick(event) {
        let button = event.target;
        if (button.nodeName !== 'BUTTON') {
            button = button.parentElement;
        }

        const chatId = button.dataset.chatId;

        Array.from(button.parentElement.children).forEach(e => e.classList.remove('active'));
        button.classList.add('active');

        if (!chats[chatId]['seen']) {
            chats[chatId]['seen'] = true;
            stompHandler.sendSeenChatNotification(chatId);
        }

        context.page.redirect(`/messages/${chatId}`);
    }

    async function onChatSend(event) {
        event.preventDefault();

        stompHandler.sendStatusRefresh();

        const form = event.target;
        const formData = new FormData(form);
        const message = formData.get('message').trim();
        const chatId = Number(context.params['chatId']);

        if (message !== '') {
            try {
                stompHandler.sendMessageToChatRoom(chatId, message);

                form.reset();
            } catch (err) {
                if (err instanceof AuthenticationError) {
                    removeUserData();
                    form.reset();

                    context.page.redirect('/home');

                    showError('Authentication error', err.message);
                } else {
                    showError(err.error, err.message);
                }
            }
        }
    }

    async function receivedChatHandler(messageOutput) {
        if (messageOutput.body) {
            const message = JSON.parse(messageOutput.body);

            if (message['sender'] && message['senderEmail']) {
                const chatId = message['chatId'];

                // the user is in the chat
                if (activeChat && activeChat['id'] === chatId) {
                    activeChat['messages'].unshift(message);

                    stompHandler.sendSeenChatNotification(chatId);
                } else {
                    chats[chatId]['seen'] = false;
                }

                chats[chatId]['lastMessage'] = message['message'];
                chats[chatId]['dateTimeSent'] = message['dateTimeSent'];
                chats[chatId]['sender'] = message['sender'];
                if (message['senderEmail'] === getUserData()['email']) {
                    chats[chatId]['sender'] = 'You';
                }
            } else {
                if (message['userEmail'] !== getUserData()['email']) {
                    if (!chats[message['chatId']].hasOwnProperty('seenBy')) {
                        chats[message['chatId']]['seenBy'] = [];
                    }

                    chats[message['chatId']]['seenBy'].push(message['names']);
                }
            }
        }

        context.render(messagesTemplate(chats, onChatClick, activeChat, onChatSend));
    }

    async function updateUserStatusHandler(messageOutput) {
        if (messageOutput.body) {
            const message = JSON.parse(messageOutput.body).payload;
            const chatId = Number(context.params['chatId']);

            if (!message['sendTo']) {
                stompHandler.sendStatusUpdate('ONLINE', message['senderEmail']);
            }

            if (context.page.current.startsWith('/messages')) {
                for (const chatId in chats) {
                    if (chats[chatId]['email'] === message['senderEmail']) {
                        chats[chatId]['online'] = true;
                        break;
                    }
                }

                if (chatId > 0) {
                    if (activeChat && activeChat['email'] === message['senderEmail']) {
                        activeChat['online'] = true;
                    }
                }

                context.render(messagesTemplate(chats, onChatClick, activeChat, onChatSend));
            }
        }
    }
}