import { Stomp, SockJS } from "./util/lib";
import { getUserData } from "./util/storage";


let stompClient = null;
let subscribedRooms = {};

function connectToSocket(eventHandler) {
    if (stompClient === null || !stompClient.connected) {
        stompClient = Stomp.over(() => new SockJS('http://localhost:3000/chat'));
        stompClient.reconnectDelay = 5000;
        stompClient.heartbeat.outgoing = 20000;
        stompClient.heartbeat.incoming = 0;

        stompClient.connect({}, () => {
            // reconnection
            if (stompClient !== null || stompClient.connected) {
                resubscribeToRooms();
            }

            // sendStatusRefresh();

            eventHandler();
        }, err => {
            console.log(err);
        });
    }
}

function subscribeToRoom(roomName, eventHandler) {
    if (stompClient !== null && stompClient.connected) {
        if (!subscribedRooms.hasOwnProperty(roomName)) {
            const subsciption = stompClient.subscribe(roomName, eventHandler);
            subscribedRooms[roomName] = subsciption;
        }

        return subscribedRooms[roomName];
    }
}

function sendMessageToChatRoom(chatId, message) {
    if (stompClient !== null && stompClient.connected) {
        stompClient.send(`/app/chat-room/${chatId}`, {}, JSON.stringify({ message }));
    }
}

function sendSeenChatNotification(chatId) {
    if (stompClient !== null && stompClient.connected) {
        stompClient.send(`/app/chat-room/${chatId}/seen`)
    }
}

function sendStatusUpdate(status, sendTo) {
    if (stompClient !== null && stompClient.connected) {
        stompClient.send('/app/friend/status', {}, JSON.stringify({
            status,
            senderEmail: getUserData()['email'],
            sendTo
        }));
    }
}

function sendStatusRefresh() {
    if (stompClient !== null && stompClient.connected) {
        stompClient.send('/app/friends/status', {}, JSON.stringify({
            status: 'ONLINE',
            senderEmail: getUserData()['email']
        }));
    }
}

function closeSocketConnection(eventHandler) {
    stompClient.disconnect(() => {
        subscribedRooms = {};

        eventHandler();
    });
}

function resubscribeToRooms() {
    Object.keys(subscribedRooms).forEach(room => {
        subscribeToRoom(room);
    })
}

export const stompHandler = {
    connectToSocket,
    subscribeToRoom,
    sendMessageToChatRoom,
    sendStatusUpdate,
    sendStatusRefresh,
    closeSocketConnection,
    sendSeenChatNotification
};