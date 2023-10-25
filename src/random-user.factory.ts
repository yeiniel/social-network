import { User } from "./user.js";

export function randomUserFactory(): User {
    return {
        id: `some-random-user-id-${Math.round(Math.random() * 1000)}`
    };
}