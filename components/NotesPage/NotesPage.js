import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { format } from 'date-fns';

import NotePreview from '../NotePreview';
import NoteModal from '../NoteModal';
import ActionButton from '../ActionButton';

import { useRefetchOnFocus } from '../../hooks';

import AppStyles from '../../AppStyles';

const NotesPage = ({ navigation, notes, refetchNotes, resources }) => {
  const user = useSelector(state => state.userState.user);

  const initValues = {
    owner: user?.id || '',
    note_type: 0,
    note_section: 0,
    money: 0,
    currency: Object.values(resources.currency)[0].code
  };

  const [modalVisible, setModalVisible] = useState(false);

  const [currentNote, setCurrentNote] = useState(initValues);

  useRefetchOnFocus(refetchNotes, modalVisible);

  const handleBottons = noteType => {
    setCurrentNote({ ...initValues, note_type: noteType });
    setModalVisible(true);
  };

  const handleChangeNote = note => {
    setCurrentNote(note);
    setModalVisible(true);
  };

  useEffect(() => {
    if (!modalVisible) {
      setCurrentNote(initValues);
    }
  }, [modalVisible]);

  return (
    <View style={styles.container}>
      <View style={styles.notesList}>
        {notes?.length
          ? notes.map(note => (
              <NotePreview
                {...note}
                resources={resources}
                key={`note-${note.id}`}
                handleEdit={handleChangeNote}
              />
            ))
          : null}
      </View>
      <View style={styles.buttonsWrapper}>
        <ActionButton
          style={styles.button}
          text={'-'}
          onPress={() => handleBottons(1)}
        />
        <ActionButton
          style={styles.button}
          text={'+'}
          onPress={() => handleBottons(2)}
        />
        <NoteModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          resources={resources}
          currentNote={currentNote}
          user={user}
        />
      </View>
    </View>
  );
};

export default NotesPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppStyles.palette.honeydew
  },
  notesList: {
    flex: 1,
    justifyContent: 'flex-start',
    marginRight: 'auto',
    marginLeft: 'auto',
    width: '80%',
    maxHeight: '80%'
  },

  buttonsWrapper: {
    position: 'relative',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    maxHeight: '20%'
  },
  button: {
    marginRight: 'auto',
    marginLeft: 'auto',
    width: '50%'
  }
});
