import { html } from '../../util/lib.js';
import { chatLabelTemplate } from './chat-label.js';
import { chatInfoTemplate } from './chat-info.js';
import { getChats, getChat } from '../../api/data.js';
import { showError } from '../../util/show-message.js';
import { AuthenticationError} from '../../error/AuthenticationError.js';


const messagesTemplate = (chats, onChatClick, activeChat) => {
    let chatLabels = '';
    if (chats.length > 0) {
        chatLabels = chats.map(c => chatLabelTemplate(c, onChatClick));
    }

    let chatInfoView = html`
    <div class="card-body">
        <h3 class="h4 mb-3">No chat opened</h3>
    </div>`;

    if (activeChat) {
        chatInfoView = chatInfoTemplate(activeChat);
    }

    return html`
    <section class="messages-page height-100 container">
        <div class="row height-100">
            <div class="col-4">
                <div class="card border-0 floating-sidebar">
                    <div class="card-body">
                        <h2 class="h4 mb-3">Messages</h2>
                        <div class="list-group">
                            ${chatLabels}
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-8">
                <div class="card border-0 floating-sidebar height-100">
                    ${chatInfoView}
                </div>
            </div>
        </div>
    </section>`
};

/**
 * Events happening when the page is loading
 * @param  {Context} context - useful functions passed by the router
 */
export async function messagesPage(context) {
    try {
        const chats = await getChats();

        if (context.params && Number(context.params['chatId']) > 0) {
            const activeChat = await getChat(Number(context.params['chatId']));

            context.render(messagesTemplate(chats['data'], onChatClick, activeChat['data']));
        } else {
            context.render(messagesTemplate(chats['data'], onChatClick));
        }

        context.updateUserNav(context, 'messages');
    } catch(err) {
        if (err instanceof AuthenticationError) {
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

        context.page.redirect('/messages/' + button.dataset.chatId);
    }
}