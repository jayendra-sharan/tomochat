import { Member } from "@/domains/shared/types";
import { getDuration } from "@/utils/formatters";
import { isAdmin } from "./isAdmin";

export const getRoomMemberDescription = (member: Member) => {
  let description = "Member since";
  if (isAdmin(member)) {
    description = "Admin | Member since";
  }
  return getDuration(member.joinedAt, description);
};
