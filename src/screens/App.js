import { Component } from 'react';
import Turbolinks from 'react-native-turbolinks';

import env from '../env';

export default class App extends Component {
  componentDidMount() {
    Turbolinks.addEventListener('turbolinksVisit', this.handleVisit);
    Turbolinks.addEventListener('turbolinksError', this.handleError);
    Turbolinks.addEventListener('turbolinksMessage', this.showMessage);

    Turbolinks.setNavigationBarHidden(true);

    Turbolinks.visit({ url: env.BASE_URL });
  }

  componentWillUnmount() {
    Turbolinks.removeEventListener('turbolinksVisit', this.handleVisit);
    Turbolinks.removeEventListener('turbolinksError', this.handleError);
    Turbolinks.removeEventListener('turbolinksMessage', this.showMessage);
  }

  handleVisit = data => {
    Turbolinks.visit({
      url: data.url,
      action: data.action
    });
  };

  handleError = data => {
    const httpFailure = Turbolinks.Constants.ErrorCode.httpFailure;
    const networkFailure = Turbolinks.Constants.ErrorCode.networkFailure;
    switch (data.code) {
      case httpFailure: {
        switch (data.statusCode) {
          case 404: {
            const title = 'Oups';
            const message = "Cette page n'existe pas, ou elle a été déplacée.";
            return Turbolinks.replaceWith({
              component: 'ErrorScreen',
              passProps: { title, message }
            });
          }
          default: {
            const title = 'Unknown HTTP Error';
            const message = 'An unknown error occurred.';
            Turbolinks.replaceWith({
              component: 'ErrorScreen',
              passProps: { title, message }
            });
          }
        }
        break;
      }
      case networkFailure: {
        const title = 'Pas de connexion';
        const message = 'Pas de connexion réseau';
        Turbolinks.replaceWith({
          component: 'ErrorScreen',
          passProps: { title, message }
        });
        break;
      }
      default: {
        const title = 'Unknown Error';
        const message = 'An unknown error occurred.';
        Turbolinks.replaceWith({
          component: 'ErrorScreen',
          passProps: { title, message }
        });
      }
    }
  };

  showMessage = message => {
    alert(message);
  };

  render() {
    return null;
  }
}
