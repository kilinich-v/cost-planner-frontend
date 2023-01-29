import { StyleSheet, ActivityIndicator } from 'react-native';
import { useSelector } from 'react-redux';

import NotesPage from '../../components/NotesPage';
import { useGetResourcesForNotesQuery } from '../../store/resources/resourcesAPI';
import { useGetNotesQuery } from '../../store/notes/notesAPI';
import { useApiToken, useRefetchOnFocus } from '../../hooks';

import AppStyles from '../../AppStyles';

const NotesScreen = ({ navigation }) => {
  const [token, setToken] = useApiToken();

  const {
    data: resources,
    isLoading: isLoadingResources,
    isSuccess: isSuccessResources,
    isError: isErrorResources,
    error: errorResources
  } = useGetResourcesForNotesQuery();

  const {
    data: notes,
    isLoading: isLoadingNotes,
    isSuccess: isSuccessNotes,
    isError: isErrorNotes,
    error: errorNotes,
    refetch
  } = useGetNotesQuery(token);

  if (isLoadingResources || isLoadingNotes) {
    return (
      <ActivityIndicator
        size='large'
        color={AppStyles.palette.celadonBlue}
        style={styles.spinner}
      />
    );
  }

  return (
    <NotesPage
      resources={resources.data}
      notes={notes?.data}
      refetchNotes={refetch}
      navigation={navigation}
    />
  );
};

export default NotesScreen;

const styles = StyleSheet.create({
  spinner: {
    flex: 1
  }
});
