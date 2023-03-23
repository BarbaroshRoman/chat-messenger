import {createDate} from './createDate';

export const newMessage = mes => {
  return {
    message: mes,
    date: createDate(),
    messageId: Date.now(),
    feedback: true,
  };
};
