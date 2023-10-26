import express from "express";
import { auth } from "express-openid-connect";
import { PublishMessageToTimelineInteractor } from "./publish-message-to-timeline.interactor.js";
import { publishMessageToTimelineControllerFactory } from "./publish-message-to-timeline-controller.factory.js";
import { publishMessageToTimelinePresenter } from "./publish-message-to-timeline.presenter.js";

export function applicationFactory(
    publishMessageToTimelineInteractor: PublishMessageToTimelineInteractor,
    authMiddlewareFactory = auth,
    publishMessageToTimelineControllerFactoryImpl: typeof publishMessageToTimelineControllerFactory = publishMessageToTimelineControllerFactory,
    urlencodedMiddlewareFactory = express.urlencoded,
    expressFactory = express
) {
    const app = expressFactory();

    app.use(authMiddlewareFactory());
    app.use(urlencodedMiddlewareFactory());

    app.route("/compose")
        .get(publishMessageToTimelinePresenter)
        .post(publishMessageToTimelineControllerFactoryImpl(publishMessageToTimelineInteractor));

    return app;
}

