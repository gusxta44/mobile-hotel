import { Dimensions } from "react-native";
import InputSpinner from "react-native-input-spinner";

type Props = {
  onSelectSpin: (guests: number) => void;
};

const InputSpin = ({ onSelectSpin }: Props) => {
  const { width } = Dimensions.get("window");

  return (
    <InputSpinner
      max={5}
      min={1}
      step={1}
      initialValue={1}
      color="rgb(25, 53, 179)"
      onChange={(num: number) => onSelectSpin(num)}
      style={{
        width: width * 0.45,
      }}
    />
  );
};

export default InputSpin;
