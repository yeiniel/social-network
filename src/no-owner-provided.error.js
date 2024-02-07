export class NoOwnerProvidedError extends Error {
    constructor() {
        super('No owner provided');
    }
}
