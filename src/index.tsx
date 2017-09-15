import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  ListView,
  TouchableHighlight,
  Animated,
  Easing,
  Dimensions,
  Linking
} from "react-native";
import Swiper from "react-native-swiper";

interface Props {}

interface State {
  count?: number;
  increment?: number;
  animatedEye?: any;
  animatedPupil?: any;
  animatedMouth?: any;
  animatedTongue?: any;
}

const { width, height } = Dimensions.get("window");

const eyeHeight = 100;
const pupilHeight = 50;
const mouthHeight = height * 2 / 5;
const tongueHeight = 50;

const speed = 500;

export default class App extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      increment: 1,
      animatedEye: new Animated.Value(eyeHeight),
      animatedPupil: new Animated.Value(pupilHeight),
      animatedMouth: new Animated.Value(mouthHeight),
      animatedTongue: new Animated.Value(tongueHeight)
    };
  }

  render() {
    const animatedEye = { height: this.state.animatedEye };
    const animatedPupil = {
      opacity: this.state.animatedPupil,
      height: this.state.animatedPupil
    };
    const animatedMouth = { height: this.state.animatedMouth };
    const animatedTongue = { height: this.state.animatedTongue };
    return (
      <Swiper
        showsButtons={false}
        showsPagination={false}
        index={1}
        loop={false}
      >
        <View style={styles.credits}>
          <Text style={[styles.creditText, styles.creditTextHighlightGreen]}>
            Von Chomp
          </Text>
          <Text style={styles.creditText}>is a counting app</Text>
          <View style={styles.creditTextRow}>
            <Text style={styles.creditText}>by</Text>
            <Text style={[styles.creditText, styles.creditTextHighlightRed]}>
              @whatrocks
            </Text>
          </View>
          <Text style={styles.creditText}>You can always</Text>
          <View style={styles.creditTextRow}>
            <Text style={styles.creditText}>tap</Text>
            <TouchableHighlight onPress={this.reset.bind(this)}>
              <Text
                style={[styles.creditText, styles.creditTextHighlightYellow]}
              >
                reset
              </Text>
            </TouchableHighlight>
            <Text style={styles.creditText}>or</Text>
          </View>
          <Text style={styles.creditText}>change the scale</Text>
          <View style={styles.creditTextRow}>
            <Text style={styles.creditText}>to</Text>
            <TouchableHighlight onPress={this.scale.bind(this)}>
              <Text
                style={[styles.creditText, styles.creditTextHighlightPurple]}
              >
                {this.state.increment}
              </Text>
            </TouchableHighlight>
            <Text style={styles.creditText}>
              {this.state.increment === 1 ? `thing` : `things`}
            </Text>
          </View>
        </View>
        <View style={styles.container}>
          <View style={styles.face}>
            <View style={styles.eyeRow}>
              <Animated.View style={[styles.eye, animatedEye]}>
                <Animated.View style={[styles.pupil, animatedPupil]} />
              </Animated.View>
              <Animated.View style={[styles.eye, animatedEye]}>
                <Animated.View style={[styles.pupil, animatedPupil]} />
              </Animated.View>
            </View>
            <View style={styles.mouthRow}>
              <Animated.View style={[styles.mouth, animatedMouth]}>
                <View style={styles.fangRow}>
                  <View style={styles.fang} />
                  <View style={styles.fang} />
                </View>
                <View style={styles.tongueRow}>
                  <Animated.View style={[styles.tongue, animatedTongue]} />
                </View>
              </Animated.View>
            </View>
          </View>
          <View>
            <Text style={styles.counter}>{this.state.count}</Text>
            <View style={styles.buttonRow}>
              <TouchableHighlight
                style={styles.buttonDown}
                onPress={this.decrement.bind(this)}
                underlayColor={"#dcc130"}
              >
                <Text style={styles.buttonText}>-</Text>
              </TouchableHighlight>
              <TouchableHighlight
                style={styles.buttonUp}
                onPress={this.increment.bind(this)}
                underlayColor={"#00bd92"}
              >
                <Text style={styles.buttonText}>+</Text>
              </TouchableHighlight>
            </View>
          </View>
        </View>
      </Swiper>
    );
  }

  blink() {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(this.state.animatedPupil, {
          toValue: 0,
          duration: speed,
          easing: Easing.cubic
        }),
        Animated.timing(this.state.animatedEye, {
          toValue: 20,
          duration: speed,
          easing: Easing.cubic
        })
      ]),
      Animated.parallel([
        Animated.timing(this.state.animatedEye, {
          toValue: eyeHeight,
          duration: speed,
          easing: Easing.bounce
        }),
        Animated.timing(this.state.animatedPupil, {
          toValue: pupilHeight,
          duration: speed,
          easing: Easing.bounce
        })
      ])
    ]).start();
  }

  chomp() {
    Animated.sequence([
      Animated.timing(this.state.animatedTongue, {
        toValue: 0,
        duration: speed / 10,
        easing: Easing.linear
      }),
      Animated.timing(this.state.animatedMouth, {
        toValue: 0,
        duration: speed,
        easing: Easing.cubic
      }),
      Animated.timing(this.state.animatedMouth, {
        toValue: mouthHeight,
        duration: speed,
        easing: Easing.bounce
      }),
      Animated.timing(this.state.animatedTongue, {
        toValue: tongueHeight,
        duration: speed,
        easing: Easing.bounce
      })
    ]).start();
  }

  reset(e) {
    e.preventDefault();
    this.setState({
      count: 0,
      increment: 1
    });
  }

  scale(e) {
    e.preventDefault();
    this.setState({
      increment: this.state.increment + 1
    });
  }

  increment(e) {
    e.preventDefault();
    this.setState({
      count: this.state.count + this.state.increment
    });
    this.chomp();
  }

  decrement(e) {
    e.preventDefault();
    this.setState({
      count: this.state.count - this.state.increment
    });
    this.blink();
  }
}

