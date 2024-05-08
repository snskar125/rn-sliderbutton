import { View, Image, StyleSheet, Animated, PanResponder } from "react-native";
import DoubleChevron from "./DoubleChevron.png";
import { memo, useRef } from "react";
const SliderButton = memo((props) => {
  const {
    width,
    buttonBorderRadius,
    containerBorderRadius,
    icon,
    buttonSize,
    buttonColor,
    backgroundColor,
    onSuccess,
    onFail,
    padding,
    disabled,
    label,
    labelStyle,
  } = props;
  const translate = useRef(new Animated.Value(0)).current;
  const successOffset = width - buttonSize - padding * 2;
  const pan = PanResponder.create({
    onStartShouldSetPanResponder: () => !disabled,
    onMoveShouldSetPanResponder: () => !disabled,
    onPanResponderMove: (_, gestureState) => {
      const { dx } = gestureState;
      translate.setValue(dx);
    },
    onPanResponderRelease: () => {
      if (translate.__getValue() >= successOffset) {
        onSuccess();
      } else {
        onFail();
        Animated.timing(translate, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }).start();
      }
    },
  });
  const translateX = translate.interpolate({
    inputRange: [0, successOffset],
    outputRange: [0, successOffset],
    extrapolate: "clamp",
  });
  const opacity = translate.interpolate({
    inputRange: [0, successOffset],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });
  return (
    <View
      style={[
        styles.container,
        {
          width,
          borderRadius: containerBorderRadius,
          backgroundColor,
          padding,
        },
      ]}
    >
      {label ? (
        <Animated.Text style={[styles.label, labelStyle, { width, opacity }]}>
          {label}
        </Animated.Text>
      ) : null}
      <Animated.View
        {...pan.panHandlers}
        style={[
          styles.button,
          {
            width: buttonSize,
            height: buttonSize,
            backgroundColor: buttonColor,
            borderRadius: buttonBorderRadius,
            transform: [{ translateX }],
          },
        ]}
      >
        {icon}
      </Animated.View>
    </View>
  );
});
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.5,
    elevation: 6,
  },
  label: {
    position: "absolute",
    color: "#FAFAFA",
    fontSize: 16,
    textAlign: "center",
    alignSelf: "center",
  },
});
SliderButton.defaultProps = {
  onSuccess: () => {},
  onFail: () => {},
  width: 300,
  icon: (
    <Image
      source={DoubleChevron}
      style={{ width: 20, height: 20, tintColor: "#505050" }}
    />
  ),
  buttonSize: 45,
  containerBorderRadius: 10,
  buttonBorderRadius: 5,
  backgroundColor: "#505050",
  buttonColor: "#FAFAFA",
  padding: 8,
  disabled: false,
  label: "Slide to Action",
  labelStyle: {},
};
export default SliderButton;
