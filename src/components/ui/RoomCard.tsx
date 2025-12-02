import { FontAwesome5, FontAwesome6, MaterialIcons } from "@expo/vector-icons";
import { Dimensions, Image, ImageSourcePropType, Text, View } from "react-native";
import { RoomStyle } from "./RoomStyle";

type NameIcon =
  | { lib: "MaterialIcons"; name: keyof typeof MaterialIcons.glyphMap }
  | { lib: "FontAwesome6"; name: keyof typeof FontAwesome6.glyphMap }
  | { lib: "FontAwesome5"; name: keyof typeof FontAwesome5.glyphMap };

type Infos = { title?: string; text: string; price: number };

type Props = {
  image?: ImageSourcePropType;
  label?: string;
  description?: Infos;
  icon?: NameIcon;
};

const RoomCard = ({ image, label, description, icon }: Props) => {
  return (
    <View style={RoomStyle.container}>
      {!!image &&
      <View><Image style={RoomStyle.image} source={image} resizeMode="cover"/></View>}
      {!!label && <Text style={RoomStyle.title}>{label}</Text>}
      <View style={RoomStyle.row}>
        {!!icon && (
          <View style={RoomStyle.icon}>
            {icon.lib === "MaterialIcons" && (
              <MaterialIcons name={icon.name} size={24} color="#4A4AFF" />
            )}
            {icon.lib === "FontAwesome5" && (
              <FontAwesome5 name={icon.name} size={24} color="#4A4AFF" />
            )}
            {icon.lib === "FontAwesome6" && (
              <FontAwesome6 name={icon.name} size={24} color="#4A4AFF" />
            )}
          </View>
        )}

        {!!description && (
          <View style={RoomStyle.descriptionContainer}>
            {!!description.title && (
              <Text style={RoomStyle.label}>{description.title}</Text>
            )}

            <Text style={RoomStyle.descriptionText}>{description.text}</Text>
          </View>
        )}

        {!!description && (
          <Text style={RoomStyle.price}>R$ {description.price}</Text>
        )}
      </View>

    </View>
  );
};

export default RoomCard;


