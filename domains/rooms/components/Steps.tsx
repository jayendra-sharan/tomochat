import Selector from "@/domains/shared/components/forms/Selector";
import { Language } from "@/domains/shared/components/forms/Selector/Selector";
import React, { useState } from "react";
import { View, TextInput as RNTextInput } from "react-native";
import { Text, Chip, Avatar } from "react-native-paper";
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
        <Button mode="outlined" onPress={goToNext} disabled={!isValid}>
          More Settings
        </Button>
        <Button
          mode="contained"
          onPress={goToNext}
          loading={isLoading}
          disabled={!isValid || isLoading}
        >
          Create Now
        </Button>
      </View>

      <Button
        mode="text"
        onPress={onClose}
        style={{ marginTop: 16 }}
        textColor="red"
      >
        Cancel
      </Button>
    </View>
  );
};

type Step2Props = {
  goToPrev: () => void;
  goToNext: () => void;
};

export const Step2_MoreSettings = ({ goToPrev, goToNext }: Step2Props) => {
  return (
    <View>
      <Text variant="titleLarge" style={{ marginBottom: 16 }}>
        More Settings (Coming Soon)
      </Text>

      <Text style={{ marginBottom: 24 }}>
        Here you’ll configure group roles, notification settings, access
        controls...
      </Text>

      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Button mode="outlined" onPress={goToPrev}>
          Back
        </Button>
        <Button mode="contained" onPress={goToNext}>
          Next
        </Button>
      </View>
    </View>
  );
};

type Step3Props = {
  goToPrev: () => void;
  goToNext: () => void;
  form: any;
  setForm: (form: any) => void;
};

const mockConnections = [
  { id: "1", name: "Alice", email: "alice@email.com" },
  { id: "2", name: "Bob", email: "bob@email.com" },
  { id: "3", name: "Charlie", email: "charlie@email.com" },
];

export const Step3_InvitePeople = ({ goToPrev, goToNext }: Step3Props) => {
  const [selected, setSelected] = useState<string[]>([]);
  const [inviteStep, setInviteStep] = useState(false);
  const [emails, setEmails] = useState<string[]>([]);
  const [input, setInput] = useState("");

  const toggle = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const addEmail = () => {
    if (input.trim() && !emails.includes(input)) {
      setEmails((prev) => [...prev, input.trim()]);
      setInput("");
    }
  };

  const removeEmail = (email: string) => {
    setEmails((prev) => prev.filter((e) => e !== email));
  };

  return (
    <View>
      {!inviteStep ? (
        <>
          <Text variant="titleLarge" style={{ marginBottom: 16 }}>
            Invite People
          </Text>

          {mockConnections.length > 0 ? (
            mockConnections.map((user) => (
              <Chip
                key={user.id}
                style={{ marginVertical: 4 }}
                avatar={<Avatar.Text label={user.name.charAt(0)} size={24} />}
                selected={selected.includes(user.id)}
                onPress={() => toggle(user.id)}
              >
                {user.name}
              </Chip>
            ))
          ) : (
            <Text>No connections yet.</Text>
          )}

          <Button
            onPress={() => setInviteStep(true)}
            style={{ marginTop: 16 }}
            icon="email-plus-outline"
          >
            Invite by Email
          </Button>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 24,
            }}
          >
            <Button mode="outlined" onPress={goToPrev}>
              Back
            </Button>
            <Button mode="contained" onPress={goToNext}>
              Submit
            </Button>
          </View>
        </>
      ) : (
        <>
          <Text variant="titleLarge" style={{ marginBottom: 16 }}>
            Invite by Email
          </Text>

          <View style={{ flexDirection: "row", marginBottom: 8 }}>
            <TextInput
              label="Email"
              value={input}
              onChangeText={setInput}
              placeholder="Enter email"
              mode="outlined"
              style={{ flex: 1, marginRight: 8 }}
            />
            <Button
              onPress={addEmail}
              mode="contained"
              disabled={!input.trim()}
            >
              Add
            </Button>
          </View>

          {emails.map((email) => (
            <Chip
              key={email}
              onClose={() => removeEmail(email)}
              style={{ marginVertical: 4 }}
            >
              {email}
            </Chip>
          ))}

          <Button
            mode="contained"
            onPress={() => {
              // mock API call for invites
              goToNext();
            }}
            style={{ marginTop: 16 }}
          >
            Send Invites
          </Button>

          <Button onPress={() => setInviteStep(false)} style={{ marginTop: 8 }}>
            Back
          </Button>
        </>
      )}
    </View>
  );
};
