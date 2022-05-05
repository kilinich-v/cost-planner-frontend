import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import AppStyles from '../../AppStyles';

const ActionButton = ({ onPress, text }) => {
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
      <Text style={styles.button}>{text}</Text>
    </TouchableOpacity>
  );
};

export default ActionButton;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: '50%',
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 5,
    textAlign: 'center',
    color: AppStyles.palette.backgroundMainColor,
    backgroundColor: AppStyles.palette.backgroundSecondColor
  }
});
