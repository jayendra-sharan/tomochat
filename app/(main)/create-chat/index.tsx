import React, { useState } from 'react';
import { View } from 'react-native';
import { Button, TextInput, HelperText, RadioButton, Text } from 'react-native-paper';
import { useCreateChatMutation } from '@/services/chatService';
// import { useAppTheme } from '@/hooks/useAppTheme';

const LANGUAGES = [
  { label: 'English', value: 'EN' },
  { label: 'Dutch', value: 'NL' },
];

export const CreateChatPage = () => {
  // const theme = useAppTheme();
  const [groupName, setGroupName] = useState('');
  const [language, setLanguage] = useState('EN');
  const [createChat, { isLoading }] = useCreateChatMutation();

  const isGroupNameValid = /^[a-zA-Z0-9\s,&-]+$/.test(groupName);

  const onSubmit = () => {
    if (!isGroupNameValid || !groupName.trim()) return;

    createChat({ name: groupName.trim(), language });
  };

  return (
    <View style={{ padding: 16 }}>
      <TextInput
        label="Group name"
        value={groupName}
        onChangeText={setGroupName}
        mode="outlined"
        error={!isGroupNameValid && groupName.length > 0}
      />
      <HelperText type="error" visible={!isGroupNameValid && groupName.length > 0}>
        Only letters, numbers, spaces, &, - are allowed.
      </HelperText>

      <Text variant="titleMedium" style={{ marginTop: 16 }}>Chat language</Text>
      <RadioButton.Group onValueChange={setLanguage} value={language}>
        {LANGUAGES.map((lang) => (
          <RadioButton.Item key={lang.value} label={lang.label} value={lang.value} />
        ))}
      </RadioButton.Group>

      <Button
        mode="contained"
        onPress={onSubmit}
        disabled={!isGroupNameValid || isLoading}
        style={{ marginTop: 24 }}
      >
        Create
      </Button>
    </View>
  );
};
