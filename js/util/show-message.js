import { Swal } from './lib';


export function showError(error, message) {
    setTimeout(() => {
        Swal.fire({
            icon: 'error',
            title: error,
            text: message
        });
    }, 100);
}