import { router, Stack } from "expo-router";
import { Button } from "react-native";
import { Provider } from "react-redux";
import { store } from "../src/store/store";

export default function Layout() {
    return (
        <Provider store={store}>
            <Stack
                screenOptions={{
                    headerStyle: {
                        backgroundColor: "#f4511e"
                    },
                    headerTintColor: "#fff",
                    headerTitleStyle: {
                        fontWeight: "bold"
                    }
                }}
            >
                <Stack.Screen name="index" options={{headerShown: false}} />
                <Stack.Screen name="home/index" options={{
                        title: "Home", 
                        headerRight: () => <Button onPress={() => router.push("/setting")} title="設定" />
                    }} 
                />
                <Stack.Screen name="setting/index" options={{
                        title: "Setting",
                        //headerRight: () => <Button onPress={() => router.back()} title="戻る" />
                    }}
                />
            </Stack>
        </Provider>
    );
}