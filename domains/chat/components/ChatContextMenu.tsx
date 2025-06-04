import { Menu, IconButton } from "react-native-paper";
import { useCopyToClipboard } from "../hoc/useCopyToClipboard";
import {
  useDeleteMessagesMutation,
  useDeleteRoomMutation,
  useLeaveRoomMutation,
} from "@/domains/rooms/roomsApi";
import { router } from "expo-router";
import { logger } from "@/services/logger";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { chatApi } from "../chatApi";
import { showToast } from "@/domains/notification/lib/showToast";

type Props = {
  inviteId: string;
  visible: boolean;
  onDismiss: () => void;
  openMenu: () => void;
  copyToClipboard: (inviteId: string) => Promise<void>;
};

enum Actions {
  CopyInviteLink = "copyInviteLink",
  DeleteMessages = "deleteMessages",
  LeaveChatRoom = "leaveChatRoom",
  DeleteRoom = "deleteRoom",
}
// @todo reduce number of props from here
const ChatContextMenu = ({
  inviteId,
  visible,
  onDismiss,
  openMenu,
  copyToClipboard,
}: Props) => {
  const dispatch = useAppDispatch();
  const [deleteMessages] = useDeleteMessagesMutation();
  const [leaveRoom] = useLeaveRoomMutation();
  const [deleteRoom] = useDeleteRoomMutation();

  const [roomId] = inviteId.split("--");

  const handleAction = async (action: Actions) => {
    try {
      switch (action) {
        case Actions.CopyInviteLink: {
          await copyToClipboard(inviteId);
          onDismiss();
          return;
        }
        case Actions.DeleteMessages: {
          const result = await deleteMessages({ roomId }).unwrap();
          if (result) {
            dispatch(
              chatApi.util.updateQueryData(
                "getRoomChats",
                { roomId },
                (draft) => {
                  draft.messages = [];
                }
              )
            );
          }
          return;
        }
        case Actions.LeaveChatRoom: {
          await leaveRoom({ roomId }).unwrap();
          showToast("info", "Success", "Redirecting to home page");
          setTimeout(() => {
            router.push("/(main)/dashboard");
          }, 1500);
          return;
        }
        case Actions.DeleteRoom: {
          await deleteRoom({ roomId }).unwrap();
          showToast("info", "Success", "Redirecting to home page");
          setTimeout(() => {
            router.push("/(main)/dashboard");
          }, 1500);
          return;
        }
        default:
          return;
      }
    } catch (error) {
      // @todo show relevant message
      showToast("error", "Failed", `Oops! It didn't work`);
    } finally {
      onDismiss();
    }
  };

  return (
    <Menu
      visible={visible}
      onDismiss={onDismiss}
      anchor={<IconButton icon="dots-vertical" size={20} onPress={openMenu} />}
    >
      <Menu.Item
        onPress={() => handleAction(Actions.CopyInviteLink)}
        title="Copy room link"
      />
      <Menu.Item
        onPress={() => handleAction(Actions.DeleteMessages)}
        title="Delete messages"
      />
      <Menu.Item
        onPress={() => handleAction(Actions.LeaveChatRoom)}
        title="Leave chat room"
      />
      {/* @todo show only to admins */}
      <Menu.Item
        onPress={() => handleAction(Actions.DeleteRoom)}
        title="Delete room"
      />
    </Menu>
  );
};

export default useCopyToClipboard(ChatContextMenu);
