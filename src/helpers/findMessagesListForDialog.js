export const findMessagesListForDialog = (state, dialogId) => {
  const currentMessagesList = [...state].find(el => el.dialogId === dialogId);
  return currentMessagesList;
};