const styles = StyleSheet.create({
  credits: {
    flex: 1,
    justifyContent: "space-around",
    backgroundColor: "#4c4c99",
    flexDirection: "column",
    alignItems: "flex-start"
  } as React.ViewStyle,

  creditText: {
    fontSize: 30,
    fontFamily: "RobotoMono-Bold",
    padding: 10,
    color: "#efefef",
    fontWeight: "bold",
    textAlign: "center"
  } as React.TextStyle,

  creditTextRow: {
    flexDirection: "row",
    justifyContent: "flex-start"
  } as React.ViewStyle,

  creditTextHighlightGreen: {
    backgroundColor: "#00d3a3"
  } as React.TextStyle,

  creditTextHighlightRed: {
    backgroundColor: "#ff4646"
  } as React.TextStyle,

  creditTextHighlightYellow: {
    backgroundColor: "#ecc90c"
  } as React.TextStyle,

  creditTextHighlightPurple: {
    backgroundColor: "#7f7fff"
  } as React.TextStyle,

  container: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: "#7f7fff"
  } as React.ViewStyle,

  face: {
    flexDirection: "column",
    justifyContent: "center"
  } as React.ViewStyle,

  eyeRow: {
    flexDirection: "row",
    justifyContent: "center"
  } as React.ViewStyle,

  eye: {
    backgroundColor: "#414c52",
    margin: 50,
    height: eyeHeight,
    width: eyeHeight / 2,
    borderRadius: eyeHeight / 2
  } as React.ViewStyle,

  pupil: {
    backgroundColor: "#efefef",
    marginLeft: 10,
    marginTop: 8,
    height: pupilHeight,
    width: pupilHeight / 2,
    borderRadius: 25
  } as React.ViewStyle,

  mouth: {
    flexDirection: "column",
    justifyContent: "space-between",
    height: mouthHeight,
    width: width * 2 / 3,
    backgroundColor: "#414c52",
    borderBottomLeftRadius: mouthHeight / 3,
    borderTopLeftRadius: mouthHeight / 3,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 1
  } as React.ViewStyle,

  fangRow: {
    flexDirection: "row",
    justifyContent: "center"
  } as React.ViewStyle,

  fang: {
    height: 0,
    width: 0,
    marginLeft: 20,
    borderLeftWidth: 30,
    borderLeftColor: "transparent",
    borderRightWidth: 30,
    borderRightColor: "transparent",
    borderTopWidth: 60,
    borderTopColor: "#7f7fff"
  } as React.ViewStyle,

  tongue: {
    height: tongueHeight,
    width: 75,
    borderTopLeftRadius: 100,
    borderTopRightRadius: 100,
    backgroundColor: "#ff4646",
    marginLeft: 40
  } as React.ViewStyle,

  tongueRow: {
    flexDirection: "row",
    justifyContent: "center"
  } as React.ViewStyle,

  mouthRow: {
    flexDirection: "row",
    justifyContent: "flex-end"
  } as React.ViewStyle,

  counter: {
    fontFamily: "RobotoMono-Regular",
    fontSize: 60,
    color: "#efefef",
    textAlign: "center",
    margin: 10
  } as React.TextStyle,

  buttonDown: {
    justifyContent: "center",
    alignItems: "center",
    width: width / 3,
    height: 80,
    backgroundColor: "#ecc90c",
    marginBottom: 30,
    borderRadius: 5
  } as React.ViewStyle,

  buttonUp: {
    justifyContent: "center",
    alignItems: "center",
    width: width / 3,
    height: 80,
    backgroundColor: "#00d3a3",
    marginBottom: 30,
    borderRadius: 5
  } as React.ViewStyle,

  buttonLarge: {
    justifyContent: "center",
    alignItems: "center",
    width: width / 2,
    backgroundColor: "#f5d736",
    borderColor: "#f5d736",
    borderWidth: 5
  } as React.ViewStyle,

  buttonTextLarge: {
    fontSize: 30,
    fontFamily: "RobotoMono-Bold",
    color: "#efefef",
    textAlign: "center",
    fontWeight: "bold"
  } as React.TextStyle,

  buttonText: {
    fontSize: 65,
    fontFamily: "RobotoMono-Bold",
    color: "#efefef",
    fontWeight: "bold",
    textAlign: "center"
  } as React.TextStyle,

  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-around"
  } as React.ViewStyle
});
