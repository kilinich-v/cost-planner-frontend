import { View, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

import AppStyles from '../../AppStyles';

const Select = ({ items, setValue, currentItem, selectName, style }) => {
  return (
    <View style={style ? style : defaultStyles.select}>
      <Picker
        selectedValue={currentItem}
        onValueChange={(itemValue, itemIndex) => setValue(itemValue)}>
        {items.map(({ id, name }) => (
          <Picker.Item key={`${selectName}-${id}`} label={name} value={id} />
        ))}
      </Picker>
    </View>
  );
};

export default Select;

const defaultStyles = StyleSheet.create({
  select: {
    borderWidth: 1,
    borderColor: AppStyles.palette.powderBlue,
    borderRadius: 20,
    paddingHorizontal: 5
  }
});
