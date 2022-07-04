import { html } from '../../util/lib.js';
import { messageBubbleTemplate } from './message-bubble.js';


export const chatInfoTemplate = ({ id, members, name, messages }, active, onChatSend) => {
    return html`
    <div class="card-body d-flex flex-column justify-content-between">
        <h3 class="h4 mb-3 flex-shrink-0 d-flex align-items-center">
            ${name}
            <span class="ms-2 badge rounded-pill ${active ? 'bg-success' : 'bg-secondary'}">${active ? 'Online' : 'Offline'}</span>
        </h3>
        <div class="border-top py-2 message-holder">
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