import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ListView,
  TouchableHighlight,
  Animated,
  Easing
} from 'react-native';

interface Props {
  
}

interface State {
  count?: number,
  animatedValue?: any
}

export default class App extends Component<Props, State> {

  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      animatedValue: new Animated.Value(100)
    };
  }

  componentDidMount() {
    Animated.timing(this.state.animatedValue, {
      toValue: 200,
      duration: 1000,
      easing: Easing.bounce
    }).start();
  }

  render() {
    const animatedStyle = { height: this.state.animatedValue };
    return (
      <View style={styles.container}>
        <Animated.View style={[styles.box, animatedStyle]}/>
        <Text style={styles.counter}>
          {this.state.count}
        </Text>
        <View style={styles.row}>
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
      count: this.state.count + 1
    })
  }

  decrement(e) {
    e.preventDefault();
    this.setState({
      count: this.state.count - 1
    })
  }


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#F5FCFF'
  } as React.ViewStyle,

  counter: {
    fontSize: 50,
    textAlign: 'center',
    margin: 10
  } as React.TextStyle,

  button: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 50,
    backgroundColor: '#7f7fff'
  } as React.ViewStyle,

  buttonText: {
    fontSize: 30,
    textAlign: 'center'
  } as React.TextStyle,

  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  } as React.ViewStyle,

  box: {
    backgroundColor: '#333',
    width: 100,
    height: 100
  } as React.ViewStyle

});
