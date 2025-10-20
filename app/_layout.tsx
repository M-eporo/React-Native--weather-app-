import { router, Stack } from "expo-router";
import { Button } from "react-native";
import { Provider } from "react-redux";
import { store } from "../src/store/store";
import { GluestackUIProvider } from "@gluestack-ui/themed";
import { config} from "@gluestack-ui/config";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function Layout() {
    return (
        <Provider store={store}>
            <GluestackUIProvider config={config}>
                <SafeAreaProvider>
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
                    <Stack.Screen
                        name="(tab)"
                        options={{ headerShown: false }}
                    />
                </Stack>
                </SafeAreaProvider>
            </GluestackUIProvider>
        </Provider>
    );
}
