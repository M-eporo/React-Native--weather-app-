import { useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { Button, ButtonText } from "@gluestack-ui/themed";
import { getWeatherData } from "../features/weather/api";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { getWeather } from "../store/slices/weatherSlice";
import { RootState } from "../store/store";
import { ResponseCurrentWeatherType } from "../types/weather";

const Input = () => {
  const [location, setLocation] = useState("");
  const [weatherData, setWeatherData] = useState<ResponseCurrentWeatherType>();

  const dispatch = useAppDispatch();
  const currentWeather = useAppSelector(
    (state: RootState) => state.weather.currentWeather
  );

  const fetchWeather = async () => {
    const data = await getWeatherData(location);
    setWeatherData(data);
    dispatch(getWeather(data));
  };

  return (
    <View style={styles.container}>
        <TextInput
            style={styles.input}
            placeholder="Type Here Your Location"
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
            <ButtonText>
                Get Weather!!
            </ButtonText>
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
  }
});
