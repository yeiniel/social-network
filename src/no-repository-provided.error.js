export class NoRepositoryProvidedError extends Error {
    constructor() {
        super('No repository provided');
    }
}
