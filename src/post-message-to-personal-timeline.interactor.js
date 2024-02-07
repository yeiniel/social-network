import { NoRepositoryProvidedError } from "./no-repository-provided.error";

export async function postMessageToPersonalTimelineInteractor() {
    throw new NoRepositoryProvidedError();
}
