import { NoMessageProvidedError } from "./no-message-provided.error";
import { NoOwnerProvidedError } from "./no-owner-provided.error";
import { NoRepositoryProvidedError } from "./no-repository-provided.error";

export class PostMessageToPersonalTimelineInteractor {

    #repository;

    constructor(repository) {
        if (!repository) throw new NoRepositoryProvidedError();

        this.#repository = repository;
    }

    async execute(owner, message) {
        if (!owner) throw new NoOwnerProvidedError();

        if (!message) throw new NoMessageProvidedError();

        return await this.#repository.store(owner, message);
    }
}
