import { stompHandler } from '../socket.js';
import { html } from '../util/lib.js';


const homeTemplate = () => html`
<section class="home-page">
    <h2>Home page</h2>
</section>`;

/**
 * Events happening when the page is loading
 * @param  {Context} context - useful functions passed by the router
 */
export function homePage(context) {
    context.render(homeTemplate());
    context.updateUserNav(context, 'home');

    stompHandler.sendStatusRefresh();
}