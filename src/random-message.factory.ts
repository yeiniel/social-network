import { Message } from "./message.js";

export function randomMessageFactory(): Message {
    return `Some Random Message ${Math.round(Math.random() * 1000)}`;
}