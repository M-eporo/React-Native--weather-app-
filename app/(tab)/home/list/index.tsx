import { ScrollView, StyleSheet, View } from "react-native";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Input from "../../../../src/components/Input";

export default function ListScreen() {


    return (
        <SafeAreaView>
            <View>
                <Input />
            </View>
            <ScrollView>
            <View>
                <Text style={styles.regionName}></Text>
            </View>
        </ScrollView>
        </SafeAreaView>
        
        
    );
};

const styles = StyleSheet.create({
    regionName: {
        fontSize: 18,
        fontWeight: "bold",
    }
})