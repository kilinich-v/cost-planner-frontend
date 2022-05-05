import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';

import ActionButton from '../../components/ActionButton';

const RegisterScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>RegisterScreen</Text>

      <ActionButton
        text={'Login'}
        onPress={() => navigation.navigate('Login')}
      />
    </View>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
