import { NoMessageProvidedError } from "./no-message-provided.error";
import { NoOwnerProvidedError } from "./no-owner-provided.error";
import { NoRepositoryProvidedError } from "./no-repository-provided.error";

export async function postMessageToPersonalTimelineInteractor(repository, owner, message) {
    if (!repository) throw new NoRepositoryProvidedError();

    if (!owner) throw new NoOwnerProvidedError();

    if (!message) throw new NoMessageProvidedError();

    return await repository.store(owner, message);
}
