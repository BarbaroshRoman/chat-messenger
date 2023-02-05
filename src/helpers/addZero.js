export const addZero = datePart =>
  +datePart < 10 ? `0${datePart}` : datePart.toString();
