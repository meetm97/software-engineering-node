/**
 * @file Declares Follow data type representing relationship between
 * users , as in user messages another users
 */
 import User from "./User";

   export default interface Message {
    message: string,
    to: User,
    from: User,
    sentOn: Date
};