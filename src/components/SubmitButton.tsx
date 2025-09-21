import { Button, View } from 'react-native';
import { fetchCurrentWeather } from '../features/weather/api';

type Props = {
    onPress: () => void;
}

const SubmitButton = ({onPress}: Props) => {
    return (
        <Button 
            title="送信"
            onPress={onPress}
        />
    );
};

export default SubmitButton;