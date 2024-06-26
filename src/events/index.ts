import { Event } from '../types';
import ready from './ready';
import commandTrigger from './log/commandTrigger';
import interactionCreate from './interactionCreate';
import messageDelete from './log/messageDelete';
import messageUpdate from './log/messageUpdate';
import threadCreate from './log/threadCreate';
import threadDelete from './log/threadDelete';
import threadUpdate from './log/threadUpdate';
import userBan from './log/userBan';
import userJoined from './log/userJoined';
import userRemove from './log/userRemove';
import userUnban from './log/userUnban';

import quote from './quote/quote';

const events: Event<any>[] = [
  ready,
  commandTrigger,
  interactionCreate,
  messageDelete,
  messageUpdate,
  threadCreate,
  threadDelete,
  threadUpdate,
  userBan,
  userJoined,
  userRemove,
  userUnban,
  quote,
];

export default events;
