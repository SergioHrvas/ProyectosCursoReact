import type { ProjectType, User } from "../types";

export const isAdmin = (adminId: ProjectType['admin'], userId: User['_id']) => {
  return adminId === userId;
}