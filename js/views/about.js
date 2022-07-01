import { html } from '../util/lib.js';


const aboutTemplate = () => html`
<section class="about-page">
    <h2>About page</h2>
</section>`;

/**
 * Events happening when the page is loading
 * @param  {Context} context - useful functions passed by the router
 */
export function aboutPage(context) {
    context.render(aboutTemplate());
    context.updateUserNav(context, 'about');
}