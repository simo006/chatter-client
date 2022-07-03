export class AuthenticationError extends Error {
    constructor() {
        super('You need to login again!');
    }
}