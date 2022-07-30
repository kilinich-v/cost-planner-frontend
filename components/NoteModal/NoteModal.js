import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Modal } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';

import Select from '../Select';
import AppStyles from '../../AppStyles';

const NoteModal = ({
  navigation,
  modalVisible,
  setModalVisible,
  resources
}) => {
  const [noteTypes, setNoteTypes] = useState(
    Object.values(resources.note_types)
  );
  const [noteSections, setNoteSections] = useState(
    Object.values(resources.note_sections).filter(
      ({ id, note_type }) => note_type == 0
    )
  );

  const [currentNoteType, setCurrentNoteType] = useState(noteTypes[1].id);
  const [currentNoteSection, setCurrentNoteSection] = useState(
    noteSections.find(section => section === currentNoteType.id)
  );

  useEffect(() => {
    setNoteSections(
      Object.values(resources.note_sections).filter(
        ({ id, note_type }) => note_type === currentNoteType
      )
    );
  }, [currentNoteType]);
  return (
    <View style={styles.container}>
      <Modal animationType='slide' transparent={true} visible={modalVisible}>
        <View style={styles.modal}>
          <View>
            <Select
              items={noteTypes}
              setValue={setCurrentNoteType}
              currentItem={currentNoteType}
              selectName={'note_types'}
            />
            <Select
              items={noteSections}
              currentItem={currentNoteSection}
              setValue={setCurrentNoteSection}
              selectName={'note_sections'}
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
  }
});

export default NoteModal;
