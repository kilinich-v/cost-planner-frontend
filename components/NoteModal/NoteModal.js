import { useState, useEffect } from 'react';
import { View, StyleSheet, Modal, TextInput } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Formik } from 'formik';

import ActionButton from '../ActionButton';
import Select from '../Select';
import AppStyles from '../../AppStyles';
import {
  useAddNoteMutation,
  useSetNoteMutation
} from '../../store/notes/notesAPI';

import schema from './validationSchema';

const NoteModal = ({
  navigation,
  modalVisible,
  setModalVisible,
  resources,
  currentNote,
  user
}) => {
  const [addNote, { isLoading: isLoadingAdd, error: errorAdd, data: newNote }] =
    useAddNoteMutation();
  const [
    setNote,
    { isLoading: isLoadingSet, error: errorSet, data: settedNote }
  ] = useSetNoteMutation();

  const normalizeMoneyValue = value => {
    let normalizedValue;
    normalizedValue = value.replace(/[^0-9]/g, '');

    return normalizedValue;
  };

  const [noteSections, setNoteSections] = useState(
    Object.values(resources.note_sections).filter(
      ({ note_type }) => note_type == currentNote.note_type
    )
  );

  const handleSubmit = async values => {
    console.log(values);
    try {
      let res;

      if (!!values?.id) {
        res = await setNote({ token: user.token, note: values }).unwrap();
      } else {
        res = await addNote({ token: user.token, note: values }).unwrap();
      }

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
        ({ note_type }) => note_type == currentNote.note_type
      )
    );
  }, [currentNote]);

  return (
    <View style={styles.container}>
      <Modal animationType='slide' transparent={true} visible={modalVisible}>
        <Formik
          initialValues={currentNote}
          onSubmit={values => handleSubmit(values)}
          validationSchema={schema}>
          {({ handleSubmit, values, setFieldValue, isSubmitting }) => {
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
                <View style={styles.currencyWrapper}>
                  <View style={styles.money}>
                    <View style={styles.input}>
                      <TextInput
                        keyboardType='numeric'
                        onChangeText={value =>
                          setFieldValue('money', normalizeMoneyValue(value))
                        }
                        value={String(values.money)}
                      />
                    </View>
                  </View>
                  <View style={styles.currency}>
                    <Select
                      items={Object.values(resources.currency).map(
                        ({ code, symbol, name }) => ({
                          name: `${symbol} (${name})`,
                          id: code
                        })
                      )}
                      style={styles.currencySelect}
                      currentItem={values.currency}
                      setValue={value => setFieldValue('currency', value)}
                      selectName={'note_sections'}
                    />
                  </View>
                </View>
                <ActionButton
                  text={'Save'}
                  onPress={handleSubmit}
                  isLoading={isSubmitting}
                />

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
    display: 'flex',
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
  currencyWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  money: {
    minWidth: '55%'
  },
  currency: {
    width: '40%'
  },
  currencySelect: {
    paddingHorizontal: 0,
    paddingVertical: 0,
    fontSize: 40,
    borderWidth: 0,
    borderRadius: 0,
    borderBottomWidth: 1,
    borderBottomColor: AppStyles.palette.powderBlue
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
