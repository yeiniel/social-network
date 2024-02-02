import { User } from "../user.js";

export function randomUserFactory(): User {
    return `some-random-user-${Math.round(Math.random() * 1000)}`;
}