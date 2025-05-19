import React, { useEffect } from "react";
import { useLocalSearchParams, Redirect } from "expo-router";
import { useGetMeQuery } from "@/domains/auth/authApi";
import InvitePage from "./InvitePage";
import LoadingScreen from "@/domains/shared/components/LoadingScreen";
import { storage } from "@/services/storage";
import { PENDING_INVITE } from "@/constants";

const InvitePageWrapper = () => {
  const { invite_id: inviteId } = useLocalSearchParams<{ invite_id: string }>();
  const { data: user, isLoading } = useGetMeQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    if (!user && inviteId) {
      storage.setItem(PENDING_INVITE, inviteId);
    }
  }, [user, inviteId]);

  if (isLoading) return <LoadingScreen />;
  if (!user) return <Redirect href={`/login?invite_id=${inviteId}`} />;

  return <InvitePage user={user} />;
};

export default InvitePageWrapper;
