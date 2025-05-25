type GetAvatarUrl = {
  avatarType?: "user" | "group";
  id: string;
};
export const getAvatarUrl = (options: GetAvatarUrl) => {
  const { avatarType = "group", id } = options;
  if (avatarType === "group") {
    return `https://api.dicebear.com/7.x/shapes/png?seed=room-${id}`;
  }
  return `https://api.dicebear.com/7.x/adventurer-neutral/png?seed=user-0${id}`;
};
