import { NoMessageProvidedError } from "./no-message-provided.error";
import { NoOwnerProvidedError } from "./no-owner-provided.error";
import { NoRepositoryProvidedError } from "./no-repository-provided.error";

export async function postMessageToPersonalTimelineInteractor(repository, owner) {
    if (!repository) throw new NoRepositoryProvidedError();

    if (!owner) throw new NoOwnerProvidedError();

    throw new NoMessageProvidedError();
}
