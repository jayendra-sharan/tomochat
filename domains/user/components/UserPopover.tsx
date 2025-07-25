import React from "react";
import { View } from "react-native";
import { Text, Divider, Surface } from "react-native-paper";

import { UserAvatar } from "./UserAvatar";
import { useAuth } from "@/domains/auth/hooks/useAuth";
import { useAppTheme } from "@/hooks/useAppTheme";
import { AUTH_TOKEN } from "@/constants";
import { resetStore } from "@/redux/store";
import { storage } from "@/services/storage";
import { router } from "expo-router";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { Button } from "@/domains/shared/components/Button";

type Props = {
  onSettings?: () => void;
};

const UserPopover: React.FC<Props> = ({ onSettings }) => {
  const { user } = useAuth();
  const theme = useAppTheme();
  const dispatch = useAppDispatch();

  if (!user) {
    return null;
  }
  const { displayName, email, id } = user;

  // @todo fix duplicate logic
  const redirectToHome = () => {
    router.push("/(main)/dashboard");
  };
  const redirectToConnections = () => {
    router.push("/(main)/profile/connections");
  };

  const redirectToProfile = () => {
    router.push("/(main)/profile");
  };

  const handleLogout = () => {
    storage.removeItem(AUTH_TOKEN);
    dispatch(resetStore());
    setTimeout(() => {
      router.push("/(auth)/login");
    }, 500);
  };

  return (
    <Surface
      style={{
        padding: 16,
        borderTopLeftRadius: 2,
        paddingBottom: 36,
        borderTopRightRadius: 2,
        elevation: 2,
      }}
    >
      <View
        style={{ flexDirection: "row", alignItems: "center", marginBottom: 12 }}
      >
        <UserAvatar id={id} />
        <View style={{ marginLeft: 12 }}>
          <Text variant="titleMedium">Hoi {displayName}!</Text>
          <Text
            numberOfLines={2}
            ellipsizeMode="tail"
            style={{ maxWidth: 200 }}
            variant="bodySmall"
          >
            {email}
          </Text>
        </View>
      </View>

      <Divider style={{ marginVertical: 8 }} />

      <Button
        onPress={redirectToHome}
        type="menuLink"
        contentStyle={{ justifyContent: "flex-start" }}
      >
        Home
      </Button>

      <Button
        onPress={redirectToProfile}
        type="menuLink"
        contentStyle={{ justifyContent: "flex-start" }}
      >
        Change Password
      </Button>

      <Button
        onPress={redirectToConnections}
        type="menuLink"
        contentStyle={{ justifyContent: "flex-start" }}
      >
        My connections
      </Button>

      <Divider style={{ marginVertical: 8 }} />

      <Button
        onPress={handleLogout}
        type="menuLink"
        contentStyle={{ justifyContent: "flex-start" }}
      >
        Logout
      </Button>
    </Surface>
  );
};

export default UserPopover;
