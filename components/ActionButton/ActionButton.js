import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';

import AppStyles from '../../AppStyles';

const ActionButton = ({ onPress, text, style, isLoading }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      disabled={isLoading}>
      {isLoading ? (
        <View style={{ ...styles.button, ...style }}>
          <ActivityIndicator size='small' color={AppStyles.palette.honeydew} />
        </View>
      ) : (
        <Text style={{ ...styles.button, ...style }}>{text}</Text>
      )}
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
    borderRadius: 8,
    textAlign: 'center',
    color: AppStyles.palette.honeydew,
    backgroundColor: AppStyles.palette.celadonBlue
  }
});
