
export class MessageRequiredError extends Error {
    constructor() {
        super("Message is required");
    }
}
