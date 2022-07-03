import { html } from '../../util/lib.js';
import { timespan } from '../../util/timespan.js';


export const chatLabelTemplate = ({ id, names, lastMessage, sender, dateTimeSent }, onChatClick, activeChatId) => {
    let messageInfo;
    if (sender) {
        messageInfo = html`<small>${sender}: ${lastMessage.truncate(30)} . ${timespan(dateTimeSent)}</small>`;
    } else {
        messageInfo = html`Say hello to your new friend!</small>`;
    }

    return html`
    <button @click=${onChatClick} data-chat-id="${id}" class="list-group-item list-group-item-action 
        ${activeChatId && activeChatId == id ? 'active' : ''}">
        <p class="mb-1">${names}</p>
        ${messageInfo}
    </button>`;
}