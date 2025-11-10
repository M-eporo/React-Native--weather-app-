import AntDesign from '@expo/vector-icons/AntDesign';
import { useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, FlatList, StyleSheet, Text, View } from "react-native";
import Input from "../../../../src/components/Input";
import { ResponseModal } from "../../../../src/components/ResponseModal";
import { regionService } from "../../../../src/services/regionService";
import { useAppSelector } from "../../../../src/store/hooks";
import { RootState } from "../../../../src/store/store";
import { FavoriteRegion } from "../../../../src/types/favoriteRegion";

export default function ListScreen() {
    const [showModal, setShowModal] = useState(false);
    const navigation = useNavigation();
    const listData = useAppSelector((state: RootState) => state.initData.initListState);
    const currentWeather = useAppSelector((state: RootState) => state.currentData.currentWeather);

   
    useEffect(() => {
        navigation.setOptions({
            headerBackVisible: true,
            headerTitleAlign: "center",
        })
    }, []);

    const handleDeletePress = async (item: FavoriteRegion) => {
        try {
            await regionService.deleteRegion(item.id);
        } catch(error) {
            Alert.alert("Error", "Failed in deleting Registered region.");
            console.log(error);
        }
    };

    return (
        <View style={styles.container}>
            <View>
                <Input setShowModal={setShowModal}/>
                {/* <View>
                    <ResponseModal showModal={showModal} setShowModal={setShowModal}/>
                </View> */}
            </View>
            <FlatList
                style={styles.container}
                data={listData}
                renderItem={({ item }) => (
                    <View style={styles.flatListItem}>
                        <Text>{item.region}</Text>
                        <AntDesign name="delete" size={24} color="black" onPress={() => handleDeletePress(item)}/>
                    </View>
                )}
                keyExtractor={(item) => item.id.toString()}
            />
            <ResponseModal showModal={showModal} setShowModal={setShowModal} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
    flatListItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 8,
        paddingHorizontal: 8
    }
})