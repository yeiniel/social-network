import { Message } from "../message.js";

export function randomMessageFactory(): Message {
    return `random message ${Math.round(Math.random() * 1000)}`;
}