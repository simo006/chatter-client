import * as api from './requester.js';


const endPoints = {
    chats: '/chats',
    chat: id => '/chats/' + id
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