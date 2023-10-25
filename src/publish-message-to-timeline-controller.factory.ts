import { NextFunction, Request, Response } from "express";
import { PublishMessageToTimelineInteractor } from "./publish-message-to-timeline.interactor.js";
import { userFromOIDCUser } from "./user-from-oidc-user.js";
import { MessageRequiredError } from "./message-required.error.js";

export function publishMessageToTimelineControllerFactory(publishMessageToTimelineInteractor: PublishMessageToTimelineInteractor) {
    return async function publishMessageToTimelineController(req: Request, res: Response, next: NextFunction) {
        try {
            if (!Object.keys(req.body).length) {
                throw new MessageRequiredError();
            }

            res.status(200);
            res.write(JSON.stringify(await publishMessageToTimelineInteractor(userFromOIDCUser(req.oidc.user!), req.body)));
            res.end();
        } catch (err) {
            next(err);
        }
    };
}
