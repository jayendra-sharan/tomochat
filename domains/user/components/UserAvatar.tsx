import { getAvatarUrl } from "@/services/avatar";
import { Avatar } from "react-native-paper";

export function UserAvatar({ id }: { id: string }) {
  return (
    <Avatar.Image
      size={42}
      source={{ uri: getAvatarUrl({ id, avatarType: "user" }) }}
    />
  );
}
