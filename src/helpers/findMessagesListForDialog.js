export const findMessagesListForDialog = (state, dialogId) => {
  return [...state].find(el => el.dialogId === dialogId);
};
