import { Member } from "@/domains/shared/types";

export function isAdmin(member: Member) {
  return member.role === "admin";
}
