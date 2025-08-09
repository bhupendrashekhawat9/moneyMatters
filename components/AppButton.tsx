import React from 'react';
import { Pressable, StyleProp, StyleSheet, Text } from 'react-native';

interface AppButtonProps {
    onPress?: () => void;
    title?: string;
    style?: StyleProp<typeof StyleSheet>;
    disabled?: boolean;
}

const AppButton = ({
    onPress,
    title = "Click Me",
    style,
    disabled
}: AppButtonProps) => {
    if (!onPress) {
       onPress  = () => {}
    }
  return (
    <Pressable onPress={onPress} style={[styles.button, style]} disabled={disabled}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  )
}

export default AppButton

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#4F8EF7',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    text: {
        fontSize: 20,
        color: '#fff',
    },
})