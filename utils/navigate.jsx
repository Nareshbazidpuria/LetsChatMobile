import { navigateRef } from "../App";

export const Navigate = (screenName) =>
  navigateRef?.current?.navigate(screenName);
