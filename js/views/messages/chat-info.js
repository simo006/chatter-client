import { html } from '../../util/lib.js';
import { messageBubbleTemplate } from './message-bubble.js';


export const chatInfoTemplate = ({ id, members, name, messages }, onChatSend) => {
    return html`
    <div class="card-body d-flex flex-column justify-content-between">
        <h3 class="h4 mb-3 flex-shrink-0">${name}</h3>
        <div style="max-height: 550px" class="border-top py-2 message-holder">
            ${messages.map(m => messageBubbleTemplate(m))}
        </div>
    </div>
    <div class="card-footer">
        <form @submit=${onChatSend}>
            <div class="my-2 d-flex">
                <input class="form-control" name="message">
                <button class="btn btn-link" type="submit"><i class="fa-solid fa-paper-plane fa-xl"></i></button>
            </div>
        </form>
    </div>`;
}