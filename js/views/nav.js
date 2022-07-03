import { hasUserData } from '../util/storage.js';
import { logout } from '../api/data.js';
import { html } from '../util/lib.js';


const headerTemplate = (isLogged, activePage, onLogout) => {
    let messagesButton = '';
    let logoutButton = '';
    let loginButton = '';
    let registerButton = '';

    if (isLogged) {
        messagesButton = html`
        <li>
            <a href="/messages" class="nav-link ${activePage === 'messages' ? 'active' : ''}">
                <span class="d-block mx-auto mb-1 text-center">
                    <i class="fa-solid fa-message fa-lg"></i>
                </span>
                Messages
            </a>
        </li>`;

        logoutButton = html`
        <li>
            <a @click=${onLogout} href="/logout" class="nav-link">
                <span class="d-block mx-auto mb-1 text-center">
                    <i class="fa-solid fa-arrow-right-to-bracket fa-lg"></i>
                </span>
                Logout
            </a>
        </li>`;
    } else {
        loginButton = html`
        <li>
            <a href="/login" class="nav-link ${activePage === 'login' ? 'active' : ''}">
                <span class="d-block mx-auto mb-1 text-center">
                    <i class="fa-solid fa-arrow-right-to-bracket fa-lg"></i>
                </span>
                Login
            </a>
        </li>`;

        registerButton = html`
        <li>
            <a href="/register" class="nav-link ${activePage === 'register' ? 'active' : ''}">
                <span class="d-block mx-auto mb-1 text-center">
                    <i class="fa-solid fa-plus fa-lg"></i>
                </span>
                Register
            </a>
        </li>`;
    }

    return html`
    <div class="px-3 py-2 bg-dark text-white">
        <div class="container">
            <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                <a href="/home"
                    class="d-flex align-items-center my-2 my-lg-0 me-lg-auto text-white text-decoration-none">
                    <i class="fa-brands fa-rocketchat me-2"></i>
                    <span class="lead">Chatter</span>
                </a>
    
                <ul class="nav col-12 col-lg-auto my-2 justify-content-center my-md-0 text-small">
                    <li>
                        <a href="/home" class="nav-link ${activePage === 'home' ? 'active' : ''}">
                            <span class="d-block mx-auto mb-1 text-center">
                                <i class="fa-solid fa-house fa-lg"></i>
                            </span>
                            Home
                        </a>
                    </li>
                    ${messagesButton}
                    ${loginButton}
                    ${registerButton}
                    ${logoutButton}
                    <li>
                        <a href="/about" class="nav-link ${activePage === 'about' ? 'active' : ''}">
                            <span class="d-block mx-auto mb-1 text-center">
                                <i class="fa-solid fa-info fa-lg"></i>
                            </span>
                            About
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </div>`;
}

/**
 * Events happening when the page is loading
 * @param  {Context} context - useful functions passed by the router
 */
export function updateUserNav(context, activePage) {
    context.renderHeader(headerTemplate(hasUserData(), activePage, onLogout));

    async function onLogout(event) {
        event.preventDefault();

        logout();

        context.updateUserNav(context);
        context.page.redirect('/home');
    }
}
