import { FlatList, ScrollView, StyleSheet, View } from "react-native";
import { Text } from "react-native";
import Input from "../../../../src/components/Input";
import { useEffect, useState } from "react";
import { useNavigation } from "expo-router";
import { ResponseModal } from "../../../../src/components/ResponseModal";
import { RootState } from "../../../../src/store/store";
import { useAppSelector } from "../../../../src/store/hooks";
import { FavoriteRegion } from "../../../../src/types/favoriteRegion";

export default function ListScreen() {
    const [showModal, setShowModal] = useState(false);
    const navigation = useNavigation();
    const listData = useAppSelector((state: RootState) => state.initData.initListState);
    console.log(listData)
    useEffect(() => {
        navigation.setOptions({
            headerBackVisible: true,
            headerTitleAlign: "center",
        })
    }, []);

    return (
        <View>
            <View>
                <Input setShowModal={setShowModal}/>
                <View>
                    <ResponseModal showModal={showModal} setShowModal={setShowModal}/>
                </View>
            </View>
            <FlatList
                style={styles.container}
                data={listData}
                renderItem={({ item }) => (
                    <View>
                        <Text>{item.region}</Text>
                    </View>
                )}
                keyExtractor={(item) => item.id.toString()}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
    }
})