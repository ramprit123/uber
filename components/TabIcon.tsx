import React from 'react';
import { Image, View, StyleSheet } from 'react-native';
import { icons } from '~/constants';

interface TabIconProps {
  name: keyof typeof icons;
  color: string;
  focused: boolean;
}

const TabIcon: React.FC<TabIconProps> = ({ name, color, focused }) => {
  return (
    <View style={[styles.iconContainer, focused && styles.focused]}>
      <Image
        source={icons[name]}
        style={[styles.icon, { tintColor: color }]}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 36,
    height: 36,
    borderRadius: 18,
  },
  focused: {
    backgroundColor: 'rgba(0,220,138,0.1)',
  },
  icon: {
    width: 28,
    height: 28,
  },
});

export default TabIcon;
