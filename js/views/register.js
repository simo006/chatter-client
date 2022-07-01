import { html } from '../util/lib.js';
import { register } from '../api/data.js';


const registerTemplate = (onSubmit) => html`
<section class="register-page floating-form">
    <form @submit="${onSubmit}">
        <h3>Register Form</h3>

        <p class="field">
            <label for="email">Email</label>
            <span class="input">
                <input type="text" name="email" id="email" placeholder="Email">
            </span>
        </p>

        <p class="field">
            <label for="password">Password</label>
            <span class="input">
                <input type="password" name="password" id="password" placeholder="Password">
            </span>
        </p>

        <p class="field">
            <label for="repeat-pass">Repeat Password</label>
            <span class="input">
                <input type="password" name="confirm-pass" id="repeat-pass" placeholder="Repeat Password">
            </span>
        </p>

        <p class="field">
            <label for="repeat-pass">First Name</label>
            <span class="input">
                <input type="password" name="confirm-pass" id="repeat-pass" placeholder="Repeat Password">
            </span>
        </p>

        <p class="field">
            <label for="repeat-pass">Repeat Password</label>
            <span class="input">
                <input type="password" name="confirm-pass" id="repeat-pass" placeholder="Repeat Password">
            </span>
        </p>

        <p class="field">
            <label for="repeat-pass">Repeat Password</label>
            <span class="input">
                <input type="password" name="confirm-pass" id="repeat-pass" placeholder="Repeat Password">
            </span>
        </p>

        <input class="button submit" type="submit" value="Register">
    </form>
</section>`;

/**
 * Events happening when the page is loading
 * @param  {Context} context - useful functions passed by the router
 */
export function registerPage(context) {
    context.render(registerTemplate(onSubmit));
    context.updateUserNav(context, 'register');

    async function onSubmit(event) {
        event.preventDefault();

        const formData = new FormData(event.target);
        const email = formData.get('email').trim();
        const password = formData.get('password').trim();
        const confirmPassword = formData.get('confirm-pass').trim();
        const firstName = formData.get('first-name').trim();
        const lastName = formData.get('last-name').trim();
        const age = formData.get('age').trim();

        if (email === '' || password === '') {
            return alert('All fields are required');
        }

        if (password !== confirmPassword) {
            return alert('Passwords don\'t match');
        }

        await register(email, password, confirmPassword, firstName, lastName, age);

        context.updateUserNav(context, 'messages');
        context.page.redirect('/messages');
    }
}
