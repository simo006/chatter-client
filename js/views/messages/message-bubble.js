import { html } from '../../util/lib.js';


export const messageBubbleTemplate = ({ id, sender, message, dateTimeSent, currentUser }) => {
    dateTimeSent = new Date(dateTimeSent);
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    const dateFormatted = dateTimeSent.toLocaleDateString('bg-BG', options);

    return html`
    <div class="card border-0 message-bubble ${currentUser ? 'my-bubble': ''} my-3 mx-3 w-75">
        <div class="card-body">
            <h4 class="h6 fw-bold ${currentUser ? 'text-start': 'text-end'}">${sender}</h4>
            <p class="${currentUser ? 'text-start': 'text-end'} mb-1">${message}</p>
            <small class="text-end d-block fst-italic">${dateFormatted}</small>
        </div>
    </div>`;
}