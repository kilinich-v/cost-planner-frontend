import * as Yup from 'yup';

const schema = Yup.object().shape({
  owner: Yup.string().required(),
  note_type: Yup.string().required('Note type is required.'),
  note_section: Yup.string().required('Note section is required.'),
  money: Yup.number().required('Field is required'),
  currency: Yup.string().required('Currency is required.')
});

export default schema;
