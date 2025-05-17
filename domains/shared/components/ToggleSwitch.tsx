import { View, StyleSheet } from 'react-native';
import { Text, RadioButton, useTheme } from 'react-native-paper';

export default function ToggleSwitch({
  labelOn = 'On',
  labelOff = 'Off',
  value,
  onChange,
}: {
  labelOn?: string;
  labelOff?: string;
  value: boolean;
  onChange: (val: boolean) => void;
}) {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <View style={styles.option}>
        <RadioButton
          value="false"
          status={!value ? 'checked' : 'unchecked'}
          onPress={() => onChange(false)}
        />
        <Text onPress={() => onChange(false)} style={{ color: theme.colors.onSurface }}>
          {labelOff}
        </Text>
      </View>
      <View style={styles.option}>
        <RadioButton
          value="true"
          status={value ? 'checked' : 'unchecked'}
          onPress={() => onChange(true)}
        />
        <Text onPress={() => onChange(true)} style={{ color: theme.colors.onSurface }}>
          {labelOn}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 8,
  },
});