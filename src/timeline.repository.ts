import { User } from './user.js';
import { Message } from './message.js';

export type TimelineRepository = { store: (author: User, message: Message) => Promise<unknown>; };
