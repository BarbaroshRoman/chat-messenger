export const findMessagesStateBranch = (state, dialogId) => {
  const currentMessagesStateBranch = [...state].find(
    el => el.dialogId === dialogId,
  );
  return currentMessagesStateBranch;
};
