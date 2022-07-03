import { page } from './util/lib.js';
import { loginPage } from './views/login.js';
import { registerPage } from './views/register.js';
import { homePage } from './views/home.js';
import { messagesPage } from './views/messages/messages.js';
import { aboutPage } from './views/about.js';

/**
 * Register all application routes
 */
export function loadRoutes() {
    page('/home', homePage);
    page('/login', loginPage);
    page('/register', registerPage);
    page('/messages', messagesPage);
    page('/messages/:chatId', messagesPage);
    page('/about', aboutPage);
    page('/', '/home');
}

/**
 * Decorate context with useful functions for every view
 * @param  {Object} addons
 */
export function decorateContext(addons) {
    page((ctx, next) => {
        Object.assign(ctx, addons);
        next();
    });
}

/**
 * Start the routes
 */
export function start() {
    page.start();
}