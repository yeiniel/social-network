import { Request } from "express";
import { User } from "./user.js";

export function userFromOIDCUser(user: Exclude<Request['oidc']['user'], undefined>): User {
    return {
        ...user,
        id: user["sub"]
    };
}
