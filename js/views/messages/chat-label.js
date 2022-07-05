import { html } from '../../util/lib.js';
import { timespan } from '../../util/timespan.js';


export const chatLabelTemplate = ({ id, names, lastMessage, sender, dateTimeSent, seen, online }, onChatClick, activeChatId) => {
    let messageInfo;
    if (sender) {
        messageInfo = html`<small>${sender}: ${lastMessage.truncate(30)} . ${timespan(dateTimeSent)}</small>`;
    } else {
        messageInfo = html`Say hello to your new friend!</small>`;
    }
    
    const status = html`<span class="ms-1 dot-online"></span>`;

    return html`
    <button @click=${onChatClick} data-chat-id="${id}" class="list-group-item list-group-item-action 
        ${activeChatId && activeChatId == id ? 'active' : ''} ${seen ? 'seen' : ''}">
        <p class="mb-1">${names} ${online ? status : ''}</p>
        ${messageInfo}
    </button>`;
}