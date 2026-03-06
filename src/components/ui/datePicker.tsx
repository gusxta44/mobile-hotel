import { Dimensions, View } from "react-native";
import DatePicker, { getToday } from "react-native-modern-datepicker";

type Props = {
  onSelectDate: (date: string) => void;
  minimumDate?: string;
};

const DateSelector = ({ onSelectDate, minimumDate }: Props) => {
  const { width } = Dimensions.get("window");

  return (
    <View>
      <DatePicker
        mode="calendar"
        options={{
          backgroundColor: "white",
          textHeaderColor: "black",
          textDefaultColor: "black",
          selectedTextColor: "#534e4eff",
          mainColor: "blue",
          textSecondaryColor: "#574d4dff",
          borderColor: "blue",
          textFontSize: 14,
          textHeaderFontSize: 15,
        }}
        style={{ borderRadius: 15, width: width * 0.65 }}
        isGregorian={true}
        minimumDate={minimumDate ?? getToday()}
        onDateChange={(date) => {
          onSelectDate(date);
        }}
      />
    </View>
  );
};

export default DateSelector;