import React, { useState } from "react";
import { View, Share } from "react-native";
import * as Clipboard from "expo-clipboard";
import { Text, Divider } from "react-native-paper";
import { Button } from "@/domains/shared/components/Button";
import { useGetUserConnectionsQuery } from "@/domains/user/userApi";
import { UserSelector } from "@/domains/user/components/UserSelector";
import { useAddMembersToRoomMutation } from "../roomsApi";
import { useAuth } from "@/domains/auth/hooks/useAuth";

type Props = {
  inviteLink: string;
  onClose: () => void;
};

const getInviteLink = (invite_id: string) =>
  `${window.location.origin}/invite?invite_id=${invite_id}`;

const CreateRoomSuccess = ({ inviteLink, onClose }: Props) => {
  const [copied, setCopied] = useState(false);
  const [selectedUserIds, setSelectedUsers] = useState<string[]>([]);
  const { displayName } = useAuth();

  const { data: connections, isLoading } = useGetUserConnectionsQuery(
    undefined,
    {
      refetchOnMountOrArgChange: true,
    }
  );

  const [addMembersToRoom] = useAddMembersToRoomMutation();

  const handleCopy = async () => {
    try {
      console.log("copying");
      await Clipboard.setStringAsync(getInviteLink(inviteLink));
      setCopied(true);
      setTimeout(() => {
        console.log("setting copy false");
        setCopied(false);
      }, 2500);
    } catch (error) {
      console.error(`Error in copying link ${error}`);
    }
  };

  const onUserSelect = (users: string[]) => {
    setSelectedUsers(users);
  };

  const handleShare = async () => {
    try {
      const result = await Share.share({
        title: "TomoChat Invite",
        message: `Hoi hoi! ${displayName} has invited you to chat on TomoChat. Click below to join:\n\n${getInviteLink(
          inviteLink
        )}`,
      });

      // Optional: check action
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with specific activity (e.g. WhatsApp)
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };

  const onAddMembers = async () => {
    try {
      const [roomId] = inviteLink.split("--");
      await addMembersToRoom({
        roomId,
        memberIds: selectedUserIds,
      }).unwrap();
    } catch (error) {
      console.error(`Error: ${error}`);
    } finally {
      onClose && onClose();
    }
  };

  return (
    <View style={{ paddingBottom: 0, paddingHorizontal: 12, paddingTop: 12 }}>
      <Text variant="titleLarge" style={{ marginBottom: 12 }}>
        🎉 Group Created!
      </Text>

      <Text variant="bodyMedium" style={{ marginBottom: 12 }}>
        Share this invite link with others:
      </Text>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          padding: 4,
          borderRadius: 2,
          justifyContent: "space-between",
        }}
      >
        <Button
          type="secondary"
          icon={copied ? "check" : "content-copy"}
          onPress={handleCopy}
          style={{ width: 150 }}
        >
          {copied ? "Copied" : "Copy"}
        </Button>
        <Button
          icon="share-variant"
          type="primary"
          onPress={handleShare}
          style={{ width: 150 }}
        >
          Share
        </Button>
      </View>

      <Divider style={{ marginVertical: 10 }} />

      {connections && connections.length > 0 ? (
        <>
          <Text variant="bodyMedium" style={{ marginBottom: 8 }}>
            Add people from your connections:
          </Text>
          <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
            <UserSelector users={connections} onSelect={onUserSelect} />
          </View>
        </>
      ) : (
        <Text style={{ marginBottom: 12 }}>No connections found yet.</Text>
      )}

      {!!selectedUserIds.length ? (
        <Button type="primary" onPress={onAddMembers} style={{ marginTop: 12 }}>
          Add to chat
        </Button>
      ) : (
        <Button
          type="menuLink"
          onPress={onClose}
          style={{ marginTop: 12 }}
          contentStyle={{ paddingVertical: 3, paddingHorizontal: 16 }}
          // @todo 3 =  2 + 1 (border) primary button
        >
          Done
        </Button>
      )}
    </View>
  );
};

export default CreateRoomSuccess;
