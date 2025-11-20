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
import { fetch } from '../../../../src/db/dbService';
import { seedForTest } from '../../../../src/db/seedForTest';
import { getCachedWeather } from '../../../../src/services/cacheWeatherService';
import { refreshWeather } from '../../../../src/services/refreshWeatherService';
import { cachedListData } from '../../../../src/types/cacheWeather';

export default function ListScreen() {
    const [showModal, setShowModal] = useState(false);
    const navigation = useNavigation();
    const listData = useAppSelector((state: RootState) => state.initData.initListState);
    const currentWeather = useAppSelector((state: RootState) => state.currentData.currentWeather);

    const [rows, setRows] = useState<cachedListData[]>();
   
    useEffect(() => {
        navigation.setOptions({
            headerBackVisible: true,
            headerTitleAlign: "center",
        });
    }, []);

    // useEffect(() => {
    //     (async () => {

    //         //await seedForTest();
    //         const rows = await fetch<{id: number, region: string}>({
    //             sql: "SELECT id, region FROM regions ORDER BY view_count DESC",
    //         });
    //         const p = new Promise((resolve) => {
    //             setTimeout(() => resolve(rows), 1000);
    //         });
    //         p.then((rows) => {
    //             console.log(rows);
    //         })

    //         const joined = await Promise.all(
    //             rows.map( async (row) => {
    //                 const cache = await fetch<{ payload: string, fetched_at: number }>({
    //                     sql: "SELECT payload, fetched_at FROM cache_weather WHERE region_id = ?",
    //                     params: [row.id]

    //                 });
    //                 const json = cache[0] ? JSON.parse(cache[0].payload) : null;
    //                 return { id: row.id, region: row.region, temp: json?.current?.temp_c ?? null };
    //             })
    //         );
    //         setRows(joined);
    //     })();
    // }, []);
    // console.log(getrows);

    useEffect(() => {
        (async () => {
            //地域一覧取得
            const regions = await regionService.getRegions();

            const joined = await Promise.all(
                regions.map( async (region) => {
                    //cached_weatherテーブルから、payload、fetched_atを取得
                    const cache = await getCachedWeather(region.id);
                    return {
                        id: region.id,
                        region: region.region,
                        temp_c: cache?.payload?.current?.temp_c,
                        condition: cache?.payload?.current?.condition?.text,
                        max_temp: cache?.payload?.forecast?.forecastday[0]?.day?.maxtemp_c,
                        min_temp: cache?.payload?.forecast?.forecastday[0]?.day?.mintemp_c,
                    }
                })
            );
            //一覧を更新
            setRows(joined);
            //画面表示後にバックグラウンドでキャッシュを更新
            await refreshWeather(regions);

            const updated = await Promise.all(
                regions.map(async (region) => {
                    const cache = getCachedWeather(region.id);
                    return {
                        id: region.id,
                        region: region.region,
                        payload: cache?.payload?.current?.temp_c || null
                    }
                })
            );
            setRows(updated);
        })()
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
            <View>
                {getrows ? getrows.map((row) => (
                    <View>
                        <Text>{row.id}</Text>
                        <Text>{row.region}</Text>
                    </View>
                )): null}
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