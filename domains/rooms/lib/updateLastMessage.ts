import { store } from "@/redux/store";
import { roomsApi } from "../roomsApi";

type UpdateLastMessage = {
  roomId: string;
  lastMessage: string;
};
export function updateLastMessage({ roomId, lastMessage }: UpdateLastMessage) {
  store.dispatch(
    roomsApi.util.updateQueryData("getRooms", undefined, (draft) => {
      const index = draft.findIndex((g) => g.id === roomId);
      if (index === -1) return;

      const room = draft[index];

      room.lastMessage = lastMessage;
      // @todo - add a condition if not in current room
      room.isUnread = true;
      room.lastMessageAt = Date.now().toString();

      draft.splice(index, 1);
      draft.unshift(room);
    })
  );
}
