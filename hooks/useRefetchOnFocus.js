import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';

export const useRefetchOnFocus = (refetch, dependency) => {
  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [dependency])
  );
};
