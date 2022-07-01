import { Swal } from './lib';


export function showError(error, message) {
    Swal.fire({
        icon: 'error',
        title: error,
        text: message
    });
}