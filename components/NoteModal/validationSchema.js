import * as Yup from 'yup';

const schema = Yup.object().shape({
  owner: Yup.string().required(),
  note_type: Yup.number().required('Note type is required.'),
  note_section: Yup.number().required('Note section is required.'),
  money: Yup.number().required('Field is required'),
  currency: Yup.string().required('Currency is required.')
});

export default schema;
