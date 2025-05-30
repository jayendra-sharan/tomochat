import React, { useState } from "react";
import { Keyboard } from "react-native";
import { Surface, Dialog, Text } from "react-native-paper";
import {
  Step1_CreateBasic,
  Step2_MoreSettings,
  Step3_InvitePeople,
} from "./Steps";
import CreateRoomSuccess from "./CreateRoomSuccess";
import { Button } from "@/domains/shared/components/Button";
import { roomsApi, useCreateRoomMutation } from "../roomsApi";
import { useAuth } from "@/domains/auth/hooks/useAuth";
import { useAppDispatch } from "@/hooks/useAppDispatch";

const CreateRoomPage = ({ onDismiss }: { onDismiss: () => void }) => {
  // @todo refactor
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    name: "",
    description: "",
    language: { label: "", value: "" },
    inviteLink: "",
  });
  const [confirmCancel, setConfirmCancel] = useState(false);

  const { displayName } = useAuth();
  const [createRoom, { isLoading }] = useCreateRoomMutation();
  const dispatch = useAppDispatch();

  const handleClose = () => {
    Keyboard.dismiss();
    setConfirmCancel(true);
  };

  const handleConfirmCancel = () => {
    setConfirmCancel(false);
    onDismiss();
  };

  const goToNext = () => setStep((prev) => prev + 1);
  const goToPrev = () => setStep((prev) => prev - 1);
  const onSubmit = async () => {
    try {
      const { name, language, description } = form;
      const data = await createRoom({
        name: name.trim(),
        language: language.value,
        userDisplayName: displayName,
        description,
      }).unwrap();
      const { inviteLink } = data;
      setForm({
        ...form,
        inviteLink,
      });

      dispatch(
        roomsApi.util.updateQueryData("getRooms", undefined, (draft) => {
          draft.unshift(data);
        })
      );

      setStep(4);
    } catch (error) {}
  };

  return (
    <>
      <Surface
        style={{
          padding: 16,
          paddingBottom: 20,
          borderTopLeftRadius: 2,
          borderTopRightRadius: 2,
          elevation: 2,
          backgroundColor: "#fafafa",
        }}
      >
        {step === 1 && (
          <Step1_CreateBasic
            form={form}
            setForm={setForm}
            goToNext={onSubmit}
            onClose={handleClose}
            isLoading={isLoading}
          />
        )}
        {step === 2 && (
          <Step2_MoreSettings goToNext={goToNext} goToPrev={goToPrev} />
        )}
        {step === 3 && (
          <Step3_InvitePeople
            goToPrev={goToPrev}
            form={form}
            setForm={setForm}
            goToNext={goToNext}
          />
        )}
        {step === 4 && (
          <CreateRoomSuccess inviteLink={form.inviteLink} onClose={onDismiss} />
        )}
      </Surface>

      <Dialog
        style={{ borderRadius: 2 }}
        visible={confirmCancel}
        onDismiss={() => setConfirmCancel(false)}
      >
        <Dialog.Title>Cancel setup?</Dialog.Title>
        <Dialog.Content style={{ padding: 12, paddingVertical: 0 }}>
          <Text>Are you sure you want to cancel this group setup?</Text>
        </Dialog.Content>
        <Dialog.Actions style={{ padding: 12, paddingTop: 0 }}>
          <Button onPress={() => setConfirmCancel(false)} mode="outlined">
            No
          </Button>
          <Button onPress={handleConfirmCancel}>Yes</Button>
        </Dialog.Actions>
      </Dialog>
    </>
  );
};

export default CreateRoomPage;

// @todo extract dialog
