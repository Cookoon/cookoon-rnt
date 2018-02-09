const releaseChannel = 'default';

export default {
  default: {
    BASE_URL: 'https://cookoon-staging.herokuapp.com'
  },
  staging: {
    BASE_URL: 'https://cookoon-staging.herokuapp.com'
  },
  production: {
    BASE_URL: 'https://app.cookoon.fr'
  }
}[releaseChannel];
