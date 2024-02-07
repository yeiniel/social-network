import { describe, expect, it } from "@jest/globals";
import { postMessageToPersonalTimelineInteractor } from "./post-message-to-personal-timeline.interactor";
import { NoRepositoryProvidedError } from "./no-repository-provided.error";

describe(postMessageToPersonalTimelineInteractor.name, () => {
    it('should fail if repository not provided', () => {
        const repository = undefined;
        const owner = `some-user-${Math.round(Math.random() * 1000)}`;
        const message = `some-message-${Math.round(Math.random() * 1000)}`;

        expect(postMessageToPersonalTimelineInteractor(repository, owner, message))
            .rejects.toThrow(NoRepositoryProvidedError);
    });
});