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
  pan?: any
}

const { width, height } = Dimensions.get("window");
const vonCountSize = 100;


export default class App extends Component<Props, State> {

  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      increment: 1,
      pan: new Animated.ValueXY()
    };
  }

  render() {
    const animatedStyle = { transform: this.state.pan.getTranslateTransform() };
    return (
      <View style={styles.container}>
        <View style={styles.row}>
          <Animated.View style={[styles.vonCount, animatedStyle]}></Animated.View>
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

  increment(e) {
    e.preventDefault();
    this.setState({
      count: this.state.count + this.state.increment,
    });
    Animated.spring(this.state.pan, {
        tension: 2,
        friction: 3, 
        toValue: {x: this.state.count + 50, y: 0}
    }).start();
  }

  decrement(e) {
    e.preventDefault();
    this.setState({
      count: this.state.count - this.state.increment
    });
    Animated.spring(this.state.pan, {
        tension: 2,
        friction: 3, 
        toValue: {x: this.state.count - 50, y: 0}
    }).start();
  }


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: '#EFEFEF'
  } as React.ViewStyle,

  row: {
    flexDirection: 'row',
    justifyContent: 'center'
  } as React.ViewStyle,

  counter: {
    fontSize: 50,
    textAlign: 'center',
    margin: 10
  } as React.TextStyle,

  vonCount: {
    height: vonCountSize,
    width: vonCountSize,
    borderRadius: vonCountSize / 2,
    backgroundColor: '#7f7fff',
  } as React.ViewStyle,

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
