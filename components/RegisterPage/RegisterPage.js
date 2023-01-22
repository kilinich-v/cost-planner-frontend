import { useEffect } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { Formik, ErrorMessage } from 'formik';

import Input from '../Input';
import ActionButton from '../ActionButton';
import schema from './validationSchema';
import { useRegisterUserMutation } from '../../store/user/userAPI';
import { useApiToken } from '../../hooks';

import AppStyles from '../../AppStyles';

const initValues = {
  email: 'mail@mail.com',
  name: 'Molekula',
  password: '11111111'
};

const RegisterPage = ({ navigation }) => {
  const [token, setToken] = useApiToken();

  const [registerUser, { isSuccess, isLoading, error, data }] =
    useRegisterUserMutation();

  const handleSubmit = async values => {
    try {
      await registerUser(values).unwrap();
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(async () => {
    if (data?.user?.token) {
      setToken(data.user.token);

      Alert.alert('Success!', 'User is registered');

      navigation.navigate('Login');
    }
  }, [data]);

  return (
    <Formik
      initialValues={initValues}
      onSubmit={handleSubmit}
      validationSchema={schema}>
      {({ handleChange, handleSubmit, values }) => (
        <View style={styles.container}>
          <Text style={styles.title}>Register</Text>

          <View style={styles.inputWrapper}>
            <Input
              style={styles.input}
              onChangeText={handleChange('name')}
              value={values.name}
              autoComplete={'name'}
              title={'Name'}
              placeholder='Enter your name'
            />
            <ErrorMessage name='name'>
              {msg => <Text style={styles.errorText}>{msg}</Text>}
            </ErrorMessage>
          </View>

          <View style={styles.inputWrapper}>
            <Input
              style={styles.input}
              onChangeText={handleChange('email')}
              value={values.email}
              autoComplete={'email'}
              title={'Email'}
              placeholder='Enter email'
            />
            <ErrorMessage name='email'>
              {msg => <Text style={styles.errorText}>{msg}</Text>}
            </ErrorMessage>
          </View>

          <View style={styles.inputWrapper}>
            <Input
              style={styles.input}
              onChangeText={handleChange('password')}
              value={values.password}
              title={'Password'}
              secureTextEntry={true}
              placeholder='Enter password'
            />
            <ErrorMessage name='password'>
              {msg => <Text style={styles.errorText}>{msg}</Text>}
            </ErrorMessage>
          </View>

          <ActionButton
            style={styles.button}
            text={'Register'}
            onPress={handleSubmit}
            isLoading={isLoading}
          />
          {error?.data?.error && (
            <View>
              <Text style={styles.errorText}>{error.data.error}</Text>
            </View>
          )}
          <Text style={{ fontSize: 12 }}>
            I have account,
            <Text
              style={{ color: AppStyles.palette.celadonBlue }}
              onPress={() => navigation.navigate('Login')}>
              {' '}
              Login
            </Text>
          </Text>
        </View>
      )}
    </Formik>
  );
};

export default RegisterPage;

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
  },
  inputWrapper: {
    width: '50%'
  },
  errorText: {
    color: AppStyles.palette.imperialRed,
    fontSize: 8
  }
});
