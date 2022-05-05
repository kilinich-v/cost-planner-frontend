import { StyleSheet, Text, View, TextInput } from 'react-native';

import AppStyles from '../../AppStyles';

const Input = ({
  title,
  autoComplete,
  value,
  onChangeText,
  placeholder,
  secureTextEntry = false,
  style
}) => {
  return (
    <View style={{ ...styles.container, ...style }}>
      {title && <Text style={styles.title}>{title}</Text>}

      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={value}
        autoComplete={autoComplete}
        placeholder={placeholder ? placeholder : title}
        placeholderTextColor={AppStyles.palette.powderBlue}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  container: {
    minWidth: '50%'
  },
  title: {
    fontSize: 12,
    color: AppStyles.palette.prussianBlue
  },
  input: {
    color: AppStyles.palette.prussianBlue,
    paddingHorizontal: 5,
    borderWidth: 1,
    borderColor: AppStyles.palette.powderBlue,
    borderRadius: 8
  }
});
