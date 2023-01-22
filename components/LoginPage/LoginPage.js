import { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Formik } from 'formik';

import Input from '../Input';
import ActionButton from '../ActionButton';
import { useLoginUserMutation } from '../../store/user/userAPI';
import { useApiToken } from '../../hooks';

import AppStyles from '../../AppStyles';

const initValues = {
  email: 'mail1@mail.com',
  password: '123123123'
};

const LoginPage = ({ navigation }) => {
  const [token, setToken] = useApiToken();

  const [loginUser, { isLoading, error, data }] = useLoginUserMutation();

  const handleSubmit = async values => {
    try {
      await loginUser(values).unwrap();
    } catch (error) {
      alert(error.data.message);
    }
  };

  useEffect(async () => {
    if (data?.token) {
      setToken(data.token);
    }
  }, [data]);

  return (
    <Formik initialValues={initValues} onSubmit={handleSubmit}>
      {({ handleChange, handleSubmit, values }) => (
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
            text={'Login'}
            onPress={handleSubmit}
            isLoading={isLoading}
          />
          {error?.data?.error && (
            <View>
              <Text style={styles.errorText}>{error.data.error}</Text>
            </View>
          )}
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
  },
  errorText: {
    color: AppStyles.palette.imperialRed,
    fontSize: 8
  }
});
