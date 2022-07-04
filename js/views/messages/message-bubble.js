import { html } from '../../util/lib.js';
import { getUserData } from '../../util/storage.js';

const currentUserEmail = getUserData() ? getUserData()['email'] : undefined;

export const messageBubbleTemplate = ({ id, sender, senderEmail, message, dateTimeSent }) => {
    dateTimeSent = new Date(dateTimeSent);
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    const dateFormatted = dateTimeSent.toLocaleDateString('bg-BG', options);

    return html`
    <div class="card border-0 message-bubble ${isCurrentUser(senderEmail) ? 'my-bubble': ''} my-3 mx-3 w-75">
        <div class="card-body">
            <h4 class="h6 fw-bold ${isCurrentUser(senderEmail) ? 'text-end': 'text-start'}">${sender}</h4>
            <p class="${isCurrentUser(senderEmail) ? 'text-end': 'text-start'} mb-1">${message}</p>
            <small class="text-end d-block fst-italic">${dateFormatted}</small>
        </div>
    </div>`;
}

function isCurrentUser(senderEmail) {
    return currentUserEmail === senderEmail;
}