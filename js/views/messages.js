import { html } from '../util/lib.js';


const messagesTemplate = () => html`
<section class="messages-page">
    <h2>Messages page</h2>
</section>`;

/**
 * Events happening when the page is loading
 * @param  {Context} context - useful functions passed by the router
 */
export function messagesPage(context) {
    context.render(messagesTemplate());
    context.updateUserNav(context, 'messages');
}