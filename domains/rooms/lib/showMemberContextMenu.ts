import { isAdmin } from "./isAdmin";
import { GetRoomDetailsResponse } from "../types";
import { Member } from "@/domains/shared/types";

// @todo probably make it configuration
export function showMemberContextMenu(
  data: GetRoomDetailsResponse,
  member: Member
) {
  const admin = data?.members?.find(isAdmin);
  if (admin?.user.id !== member.user.id) {
    return true;
  }
  return false;
}
