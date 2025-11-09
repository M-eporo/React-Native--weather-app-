import { Button, ButtonText } from "@gluestack-ui/themed";
import { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { getWeatherData } from "../features/weather/api";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { setWeather } from "../store/slices/topWeatherSlice";
import { RootState } from "../store/store";
import { TopWeatherItem } from "../types/topWeather";
import { setHourlyWeather } from "../store/slices/hourlyWeatherSlice";
import { setWeeklyWeather } from "../store/slices/weeklyWeatherSlice";

type Props = {
    setShowModal?: React.Dispatch<React.SetStateAction<boolean>>;
}

const Input = ({ setShowModal }: Props) => {
  const [location, setLocation] = useState("");
  const dispatch = useAppDispatch();
  const fetchWeather = async () => {
    const {topData, hourlyDataFormatted, weeklyData } = await getWeatherData(location);
    dispatch(setWeather(topData));
    dispatch(setHourlyWeather(hourlyDataFormatted));
    dispatch(setWeeklyWeather(weeklyData));
    setShowModal && setShowModal(true);
  };

  return (
    <View style={styles.container}>
        <TextInput
            style={styles.input}
            placeholder="Enter City Name"
            onChangeText={(newLocation) => setLocation(newLocation)}
            defaultValue={location}
        />
        <Button
            style={{ height: 50 }}
            size="md"
            variant="outline"
            action="primary"
            onPress={fetchWeather}
        >
            <ButtonText>Get Weather!!</ButtonText>
        </Button>
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
    container: {
        marginBottom: 16,
    },
    input: {
        height: 50,
        marginVertical: 12,
        paddingHorizontal: 8,
        borderWidth: 2,
        borderColor: "#ccc",
        borderRadius: 8,
        fontSize: 18,
        textAlignVertical: "center",
    },
});
