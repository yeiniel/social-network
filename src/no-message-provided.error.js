export class NoMessageProvidedError extends Error {
    constructor() {
        super('No message provided');
    }
}
