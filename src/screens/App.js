import { Component } from 'react';
import Turbolinks from 'react-native-turbolinks';

import env from '../env';

export default class App extends Component {
  componentDidMount() {
    Turbolinks.addEventListener('turbolinksVisit', this.handleVisit);
    Turbolinks.addEventListener(
      'turbolinksActionPress',
      this.handleActionPress
    );
    Turbolinks.addEventListener('turbolinksError', this.handleError);
    Turbolinks.addEventListener('turbolinksMessage', this.showMessage);

    Turbolinks.setMessageHandler('turbolinksDemo');

    Turbolinks.visit({ url: env.BASE_URL, actions: this.actions });
  }

  componentWillUnmount() {
    Turbolinks.removeEventListener('turbolinksVisit', this.handleVisit);
    Turbolinks.removeEventListener(
      'turbolinksActionPress',
      this.handleActionPress
    );
    Turbolinks.removeEventListener('turbolinksError', this.handleError);
    Turbolinks.removeEventListener('turbolinksMessage', this.showMessage);
  }

  actions = [
    { id: 0, title: 'Accueil' },
    { id: 1, title: 'Mes réservation' },
    { id: 2, title: 'Mes moyens de paiement' },
    { id: 3, title: 'Mes invitations' },
    { id: 4, title: 'Mes contacts utiles' },
    { id: 10, title: 'Mes espace hôte' },
    { id: 90, title: 'Erreur 404' }
  ];

  handleVisit = data => {
    Turbolinks.visit({
      url: data.url,
      action: data.action,
      actions: this.actions
    });
  };

  handleActionPress = actionId => {
    switch (actionId) {
      case 0:
        return Turbolinks.visit({ url: env.BASE_URL, actions: this.actions });
      case 1:
        return Turbolinks.visit({
          url: `${env.BASE_URL}/reservations`,
          actions: this.actions
        });
      case 2:
        return Turbolinks.visit({
          url: `${env.BASE_URL}/credit_cards`,
          actions: this.actions
        });
      case 3:
        return Turbolinks.visit({
          url: `${env.BASE_URL}/users/invitation/new`,
          actions: this.actions
        });
      case 4:
        return Turbolinks.visit({
          url: `${env.BASE_URL}/support`,
          actions: this.actions
        });
      case 10:
        return Turbolinks.visit({
          url: `${env.BASE_URL}/host/dashboard`,
          actions: this.actions
        });
      case 90:
        return Turbolinks.visit({
          url: `${env.BASE_URL}/not-found`,
          actions: this.actions
        });
      default:
        Turbolinks.visit({ url: env.BASE_URL, actions: this.actions });
    }
  };

  handleError = data => {
    const httpFailure = Turbolinks.Constants.ErrorCode.httpFailure;
    const networkFailure = Turbolinks.Constants.ErrorCode.networkFailure;
    switch (data.code) {
      case httpFailure: {
        switch (data.statusCode) {
          case 401:
            return Turbolinks.visit({
              component: 'AuthenticationScreen',
              modal: true
            });
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
        const title = 'Can’t Connect';
        const message =
          'TurbolinksDemo can’t connect to the server.\nDid you remember to start it?\nSee README.md for more instructions.';
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
