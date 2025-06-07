import PasswordChangeForm from "@/domains/auth/components/PasswordChangeForm";
import { useChangePassword } from "@/domains/auth/hooks/useChangePassword";
import { showToast } from "@/domains/notification/lib/showToast";
import { PageWithLogo } from "@/domains/shared/components/PageWithLogo";
import { router } from "expo-router";
import { Text } from "react-native-paper";

export default function ChangePassword() {
  const { changePassword, loading } = useChangePassword();

  const onSubmit = async (currentPassword: string, newPassword: string) => {
    const response = await changePassword(currentPassword, newPassword);

    if (response.success) {
      showToast("success", "Success", "Password change successful");
      setTimeout(() => {
        router.push("/(main)/dashboard");
      }, 20000);
    } else {
      showToast("error", "Error", "Password change failed");
    }
  };
  return (
    <PageWithLogo>
      <Text
        style={{ textAlign: "center", marginBottom: 20 }}
        variant="titleLarge"
      >
        Change password
      </Text>
      <PasswordChangeForm
        handlePasswordChangeSubmit={onSubmit}
        loading={loading}
      />
    </PageWithLogo>
  );
}
