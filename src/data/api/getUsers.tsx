import { USERS } from "../constants";
import type { TableRow } from "../types";

export interface GetUsersPayload {
  startDate: string; //"2026-03-11 00:00:00 +0800"
  endDate: string; //"2026-03-18 23:59:59 +0800"
}

export const getUsers = async (payload: GetUsersPayload): Promise<TableRow[]> => {
  return new Promise<TableRow[]>((resolve, reject) => {
    setTimeout(() => {
      try {
        const filtered = USERS.filter((user) => {
          return (
            user.date >= payload.startDate.slice(0, 10) &&
            user.date <= payload.endDate.slice(0, 10)
          );
        });
        resolve(filtered);
      } catch (e) {
        console.error(`ENDPOINT ERROR:`, e);
        reject(new Error("Failed to fetch data"));
      }
    }, 600);
  });
};
