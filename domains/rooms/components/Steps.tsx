import Selector from "@/domains/shared/components/forms/Selector";
import { Language } from "@/domains/shared/components/forms/Selector/Selector";
import React from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";
import TextInput from "@/domains/shared/components/forms/TextInput";
import { Button } from "@/domains/shared/components/Button";

type Step1Props = {
  form: { name: string; description: string; language: Language };
  setForm: (form: any) => void;
  goToNext: () => void;
  onClose: () => void;
  isLoading: boolean;
};

export const Step1_CreateBasic = ({
  form,
  setForm,
  goToNext,
  onClose,
  isLoading,
}: Step1Props) => {
  const isValid = form.name.trim().length > 2;

  return (
    <View>
      <Text variant="titleLarge" style={{ marginBottom: 4 }}>
        Create Group
      </Text>

      <Selector
        onChange={(language: Language) => setForm({ ...form, language })}
        language={form.language}
      />

      <TextInput
        label="Group Name"
        value={form.name}
        onChangeText={(text) => setForm({ ...form, name: text })}
        style={{ marginBottom: 4 }}
      />

      <TextInput
        label="Group Description"
        value={form.description}
        onChangeText={(text) => setForm({ ...form, description: text })}
        style={{ marginBottom: 4 }}
      />

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingTop: 16,
        }}
      >
        <Button type="menuLink" onPress={goToNext} disabled={!isValid}>
          More Settings
        </Button>
        <Button
          type="primary"
          onPress={goToNext}
          loading={isLoading}
          disabled={!isValid || isLoading}
        >
          Create Now
        </Button>
      </View>

      <Button type="textLink" onPress={onClose} style={{ marginTop: 16 }}>
        Cancel
      </Button>
    </View>
  );
};
