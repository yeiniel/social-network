import { beforeEach, describe, expect, it, jest } from "@jest/globals";
import { PostMessageToPersonalTimelineInteractor } from "./post-message-to-personal-timeline.interactor";
import { NoRepositoryProvidedError } from "./no-repository-provided.error";
import { NoOwnerProvidedError } from "./no-owner-provided.error";
import { NoMessageProvidedError } from "./no-message-provided.error";

describe(PostMessageToPersonalTimelineInteractor.name, () => {
    let result;
    let repository;
    let owner;
    let message;

    function expectInteractorToThrow(error) {
        expect(async () => new PostMessageToPersonalTimelineInteractor(repository).execute(owner, message))
            .rejects.toThrow(error);
    }

    beforeEach(() => {
        result = Math.random();
        repository = {
            store: jest.fn().mockResolvedValue(result)
        };
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

    it('should post message to personal timeline', async () => {
        expect(new PostMessageToPersonalTimelineInteractor(repository).execute(owner, message))
            .resolves.toBe(result);
        expect(repository.store).toHaveBeenCalledWith(owner, message);
    });
});