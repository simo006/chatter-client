import { html } from '../util/lib.js';
import { login } from '../api/data.js';
import { showError } from '../util/show-message';


const loginTemplate = onSubmit => html`
<section class="login-page floating-form">
    <form @submit="${onSubmit}">
        <h1 class="h3 mb-3 fw-normal">Please login</h1>

        <div class="form-floating mb-3">
            <input type="email" class="form-control" id="email" name="email" placeholder="name@example.com" required>
            <label for="email">Email address</label>
        </div>

        <div class="form-floating mb-3">
            <input type="password" class="form-control" id="password" name="password" autocomplete="off" required>
            <label for="password">Password</label>
        </div>

        <button class="w-100 btn btn-lg btn-primary mt-2" type="submit">Login</button>
    </form>
</section>`;

/**
 * Events happening when the page is loading
 * @param  {Context} context - useful functions passed by the router
 */
export function loginPage(context) {
    context.render(loginTemplate(onSubmit));
    context.updateUserNav(context, 'login');

    async function onSubmit(event) {
        event.preventDefault();

        const formData = new FormData(event.target);
        const email = formData.get('email').trim();
        const password = formData.get('password').trim();

        try {
            await login(email, password);

            context.updateUserNav(context, 'messages');
            context.page.redirect('/messages');
        } catch (err) {
            showError('Authentication error', err.message);
        }
    }
}
