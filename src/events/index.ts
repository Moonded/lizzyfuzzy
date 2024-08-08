import { Event } from "types";
import ready from "./util/ready";
import interactionCreate from "./util/interactionCreate";

import messageDelete from "./log/messageDelete";
import messageUpdate from "./log/messageUpdate";
import threadCreate from "./log/threadCreate";
import threadDelete from "./log/threadDelete";
import threadUpdate from "./log/threadUpdate";
import userBan from "./log/userBan";
import userJoined from "./log/userJoined";
import userRemove from "./log/userRemove";
import userUnban from "./log/userUnban";

import quote from "./quote/quote";

import image from "./help/image";
import message from "./help/message";

import guildjoin from "./util/guildJoin";

const productionEvents: Event<any>[] = [
  ready,
  quote,
  guildjoin,
  interactionCreate,
];

const developmentEvents: Event<any>[] = [
  ready,
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
  image,
  message,
  guildjoin,
];

export default process.env.NODE_ENV === "production"
  ? productionEvents
  : developmentEvents;
