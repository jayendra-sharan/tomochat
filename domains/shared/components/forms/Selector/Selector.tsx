import React, { useState, useRef } from "react";
import { View, Pressable } from "react-native";
import { TextInput, Menu } from "react-native-paper";

export type Language = {
  label: string;
  value: string;
};

const LANGUAGES: Language[] = [
  { label: "Dutch", value: "nl-NL" },
  { label: "Spanish", value: "es-ES" },
  { label: "Italian", value: "it-IT" },
  { label: "Greek", value: "el-GR" },
  { label: "Ukranian", value: "uk-UA" },
  { label: "French", value: "fr-FR" },
  { label: "Deutsch/German", value: "de-DE" },
];

type Props = {
  language: Language;
  onChange: (language: Language) => void;
};

const LanguageSelector = ({ language, onChange }: Props) => {
  const [visible, setVisible] = useState(false);
  const inputRef = useRef<any>(null);

  const openMenu = () => {
    setVisible(true);
  };

  const closeMenu = () => {
    setVisible(false);
  };

  return (
    <View style={{ marginBottom: 16 }}>
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        style={{ left: 0, width: "100%", paddingHorizontal: 16 }}
        anchor={
          <Pressable onPress={openMenu}>
            <TextInput
              label="Language"
              value={language.label}
              mode="outlined"
              editable={false}
              ref={inputRef}
              right={<TextInput.Icon onPress={openMenu} icon="menu-down" />}
              pointerEvents="none"
            />
          </Pressable>
        }
        anchorPosition="bottom"
      >
        {LANGUAGES.map((lang) => (
          <Menu.Item
            style={{ maxWidth: 900, paddingHorizontal: 16 }}
            key={lang.value}
            onPress={() => {
              onChange(lang);
              closeMenu();
            }}
            title={lang.label}
          />
        ))}
      </Menu>
    </View>
  );
};

export default LanguageSelector;
