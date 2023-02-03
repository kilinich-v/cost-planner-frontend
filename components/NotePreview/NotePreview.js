import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { AntDesign, Entypo } from '@expo/vector-icons';
import { compareAsc, addDays, format } from 'date-fns';

import AppStyles from '../../AppStyles';

const NotePreview = ({
  date_create,
  note_type,
  note_section,
  money,
  currency,
  id,
  resources,
  handleEdit
}) => {
  const dateNow = new Date();

  const canBeEdited = compareAsc(addDays(dateNow, -1), date_create) < 0;

  return (
    <View>
      <TouchableOpacity
        disabled={!canBeEdited}
        onPress={() =>
          handleEdit({
            date_create,
            note_type,
            note_section,
            money,
            currency,
            id
          })
        }
        style={styles.noteItem}>
        <View style={styles.infoWrapper}>
          <View>
            <Text
              style={{
                ...styles.text,
                textTransform: 'uppercase',
                color:
                  note_type == 2
                    ? AppStyles.palette.celadonBlue
                    : AppStyles.palette.imperialRed
              }}>
              {resources.note_sections[note_section].name}
            </Text>
            <Text
              style={{
                ...styles.text,
                fontSize: 10
              }}>
              {format(date_create, 'dd.MM.yyyy HH:mm')}
            </Text>
          </View>
          {canBeEdited ? (
            <AntDesign
              style={styles.icon}
              name='edit'
              size={15}
              color={AppStyles.palette.prussianBlue}
            />
          ) : (
            <Entypo
              style={styles.icon}
              name='lock'
              size={15}
              color={AppStyles.palette.powderBlue}
            />
          )}
        </View>
        <Text
          style={{
            ...styles.text,
            textTransform: 'uppercase',
            fontSize: 20
          }}>{`${money} ${currency}`}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  noteItem: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: AppStyles.palette.powderBlue
  },
  infoWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '40%'
  },
  icon: {
    marginRight: 10
  },
  text: {
    color: AppStyles.palette.prussianBlue
  }
});

export default NotePreview;
