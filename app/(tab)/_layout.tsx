import { router, Tabs } from "expo-router";
import Ionicons from '@expo/vector-icons/Ionicons';
import { Button } from "react-native";

export default function TabsLayout() {
    return (
        <Tabs screenOptions={{headerShown: false}}>
            <Tabs.Screen
                name="home"
                options={{
                    title: "Home",
                    tabBarIcon:({color, size}) => (
                        <Ionicons name="home-outline" size={size} color={color} />
                    )
                }}
            />
            <Tabs.Screen
                name="setting/index"
                options={{
                    title:"Setting",
                    // headerShown: true,
                    // headerStyle: {
                    //     backgroundColor: "#f4511e"
                    // },
                    // headerTintColor: "#fff",
                    // headerTitleStyle: {
                    //     fontWeight: "bold",
                    // },
                    // headerRight: () => (
                    //     <Button onPress={() => router.back()} title="Back" />
                    // ),
                    tabBarIcon: ({color, size}) => (
                        <Ionicons name="settings-outline" size={size} color={color} />
                    )
                }}
            />
        </Tabs>
    )
}