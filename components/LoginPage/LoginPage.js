import { View, Text, StyleSheet } from 'react-native';
import { Formik } from 'formik';

import Input from '../Input';
import ActionButton from '../ActionButton';

import AppStyles from '../../AppStyles';

const initValues = {
  email: '',
  password: ''
};

const LoginPage = ({ navigation }) => {
  return (
    <Formik initialValues={initValues} onSubmit={values => console.log(values)}>
      {({ handleChange, handleBlur, handleSubmit, values }) => (
        <View style={styles.container}>
          <Text style={styles.title}>Login</Text>

          <Input
            style={styles.input}
            onChangeText={handleChange('email')}
            value={values.email}
            autoComplete={'email'}
            title={'Email'}
            placeholder='Enter email'
          />
          <Input
            style={styles.input}
            onChangeText={handleChange('password')}
            value={values.password}
            title={'Password'}
            secureTextEntry={true}
            placeholder='Enter password'
          />

          <ActionButton
            style={styles.button}
            text={'Register'}
            onPress={handleSubmit}
          />
          <Text style={{ fontSize: 12 }}>
            I don't have an account,
            <Text
              style={{ color: AppStyles.palette.celadonBlue }}
              onPress={() => navigation.navigate('Register')}>
              {' '}
              Register
            </Text>
          </Text>
        </View>
      )}
    </Formik>
  );
};

export default LoginPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: AppStyles.palette.honeydew
  },
  title: {
    fontSize: 14,
    textTransform: 'uppercase',
    color: AppStyles.palette.prussianBlue
  },
  button: {
    marginVertical: 10
  },
  input: {
    marginTop: 10
  }
});
