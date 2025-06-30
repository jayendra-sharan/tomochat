// not used
import { Picker } from "@react-native-picker/picker";
import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  Modal,
  Pressable,
} from "react-native";
import { Button } from "react-native-paper";

const LANGUAGES = [
  { label: "Dutch", value: "nl-NL" },
  { label: "Spanish", value: "es-ES" },
  { label: "Italian", value: "it-IT" },
  { label: "Greek", value: "el-GR" },
  { label: "Ukranian", value: "uk-UA" },
  { label: "French", value: "fr-FR" },
  { label: "Deutsch/German", value: "de-DE" },
];

type LanguagePickerProps = {
  language?: string;
  setLanguage: (language: string) => void;
};

const getLanguageLabel = (languageCode?: string) => {
  if (!languageCode) return "";
  return LANGUAGES.find((item) => item.value === languageCode)?.label;
};

export default function LanguagePicker({
  language,
  setLanguage,
}: LanguagePickerProps) {
  const [showPicker, setShowPicker] = useState(false);
  const [tempLanguage, setTempLanguage] = useState(language);

  if (Platform.OS === "web") {
    return (
      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
        style={{ padding: 10, fontSize: 16 }}
      >
        {LANGUAGES.map((lang) => (
          <option key={lang.value} value={lang.value}>
            {lang.label}
          </option>
        ))}
      </select>
    );
  }

  return (
    <View style={{ marginBottom: 16 }}>
      <Text style={styles.label}>Language</Text>

      <Pressable
        style={styles.selector}
        onPress={() => {
          setShowPicker(true);
          setTempLanguage(language);
        }}
      >
        <Text>{getLanguageLabel(tempLanguage) || "Select Language"}</Text>
      </Pressable>

      {Platform.OS === "ios" && (
        <Modal visible={showPicker} transparent animationType="slide">
          <Pressable
            style={styles.modalOverlay}
            // onPress={() => setShowPicker(false)}
          >
            <View style={styles.pickerWrapper}>
              <Picker
                selectedValue={tempLanguage}
                onValueChange={(value) => {
                  setTempLanguage(value);
                }}
              >
                {LANGUAGES.map((lang) => (
                  <Picker.Item
                    key={lang.value}
                    label={lang.label}
                    value={lang.value}
                  />
                ))}
              </Picker>
              <View
                style={{
                  padding: 12,
                  alignItems: "flex-end",
                  marginBottom: 20,
                }}
              >
                <Button
                  onPress={() => {
                    setLanguage(tempLanguage || "");
                    setShowPicker(false);
                  }}
                >
                  Done
                </Button>
              </View>
            </View>
          </Pressable>
        </Modal>
      )}

      {Platform.OS === "android" && (
        <View style={styles.androidPicker}>
          <Picker
            selectedValue={language}
            onValueChange={setLanguage}
            mode="dropdown"
          >
            {LANGUAGES.map((lang) => (
              <Picker.Item
                key={lang.value}
                label={lang.label}
                value={lang.value}
              />
            ))}
          </Picker>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    marginBottom: 4,
    fontWeight: "500",
  },
  selector: {
    padding: 12,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#ccc",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  pickerWrapper: {
    backgroundColor: "#fff",
    paddingBottom: 20,
  },
  androidPicker: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#ccc",
    overflow: "hidden",
  },
});
