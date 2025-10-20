import AntDesign from '@expo/vector-icons/AntDesign';
import { useEffect, useRef } from 'react';
import { Animated, StyleSheet, TouchableOpacity } from "react-native";

type Props = {
    children: React.ReactNode;
    isOpen: boolean;
}
export const ExpandControl = ({ children, isOpen }: Props) => {
    const rotateAnim = useRef(new Animated.Value(0)).current;
    const rotateInterpolate = rotateAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ["0deg", "225deg"]
    });

    useEffect(() => {
        Animated.timing(rotateAnim, {
            toValue: isOpen ? 1 : 0,
            duration: 300,
            useNativeDriver: true
        }).start();
    }, [isOpen]);

    return (
        <Animated.View style={{transform: [{rotate: rotateInterpolate}]}}>
            
                {children}
            
        </Animated.View>
    )
};

const styles = StyleSheet.create({
    icons: {
        flexDirection: "row",
        //transform: "rotate(0deg)"
    },
})