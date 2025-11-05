import { router, Stack } from "expo-router";
import { Button } from "react-native";

export default function HomeScreenStack() {
    return (
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
            <Stack.Screen name="index" options={{
                title:"Home",
                headerRight: () => <Button onPress={() => router.push("/(tab)/home/list")} title="List"/>  
            }}/>
            <Stack.Screen name="list" options={{
                title: "List",
                headerRight: () => <Button onPress={() => router.back()} title="Back" />
            }}/>
        </Stack>
    )
}