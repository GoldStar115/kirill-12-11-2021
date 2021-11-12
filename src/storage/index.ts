import MMKVStorage from 'react-native-mmkv-storage';
const MMKV = new MMKVStorage.Loader().initialize(); // Returns an MMKV Instance

export const setStringWithKey = async ({
  key,
  value,
}: {
  key: string;
  value: string;
}) => {
  await MMKV.setStringAsync(key, value);
};

export const getStringWithKey = async (key: string) => {
  return await MMKV.getStringAsync(key);
};
