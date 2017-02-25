import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ListView,
  TouchableHighlight
} from 'react-native';

interface Props {

}

interface State {
  count: number
}

export default class App extends Component<Props, State> {

  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
  }

  render() {
    return (
      <View style={styles.container}>
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
  } as React.ViewStyle

});
