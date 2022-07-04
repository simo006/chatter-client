import * as api from './requester.js';


const endPoints = {
    chats: '/chats',
    chat: id => '/chats/' + id,
    sendMessage: id => '/chats/' + id,
    userRooms: '/auth/user-rooms',
    userChatRooms: '/auth/user-chat-rooms'
};

export const login = api.login;
export const register = api.register;
export const logout = api.logout;

export async function getChats() {
    return await api.get(endPoints.chats);
}

export async function getChat(id) {
    return await api.get(endPoints.chat(id));
}

export async function sendMessage(chatId, message) {
    return await api.post(endPoints.sendMessage(chatId), { message });
}

export async function getUserRooms() {
    return await api.get(endPoints.userRooms);
}

export async function getUserChatRooms() {
    return await api.get(endPoints.userChatRooms);
}