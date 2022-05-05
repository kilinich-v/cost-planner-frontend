import { StyleSheet, View, Text, TouchableHighlight } from 'react-native';
import ActionButton from '../../components/ActionButton';

const LoginScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View>
        <Text>LoginScreen</Text>
      </View>

      <ActionButton
        text={'Register'}
        onPress={() => navigation.navigate('Register')}
      />
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
