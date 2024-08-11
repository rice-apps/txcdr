import { StyleSheet, View } from "react-native";
import React, { useState } from "react";
import { Zinc } from "../../utils/styles/colors";
import Modal, { ModalProps } from "react-native-modal";
import { ms } from "react-native-size-matters";

const BOTTOM_BUFFER = 400;

/**
 * Basically the filter modal on Doordash's home page. Visibility control needs to be implemented by the parent.
 */
export const HandledModal: React.FC<Partial<ModalProps>> = (
  props: Partial<ModalProps>,
) => {
  const [height, setHeight] = useState(0);

  return (
    <Modal
      useNativeDriverForBackdrop
      style={{ margin: 0 }}
      swipeDirection={"down"}
      avoidKeyboard
      {...props}
    >
      <View style={[styles.panel, { height: height + 20 + BOTTOM_BUFFER }]}>
        <View style={styles.handle} />
        <View
          style={styles.contentContainer}
          onLayout={(e) => setHeight(e.nativeEvent.layout.height)}
        >
          {props.children}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  panel: {
    flex: 1,
    position: "absolute",
    width: "100%",
    backgroundColor: Zinc[200],
    borderTopLeftRadius: ms(40),
    borderTopRightRadius: ms(40),
    shadowColor: "#000",
    shadowOpacity: 0.25,
    bottom: -BOTTOM_BUFFER,
  },
  handle: {
    height: ms(5),
    width: ms(40),
    backgroundColor: Zinc[400],
    borderRadius: ms(5),
    alignSelf: "center",
    marginTop: ms(10),
  },
  contentContainer: {
    padding: ms(20),
  },
});
