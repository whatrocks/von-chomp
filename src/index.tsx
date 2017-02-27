import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ListView,
  TouchableHighlight,
  Animated,
  Easing,
  Dimensions
} from 'react-native';

interface Props {
  
}

interface State {
  count?: number,
  increment?: number,
  animatedEye?: any,
  animatedPupil?: any
}

const { width, height } = Dimensions.get("window");
const eyeHeight = 100;
const pupilHeight = 50;
const easing = Easing.bounce;
const speed = 250;


export default class App extends Component<Props, State> {

  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      increment: 1,
      animatedEye: new Animated.Value(eyeHeight),
      animatedPupil: new Animated.Value(pupilHeight)
    };
  }

  render() {
    const animatedEye = { height: this.state.animatedEye }
    const animatedPupil = { height: this.state.animatedPupil  }
    return (
      <View style={styles.container}>
        <View style={styles.eyeRow}>
          <Animated.View style={[styles.eye, animatedEye]}>
            <Animated.View style={[styles.pupil, animatedPupil]} />
          </Animated.View>
          <Animated.View style={[styles.eye, animatedEye]}>
            <Animated.View style={[styles.pupil, animatedPupil]} />
          </Animated.View>
        </View>
        <Text style={styles.counter}>
          {this.state.count}
        </Text>
        <View style={styles.buttonRow}>
          <TouchableHighlight 
            style={styles.button}
            onPress={this.decrement.bind(this)}
          >
            <Text style={styles.buttonText}>-</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.button}
            onPress={this.increment.bind(this)}
          >
            <Text style={styles.buttonText}>+</Text>
          </TouchableHighlight>
        </View>
      </View>
    )
  }

  blink() {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(this.state.animatedEye, {
          toValue: eyeHeight / 5,
          duration: speed,
          easing: easing
        }),
        Animated.timing(this.state.animatedPupil, {
          toValue: pupilHeight / 5,
          duration: speed,
          easing: easing
        })
      ]),
      Animated.parallel([
        Animated.timing(this.state.animatedEye, {
          toValue: eyeHeight,
          duration: speed,
          easing: easing
        }),
        Animated.timing(this.state.animatedPupil, {
          toValue: pupilHeight,
          duration: speed,
          easing: easing
        })
      ])
    ]).start();
    
  }

  increment(e) {
    e.preventDefault();
    this.setState({
      count: this.state.count + this.state.increment,
    });
    this.blink();
  }

  decrement(e) {
    e.preventDefault();
    this.setState({
      count: this.state.count - this.state.increment
    });
  }


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: '#7f7fff',
  } as React.ViewStyle,

  eyeRow: {
    flexDirection: 'row',
    justifyContent: 'center'
  } as React.ViewStyle,

  eye: {
    backgroundColor: '#414c52',
    margin: 50,
    height: eyeHeight,
    width: eyeHeight / 2,
    borderRadius: eyeHeight / 2
  } as React.ViewStyle,

  pupil: {
    backgroundColor: '#efefef',
    marginLeft: 10,
    marginTop: 8,
    height: pupilHeight,
    width: pupilHeight / 2,
    borderRadius: 25
  } as React.ViewStyle,

  counter: {
    fontSize: 50,
    color: '#efefef',
    textAlign: 'center',
    margin: 10
  } as React.TextStyle,

  button: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    height: 50,
    backgroundColor: '#00d3a3',
    marginBottom: 30,
    borderRadius: 3
  } as React.ViewStyle,

  buttonText: {
    fontSize: 40,
    color: '#efefef',
    fontWeight: 'bold',
    textAlign: 'center'
  } as React.TextStyle,

  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  } as React.ViewStyle,

  box: {
    backgroundColor: '#333',
    width: 50,
    height: 50
  } as React.ViewStyle

});
