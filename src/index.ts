import { applicationFactory } from "./application.factory.js";
import { inMemoryStoreFactory } from "./in-memory-store.factory.js";
import { publishMessageToTimelineInteractorFactory } from "./publish-message-to-timeline-interactor.factory.js";

const app = applicationFactory(
    publishMessageToTimelineInteractorFactory(
        inMemoryStoreFactory(new Map())
    )
);

const port = process.env["PORT"] ?? 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});