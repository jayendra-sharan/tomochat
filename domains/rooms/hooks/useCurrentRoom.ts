import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useEffect } from "react";
import { setCurrentRoomId } from "../roomsSlice";
import { logger } from "@/services/logger";

export const useCurrentRoom = (roomId: string) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (!roomId) return;
    logger.debug("Entering room", { roomId });
    dispatch(setCurrentRoomId(roomId));

    return () => {
      logger.debug("Leaving room", { roomId });
      dispatch(setCurrentRoomId(""));
    };
  }, [roomId]);
};
