import { beforeEach, describe, expect, it } from "@jest/globals";
import { postMessageToPersonalTimelineInteractor } from "./post-message-to-personal-timeline.interactor";
import { NoRepositoryProvidedError } from "./no-repository-provided.error";
import { NoOwnerProvidedError } from "./no-owner-provided.error";
import { NoMessageProvidedError } from "./no-message-provided.error";

describe(postMessageToPersonalTimelineInteractor.name, () => {
    let repository;
    let owner;
    let message;

    function expectInteractorToThrow(error) {
        expect(() => postMessageToPersonalTimelineInteractor(repository, owner, message))
            .rejects.toThrow(error);
    }

    beforeEach(() => {
        repository = {};
        owner = `some-user-${Math.round(Math.random() * 1000)}`;
        message = `some-message-${Math.round(Math.random() * 1000)}`;
    });

    it('should fail if repository not provided', () => {
        repository = undefined;

        expectInteractorToThrow(NoRepositoryProvidedError);
    });

    it('should fail if owner not provided', () => {
        owner = undefined;

        expectInteractorToThrow(NoOwnerProvidedError);
    });

    it('should fail if message not provided', () => {
        message = undefined;

        expectInteractorToThrow(NoMessageProvidedError);
    });
});