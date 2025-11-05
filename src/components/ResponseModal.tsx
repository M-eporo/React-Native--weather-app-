import { useState } from "react";
import { Alert, Modal, Pressable, StyleSheet, Text } from "react-native"
import { View } from "react-native"
import CurrentWeather from "./CurrentWeather";
import HourlyWeather from "./HourlyWeather";
import WeeklyWeather from "./WeeklyWeather";
import { ScrollView } from "@gluestack-ui/themed";
import { regionService } from "../services/regionService";
import { useAppSelector } from "../store/hooks";
import { RootState } from "../store/store";
import { router } from "expo-router";

type Props = {
    showModal: boolean;
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ResponseModal = ({ showModal, setShowModal }: Props) => {
    const currentWeather = useAppSelector((state: RootState) => state.currentData.currentWeather);
    
    const onPressAdd = async () => {
        try {
            await regionService.addRegion(currentWeather.name);
            setShowModal(false);
        } catch(error) {
            console.error(error);
            Alert.alert("Error", "Failed to add new region.", [
                {
                    text: "OK",
                    onPress: () => setShowModal(false)
                }
            ]);
        }
    };

    return (
        <Modal
            animationType="slide"
            transparent={false}
            visible={showModal}
            backdropColor="rgba(255,255,255,0.7)"
            onRequestClose={() => {
                console.log("Modal Close");
                setShowModal(false);
            }}
            onShow={() => console.log("Modal Open")}
        >
            <ScrollView style={styles.container}>
                <View style={styles.buttonContainer}>
                    <Pressable
                        onPress={() => {
                            setShowModal(false);
                        }}
                    >
                        <Text style={styles.buttonText}>Cancel</Text>
                    </Pressable>
                    <Pressable
                        onPress={onPressAdd}
                    >
                        <Text style={styles.buttonText}>Add</Text>
                    </Pressable>
                </View>
                <CurrentWeather />
                <HourlyWeather />
                <WeeklyWeather />
            </ScrollView>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 8,
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 6,
    },
    buttonText: {
        fontWeight: "bold",
        fontSize: 16,
        textShadowColor: "rgba(0, 0, 0, 0.6)",
        textShadowOffset: {width: 2, height: 2},
        textShadowRadius: 6,
    }
});