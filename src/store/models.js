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
