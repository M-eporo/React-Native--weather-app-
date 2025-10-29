import { useState } from "react";
import { Modal, Pressable, StyleSheet, Text } from "react-native"
import { View } from "react-native"
import CurrentWeather from "./CurrentWeather";
import HourlyWeather from "./HourlyWeather";
import WeeklyWeather from "./WeeklyWeather";
import { RootState } from "../store/store";
import { ScrollView } from "@gluestack-ui/themed";

type Props = {
    showModal: boolean;
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ResponseModal = ({ showModal, setShowModal }: Props) => {
    
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
                        onPress={() => {
                            
                        }}
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