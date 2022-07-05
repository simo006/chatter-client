import { render } from './util/lib.js';
import { updateUserNav } from './views/nav.js';
import { hasUserData } from './util/storage.js';
import { stompHandler } from './socket.js';
import * as router from './router.js';
import './util/helpers.js';


const root = document.querySelector('.main-content');
const header = document.querySelector('.header');
const context = {
    render: template => render(template, root),
    renderHeader: template => render(template, header),
    updateUserNav
};

updateUserNav(context, 'home');

if (hasUserData()) {
    stompHandler.connectToSocket(startRouter);
} else {
    startRouter();
}

function startRouter() {
    router.decorateContext(context);
    router.loadRoutes();
    router.start();
}