import { jwtDecode } from "jwt-decode";
import { JwtPayload, Nullable } from "../types/common";
import { THOUSAND } from "../constants";

export const validateToken = (token: Nullable<string>): boolean => {
  if (!token) return false;

  try {
    const decoded = jwtDecode<JwtPayload>(token);
    if (!decoded.exp) return false;

    const now = Math.floor(Date.now() / THOUSAND);
    return decoded.exp > now;
  } catch {
    return false;
  }
};
