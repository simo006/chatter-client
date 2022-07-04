import { Stomp, SockJS } from "./util/lib";


let stompClient = null;
let subscribedRooms = {};


export const stompHandler = {
    connectToSocket,
    subscribeToRoom,
    sendMessageToChatRoom,
    closeSocketConnection
};

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

            eventHandler();
        });
    }
}

function subscribeToRoom(roomName, eventHandler) {
    if (stompClient !== null && stompClient.connected) {
        if (!subscribedRooms.hasOwnProperty(roomName)) {
            const subsciption = stompClient.subscribe(roomName, eventHandler);
            subscribedRooms[roomName] = subsciption;
        }
    }
}

function sendMessageToChatRoom(chatId, message, eventHandler) {
    if (stompClient !== null && stompClient.connected) {
        stompClient.send('/app/chat-room/' + chatId, {}, JSON.stringify(message), eventHandler);
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