import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
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
        <Text style={styles.text} onPress={this.increment.bind(this)}>
          {this.state.count}
        </Text>
      </View>
    )
  }

  increment(e) {
    e.preventDefault();
    this.setState({
      count: this.state.count + 1
    })
  }


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  } as React.ViewStyle,

  text: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  } as React.TextStyle
});
