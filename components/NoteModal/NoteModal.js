import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Modal, TextInput, Button } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import { Formik, Form, ErrorMessage } from 'formik';
import { useSelector } from 'react-redux';

import ActionButton from '../ActionButton';
import Select from '../Select';
import AppStyles from '../../AppStyles';
import { useAddNoteMutation } from '../../store/notes/notesAPI';

import schema from './validationSchema';

const NoteModal = ({
  navigation,
  modalVisible,
  setModalVisible,
  resources,
  noteType
}) => {
  const user = useSelector(state => state.userState.user);

  const initValues = {
    owner: user?.id || '',
    note_type: noteType,
    note_section: 0,
    money: 0,
    currency: Object.values(resources.currency)[0].code
  };
  const [addNote, { isLoading, error, data: newNote }] = useAddNoteMutation();

  const normalizeMoneyValue = value => {
    let normalizedValue;
    normalizedValue = value.replace(/[^0-9]/g, '');

    return normalizedValue;
  };

  const [noteSections, setNoteSections] = useState(
    Object.values(resources.note_sections).filter(
      ({ id, note_type }) => note_type == noteType
    )
  );

  const handleSubmit = async values => {
    console.log(values);
    try {
      const res = await addNote({ token: user.token, note: values }).unwrap();

      if (res.status === 'success') {
        setModalVisible(false);
      }
    } catch (error) {
      alert(error.error);
    }
  };

  useEffect(() => {
    setNoteSections(
      Object.values(resources.note_sections).filter(
        ({ id, note_type }) => note_type == noteType
      )
    );
  }, [noteType]);

  return (
    <View style={styles.container}>
      <Modal animationType='slide' transparent={true} visible={modalVisible}>
        <Formik
          initialValues={initValues}
          onSubmit={values => handleSubmit(values)}
          validationSchema={schema}>
          {({
            handleChange,
            handleSubmit,
            values,
            setFieldValue,
            isSubmitting,
            ...rest
          }) => {
            return (
              <View style={styles.modal}>
                <View>
                  <Select
                    items={noteSections}
                    currentItem={values.note_section}
                    setValue={value => setFieldValue('note_section', value)}
                    selectName={'note_sections'}
                  />
                </View>
                <View>
                  <View style={styles.input}>
                    <TextInput
                      keyboardType='numeric'
                      onChangeText={value =>
                        setFieldValue('money', normalizeMoneyValue(value))
                      }
                      value={String(values.money)}
                    />
                  </View>
                  <View style={styles.input}>
                    <Picker
                      selectedValue={values.currency}
                      onValueChange={(itemValue, itemIndex) =>
                        setFieldValue('currency', itemValue)
                      }>
                      {Object.values(resources.currency).map(
                        ({ code, symbol, name }) => (
                          <Picker.Item
                            key={code}
                            label={`${symbol} (${name})`}
                            value={code}
                          />
                        )
                      )}
                    </Picker>
                  </View>
                  <ActionButton
                    text={'Save'}
                    onPress={handleSubmit}
                    isLoading={isSubmitting}
                  />
                </View>

                <AntDesign
                  onPress={() => setModalVisible(false)}
                  name='arrowleft'
                  size={24}
                  color='black'
                  style={styles.arrow}
                />
              </View>
            );
          }}
        </Formik>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  modal: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: AppStyles.palette.prussianBlue,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    backgroundColor: AppStyles.palette.white
  },
  arrow: {
    textAlign: 'center'
  },
  select: {
    borderWidth: 1,
    borderColor: AppStyles.palette.powderBlue,
    borderRadius: 20,
    paddingHorizontal: 5
  },
  input: {
    margin: 12,
    padding: 10,
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: AppStyles.palette.powderBlue
  }
});

export default NoteModal;
