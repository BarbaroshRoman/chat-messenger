export const replaceMessagesListForDialog = (
  state,
  currentDialogId,
  currentMessagesList,
) => {
  state.forEach(el => {
    if (el.dialogId === currentDialogId) {
      el.messagesList = currentMessagesList;
    }
  });
};
