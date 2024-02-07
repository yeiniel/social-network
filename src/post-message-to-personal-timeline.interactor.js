import { NoOwnerProvidedError } from "./no-owner-provided.error";
import { NoRepositoryProvidedError } from "./no-repository-provided.error";

export async function postMessageToPersonalTimelineInteractor(repository) {
    if (!repository) throw new NoRepositoryProvidedError();

    throw new NoOwnerProvidedError();
}
