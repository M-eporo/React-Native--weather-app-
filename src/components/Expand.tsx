import { useEffect, useRef, useState } from "react"
import { Animated, LayoutAnimation, LayoutChangeEvent, Platform, Pressable, ScrollView, StyleSheet, Text, UIManager, View } from "react-native"

type Props = {
    children: React.ReactNode
    isOpen: boolean;
}


export const Expand = ({children, isOpen}: Props) => {
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const heightAnim = useRef(new Animated.Value(0)).current;
    const [contentHeight, setContentHeight] = useState(0);

    useEffect(() => {
        //ずらしたほうがいい
            Animated.parallel([
                Animated.timing(fadeAnim, {
                    toValue: isOpen ? 1 : 0,
                    duration: 200,
                    useNativeDriver: false,
                }),
                Animated.timing(heightAnim, {
                    toValue: isOpen ? contentHeight : 1,
                    duration: 200,
                    useNativeDriver: false,
                })
            ]).start();
    }, [isOpen]);

    
    return (
        <Animated.View style={[ styles.animated, {opacity: fadeAnim, height: heightAnim}]}>
            <View onLayout={(e) => {
                const measuredHeight = e.nativeEvent.layout.height;
                setContentHeight(measuredHeight);
            }}>
            {children}
            </View>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    animated: {
        flex: 1,
        height: "auto",
        
    },
});