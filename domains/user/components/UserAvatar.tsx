import { User } from "@/domains/auth/types";
import { useAppTheme } from "@/hooks/useAppTheme";
import { getAvatarUrl } from "@/services/avatar";
import { View, Text, Touchable, TouchableWithoutFeedback } from "react-native";
import { Avatar, Icon } from "react-native-paper";

type Props = {
  user?: Pick<User, "id" | "displayName">;
  showName?: boolean;
  nameLocation?: string;
  id: string;
  onTap?: (id: string) => void;
  isSelected?: boolean;
};

export function UserAvatar({
  id,
  user,
  showName,
  nameLocation,
  onTap,
  isSelected,
}: Props) {
  const theme = useAppTheme();
  if (showName && user) {
    return (
      <TouchableWithoutFeedback onPress={() => onTap && onTap(id)}>
        <View
          style={{
            display: "flex",
            padding: 10,
            borderRadius: 2,
            marginHorizontal: 5,
            flexDirection: nameLocation === "bottom" ? "column" : "row",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: isSelected
              ? theme.colors.onSurface
              : "transparent",
          }}
        >
          {/* {isSelected && (
            <View
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                backgroundColor: theme.colors.surface,
                margin: 2,
                borderRadius: 2,
              }}
            >
              <Icon
                source="check-bold"
                size={16}
                color={theme.colors.onSurface}
              />
            </View>
          )} */}
          <Avatar.Image
            size={42}
            source={{ uri: getAvatarUrl({ id, avatarType: "user" }) }}
          />
          <Text
            style={{
              marginTop: 10,
              color: isSelected ? theme.colors.surface : theme.colors.onSurface,
            }}
          >
            {user.displayName}
          </Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }
  return (
    <Avatar.Image
      size={42}
      source={{ uri: getAvatarUrl({ id, avatarType: "user" }) }}
    />
  );
}
