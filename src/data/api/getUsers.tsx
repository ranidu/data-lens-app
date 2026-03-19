import { USERS } from "../constants";
import type { TableRow } from "../types";

export interface GetUsersPayload {
  startDate: string
  endDate: string
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
