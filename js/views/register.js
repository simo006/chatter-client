import { html } from '../util/lib.js';
import { register } from '../api/data.js';
import { showError } from '../util/show-message.js';


const registerTemplate = onSubmit => html`
<section class="register-page floating-form">
    <form @submit="${onSubmit}">
        <h1 class="h3 mb-3 fw-normal">Please register</h1>

        <div class="form-floating mb-3">
            <input type="email" class="form-control" id="email" name="email" placeholder="name@example.com" required>
            <label for="email">Email address</label>
        </div>

        <div class="form-floating mb-3">
            <input type="password" class="form-control" id="password" name="password" autocomplete="off" required>
            <label for="password">Password</label>
        </div>

        <div class="form-floating mb-3">
            <input type="password" class="form-control" id="confirm-pass" name="confirmPassword" autocomplete="off"
                required>
            <label for="confirm-pass">Repeat password</label>
        </div>

        <div class="form-floating mb-3">
            <input class="form-control" id="first-name" name="firstName" required>
            <label for="first-name">First name</label>
        </div>

        <div class="form-floating mb-3">
            <input class="form-control" id="last-name" name="lastName" required>
            <label for="last-name">Last name</label>
        </div>

        <div class="form-floating mb-3">
            <input type="number" class="form-control" id="age" name="age" required>
            <label for="age">Age</label>
        </div>

        <button class="w-100 btn btn-lg btn-primary mt-2" type="submit">Register</button>
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
        const confirmPassword = formData.get('confirmPassword').trim();
        const firstName = formData.get('firstName').trim();
        const lastName = formData.get('lastName').trim();
        const age = formData.get('age').trim();

        if (password !== confirmPassword) {
            return showError('Error', 'Passwords don\'t match');
        }

        try {
            await register(email, password, confirmPassword, firstName, lastName, age);

            context.updateUserNav(context, 'messages');
            context.page.redirect('/messages');
        } catch (err) {
            showError('Registration error', err.message);
        }
    }
}
