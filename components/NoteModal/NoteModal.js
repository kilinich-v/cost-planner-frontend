import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Modal, TextInput } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import { Formik, ErrorMessage } from 'formik';
import { useSelector } from 'react-redux';

import Select from '../Select';
import AppStyles from '../../AppStyles';
import { useCurrentUserMutation } from '../../store/user/userSlice';

import schema from './validationSchema';

const NoteModal = ({
  navigation,
  modalVisible,
  setModalVisible,
  resources,
  noteType
}) => {
  const [initValues, setInitValues] = useState({
    owner: '',
    note_type: '',
    note_section: '',
    money: 0,
    currency: ''
  });

  const user = useSelector(state => state.user);

  const [noteSections, setNoteSections] = useState(
    Object.values(resources.note_sections).filter(
      ({ id, note_type }) => note_type == noteType
    )
  );

  useEffect(() => {
    setNoteSections(
      Object.values(resources.note_sections).filter(
        ({ id, note_type }) => note_type == noteType
      )
    );

    setInitValues(prev => ({
      ...prev,
      note_type: noteType,
      note_section: noteSections.find(section => section.note_type == noteType)
    }));
  }, [noteType]);

  const handleSubmit = async () => {};

  return (
    <View style={styles.container}>
      <Modal animationType='slide' transparent={true} visible={modalVisible}>
        <Formik
          initialValues={initValues}
          onSubmit={handleSubmit}
          validationSchema={schema}>
          {({ handleChange, handleSubmit, values, setFieldValue }) => (
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
                    onChangeText={value =>
                      setFieldValue('money', Number(value))
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
              </View>

              <AntDesign
                onPress={() => setModalVisible(false)}
                name='arrowleft'
                size={24}
                color='black'
                style={styles.arrow}
              />
            </View>
          )}
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
