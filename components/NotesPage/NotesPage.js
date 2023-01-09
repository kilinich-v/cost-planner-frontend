import { useState } from 'react';
import { StyleSheet, Text, View, Modal } from 'react-native';
import { format } from 'date-fns';

import NoteModal from '../NoteModal';
import ActionButton from '../ActionButton';

import AppStyles from '../../AppStyles';

const NotesPage = ({ navigation, notes, resources }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [currentNoteType, setCurrentNoteType] = useState(null);

  const handleBottons = noteType => {
    setModalVisible(true);
    setCurrentNoteType(noteType);
  };

  const handleScreen = () => {
    if (modalVisible) setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.notesList}>
        {notes?.length
          ? notes.map(
              ({ date_create, noteType, noteSection, money, currency, id }) => (
                <View style={styles.noteItem} key={`note-${id}`}>
                  <View>
                    <Text
                      style={{
                        ...styles.text,
                        textTransform: 'uppercase',
                        color:
                          noteType === 'income'
                            ? AppStyles.palette.celadonBlue
                            : AppStyles.palette.imperialRed
                      }}>
                      {noteSection}
                    </Text>
                    <Text
                      style={{
                        ...styles.text,
                        fontSize: 10
                      }}>
                      {format(date_create, 'dd.MM.yyyy hh:mm')}
                    </Text>
                  </View>
                  <Text
                    style={{
                      ...styles.text,
                      textTransform: 'uppercase',
                      fontSize: 20
                    }}>{`${money} ${currency}`}</Text>
                </View>
              )
            )
          : null}
      </View>
      <View style={styles.buttonsWrapper}>
        <ActionButton
          style={styles.button}
          text={'-'}
          onPress={() => handleBottons(0)}
        />
        <ActionButton
          style={styles.button}
          text={'+'}
          onPress={() => handleBottons(1)}
        />
        <NoteModal
          noteType={currentNoteType}
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          resources={resources}
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
  noteItem: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: AppStyles.palette.powderBlue
  },
  text: {
    color: AppStyles.palette.prussianBlue
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
