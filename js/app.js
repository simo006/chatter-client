import { render } from './util/lib.js';
import { updateUserNav } from './views/nav.js';
import * as router from './router.js';


const root = document.querySelector('.main-content');
const header = document.querySelector('.header');
const context = {
    render: template => render(template, root),
    renderHeader: template => render(template, header),
    updateUserNav
};

updateUserNav(context, 'home');

router.decorateContext(context);
router.loadRoutes();
router.start();