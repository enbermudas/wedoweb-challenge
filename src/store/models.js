import axios from 'axios';

export const alert = {
  state: {
    message: '',
    type: ''
  },
  reducers: {
    display(state, { message, type }) {
      return { ...state, message, type };
    }
  }
};

export const auth = {
  state: {
    user: {},
    authenticated: false
  },
  reducers: {
    signin(state, payload) {
      return { ...state, user: payload, authenticated: true };
    },
    signup(state, payload) {
      return { ...state, user: payload, authenticated: true };
    },
    logout() {
      return { user: {}, authenticated: false };
    }
  },
  effects: (dispatch) => ({
    async signinAPI(payload) {
      const { email, password } = payload;

      try {
        const {
          data: { data, message }
        } = await axios.post('/api/v1/auth/signin', {
          email,
          password
        });

        dispatch.auth.signin(data);

        dispatch.alert.display({ message, type: 'success' });
      } catch (error) {
        dispatch.alert.display({
          message:
            error.response.data.message || 'Oops! There was an error. Try again later.',
          type: 'error'
        });
      }
    },
    async signupAPI(payload) {
      const { username, email, password } = payload;

      try {
        const {
          data: { data, message }
        } = await axios.post('/api/v1/auth/signup', {
          username,
          email,
          password
        });

        dispatch.auth.signup(data);

        dispatch.alert.display({ message, type: 'success' });
      } catch (error) {
        dispatch.alert.display({
          message:
            error.response.data.message || 'Oops! There was an error. Try again later.',
          type: 'error'
        });
      }
    }
  })
};

export const website = {
  state: {
    sites: []
  },
  reducers: {
    fetch(state, sites) {
      return { ...state, sites };
    }
  },
  effects: (dispatch) => ({
    async createAPI(payload) {
      const { url } = payload;

      try {
        const {
          data: { message }
        } = await axios.post('/api/v1/website', {
          url
        });

        dispatch.website.fetchAPI();

        dispatch.alert.display({ message, type: 'success' });
      } catch (error) {
        dispatch.alert.display({
          message:
            error.response.data.message || 'Oops! There was an error. Try again later.',
          type: 'error'
        });
      }
    },
    async fetchAPI() {
      try {
        const {
          data: { data }
        } = await axios.get('/api/v1/website');

        dispatch.website.fetch(data);
      } catch (error) {
        dispatch.alert.display({
          message:
            error.response.data.message || 'Oops! There was an error. Try again later.',
          type: 'error'
        });
      }
    }
  })
};
