import { Dimensions } from "react-native";
import InputSpinner from "react-native-input-spinner";

type Props = {
  onSelectSpin: (guests: string) => void;
};

const InputSpin = ({ onSelectSpin }: Props) => {
  const { width, height } = Dimensions.get("window");

  return (
    <InputSpinner
      max={5}
      min={1}
      step={1}
      colorMax={"rgb(25, 53, 179)"}
      colorMin={"rgb(25, 53, 179)"}
      style={{
        width: width * 0.45,
      }}
    />
  );
};

export default InputSpin;