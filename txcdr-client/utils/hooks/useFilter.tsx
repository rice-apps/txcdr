import { StyleSheet } from "react-native";
import { DText } from "../../components/styled-rn/DText";
import { Zinc } from "../styles/colors";
import { ReactNode, useState } from "react";
import { ms } from "react-native-size-matters";
import { MaterialIcons } from "@expo/vector-icons";
import {
  OpacityPressable,
  OpacityPressableProps,
} from "../../components/styled-rn/OpacityPressable";

interface ButtonProps extends OpacityPressableProps {
  suffix?: string;
}

export function useFilter(params: {
  name: string;
  icon?: ReactNode;
  modal?: boolean;
}): [(props: ButtonProps) => JSX.Element, boolean, () => void] {
  const [isModalVisible, setModalVisible] = useState(false);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return [
    (props) => {
      return (
        <OpacityPressable
          style={[
            styles.buttonContainer,
            { backgroundColor: props.suffix ? Zinc[700] : "transparent" },
          ]}
          onPress={toggleModal}
        >
          {params.icon}
          <DText
            style={[
              styles.text,
              { color: props.suffix ? Zinc[100] : Zinc[800] },
            ]}
          >
            {params.name + (props.suffix ? `: ${props.suffix}` : "")}
          </DText>
          {params.modal && (
            <MaterialIcons
              name="keyboard-arrow-down"
              size={ms(20)}
              color={props.suffix ? Zinc[100] : Zinc[800]}
            />
          )}
        </OpacityPressable>
      );
    },
    isModalVisible,
    toggleModal,
  ];
}

const styles = StyleSheet.create({
  buttonContainer: {
    borderColor: Zinc[400],
    borderWidth: 1,
    paddingVertical: ms(5),
    paddingHorizontal: ms(12),
    borderRadius: 100,
    flexDirection: "row",
    gap: ms(5),
    alignItems: "center",
  },
  text: {
    fontWeight: "600",
  },
});
