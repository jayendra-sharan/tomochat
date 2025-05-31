import formValidator from "@/domains/shared/lib/formValidator";
import { useState } from "react";
import {
  useChangePasswordMutation,
  useRecoverPasswordMutation,
} from "../authApi";
import { useLocalSearchParams } from "expo-router";

type State = {
  newPwd: string;
  repeatNewPwd: string;
  currentPwd: string;
};

type ErrorState = State;

const initalState: State = {
  newPwd: "",
  repeatNewPwd: "",
  currentPwd: "",
};
export const usePasswordUpdate = () => {
  const [changePassword] = useChangePasswordMutation();
  const [recoverPassword] = useRecoverPasswordMutation();
  const { token } = useLocalSearchParams<{ token: string }>();
  const [pwd, setPwd] = useState<State>(initalState);

  const [error, setPwdError] = useState<ErrorState>({
    newPwd: "",
    repeatNewPwd: "",
    currentPwd: "",
  });

  const updatePassword = async (mode: "default" | "recovery") => {
    if (mode === "recovery") {
      return recoverPassword({
        password: pwd.newPwd,
        token: token || "",
      });
    }
    return changePassword({
      currentPassword: pwd.currentPwd,
      newPassword: pwd.newPwd,
    });
  };

  const updatePasswordState = ({
    reset = false,
    key,
    value = "",
  }: {
    reset?: boolean;
    key?: keyof State;
    value?: string;
  }) => {
    if (reset) {
      setPwd(initalState);
      return;
    }
    if (!key) {
      return;
    }
    let result;
    if (key === "newPwd") {
      result = formValidator.password(value?.trim());
    }
    if (key === "repeatNewPwd") {
      result = formValidator.password(pwd.newPwd, value?.trim());
    }
    const { message } = result || {};
    setPwd({
      ...pwd,
      [key]: value,
    });
    setPwdError({
      ...error,
      [key]: message,
    });
  };

  return {
    setPassword: updatePasswordState,
    password: pwd,
    error,
    updatePassword,
  };
};
