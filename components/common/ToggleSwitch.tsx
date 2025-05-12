import { View, StyleSheet } from 'react-native';
import { Text, RadioButton } from 'react-native-paper';

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
  return (
    <View style={styles.container}>
      <View style={styles.option}>
        <RadioButton
          value="false"
          status={!value ? 'checked' : 'unchecked'}
          onPress={() => onChange(false)}
        />
        <Text onPress={() => onChange(false)}>{labelOff}</Text>
      </View>
      <View style={styles.option}>
        <RadioButton
          value="true"
          status={value ? 'checked' : 'unchecked'}
          onPress={() => onChange(true)}
        />
        <Text onPress={() => onChange(true)}>{labelOn}</Text>
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
