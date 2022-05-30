import * as Yup from 'yup';

const schema = Yup.object().shape({
  name: Yup.string().min(3).max(150).required('No name provided.'),
  email: Yup.string().email().required('No email provided.'),
  password: Yup.string()
    .required('No password provided.')
    .min(8, 'Password is too short - should be 8 chars minimum.')
    .matches(
      /[a-zA-Z, 0-9]/,
      'Password can only contain Latin letters or Numbers.'
    )
});

export default schema;
