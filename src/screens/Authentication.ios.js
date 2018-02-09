import React, { Component } from 'react';
import { NavigatorIOS, WebView } from 'react-native';
import Turbolinks from 'react-native-turbolinks';

import env from '../env';

export default class Authentication extends Component {
  render() {
    return (
      <NavigatorIOS
        initialRoute={{ component: MyScene, title: 'Sign in' }}
        style={{ flex: 1 }}
      />
    );
  }
}

class MyScene extends Component {
  state = { url: `${env.BASE_URL}/users/sign_in` };

  handleNavigationStateChange = navState => {
    if (this.state.url !== navState.url) {
      Turbolinks.dismiss();
    }
    this.setState({ url: navState.url });
  };

  render() {
    return (
      <WebView
        source={{ uri: this.state.url }}
        onNavigationStateChange={this.handleNavigationStateChange}
      />
    );
  }
}
