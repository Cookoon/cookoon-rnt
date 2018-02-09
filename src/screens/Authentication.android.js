import React, { Component } from 'react';
import { ToolbarAndroid, WebView, View } from 'react-native';
import Turbolinks from 'react-native-turbolinks';

import env from '../env';

export default class Authentication extends Component {
  state = { url: `${env.BASE_URL}/users/sign_in` };

  handleNavigationStateChange = navState => {
    if (this.state.url !== navState.url) {
      Turbolinks.dismiss();
    }
    this.setState({ url: navState.url });
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <ToolbarAndroid
          title="Sign in"
          style={{ height: 56, elevation: 4, backgroundColor: '#f5f5f5' }}
        />
        <WebView
          source={{ uri: this.state.url }}
          onNavigationStateChange={this.handleNavigationStateChange}
        />
      </View>
    );
  }
}
