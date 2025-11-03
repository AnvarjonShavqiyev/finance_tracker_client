import { ApiResponse, Option, User } from "../types";

export const transformToOptions = (res: ApiResponse<User[]>): Option[] => {
  return res.payload.map(({ id, username }) => ({
    value: id,
    label: username,
  }));
};
