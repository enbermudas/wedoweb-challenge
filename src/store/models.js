import axios from 'axios';

export const alert = {
  state: {
    message: '',
    show: false
  },
  reducers: {
    display(state, payload) {
      return { ...state, message: payload, show: true };
    },
    hide(state, keep) {
      return { ...state, message: keep ? state.message : '', show: false };
    }
  }
};

export const auth = {
  state: {
    user: {}
  },
  reducers: {
    signin(state, payload) {
      return { ...state, user: payload };
    },
    signup(state, payload) {
      return { ...state, user: payload };
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

        dispatch.alert.display(message, 'success');

        setTimeout(() => dispatch.alert.hide(), 3000);
      } catch (error) {
        dispatch.alert.display(
          error.response.data.message || 'Oops! There was an error. Try again later.',
          'error'
        );

        setTimeout(() => dispatch.alert.hide(true), 3000);
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

        dispatch.alert.display(message, 'success');

        setTimeout(() => dispatch.alert.hide(), 3000);
      } catch (error) {
        dispatch.alert.display(
          error.response.data.message || 'Oops! There was an error. Try again later.',
          'error'
        );

        setTimeout(() => dispatch.alert.hide(true), 3000);
      }
    }
  })
};
