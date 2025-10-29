import { ScrollView, StyleSheet, View } from "react-native";
import { Text } from "react-native";
import Input from "../../../../src/components/Input";
import { useEffect, useState } from "react";
import { useNavigation } from "expo-router";
import { ResponseModal } from "../../../../src/components/ResponseModal";

export default function ListScreen() {
    const [showModal, setShowModal] = useState(false);
    const navigation = useNavigation();
    useEffect(() => {
        navigation.setOptions({
            headerBackVisible: true,
            headerTitleAlign: "center",
        })
    }, []);

    return (
        <View style={styles.container}>
            <Input setShowModal={setShowModal}/>
            <View>
                <ResponseModal showModal={showModal} setShowModal={setShowModal}/>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
    }
})