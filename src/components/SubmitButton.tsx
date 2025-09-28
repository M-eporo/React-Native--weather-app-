import { Button, View } from 'react-native';

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