import { Dimensions, View } from "react-native";
import DatePicker, { getToday } from "react-native-modern-datepicker";

type Props = {
  onSelectDate: (date: string) => void;
};

const DateSelector = ({ onSelectDate }: Props) => {
  const { width } = Dimensions.get("window");
  const today = getToday();

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
        style={{ borderRadius: 15, width: width * 0.65, height: "auto", zIndex: 1 }}
        isGregorian={true}
        minimumDate={today}
        onDateChange={(date) => {
          onSelectDate(date);
        }}
      />
    </View>
  );
};

export default DateSelector;