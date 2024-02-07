export class InMemoryTimelineRepository {
    #data;

    constructor(data) {
        this.#data = data ?? new Map();
    }

    store(owner, message) {
        this.#data.set(owner, [message]);
    }

    _dataFor(owner) {
        return this.#data.get(owner);
    }
}
