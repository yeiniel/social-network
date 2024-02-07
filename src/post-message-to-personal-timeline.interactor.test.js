import { beforeEach, describe, expect, it } from "@jest/globals";
import { postMessageToPersonalTimelineInteractor } from "./post-message-to-personal-timeline.interactor";
import { NoRepositoryProvidedError } from "./no-repository-provided.error";
import { NoOwnerProvidedError } from "./no-owner-provided.error";

describe(postMessageToPersonalTimelineInteractor.name, () => {
    let message;

    beforeEach(() => {
        message = `some-message-${Math.round(Math.random() * 1000)}`;
    });

    it('should fail if repository not provided', () => {
        const repository = undefined;
        const owner = `some-user-${Math.round(Math.random() * 1000)}`;

        expect(postMessageToPersonalTimelineInteractor(repository, owner, message))
            .rejects.toThrow(NoRepositoryProvidedError);
    });

    it('should fail if owner not provided', () => {
        const repository = {};
        const owner = undefined;

        expect(postMessageToPersonalTimelineInteractor(repository, owner, message))
            .rejects.toThrow(NoOwnerProvidedError);
    });
});