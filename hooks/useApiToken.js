import { useState, useEffect } from 'react';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';

export const useApiToken = () => {
  const { getItem, setItem } = useAsyncStorage('@api_key');

  const [token, setToken] = useState(null);

  useEffect(async () => {
    const token = await getItem();
    setToken(token);
  }, []);

  const dispatch = async token => {
    await setItem(token);
    setToken(token);
  };

  return [token, dispatch];
};
