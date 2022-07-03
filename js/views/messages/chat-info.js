import { html } from '../../util/lib.js';


export const chatInfoTemplate = ({ members, name, messages }) => {
    // let messageInfo;
    // if (sender) {
    //     messageInfo = html`<small>${sender}: ${lastMessage.truncate(30)} . ${timespan(dateTimeSent)}</small>`;
    // } else {
    //     messageInfo = html`Say hello to your new friend!</small>`;
    // }

    return html`
    <div class="card-body">
        <h3 class="h4 mb-3">${name}</h3>
    </div>`;
}