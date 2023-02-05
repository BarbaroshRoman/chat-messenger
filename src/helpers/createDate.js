import {addZero} from "./addZero";

export const createDate = () => {
  const date = new Date();
  const hours = date.getHours();
  const minutes = date.getMinutes();

  return addZero(hours) + ':' + addZero(minutes);
};
