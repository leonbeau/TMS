import { stringify } from 'querystring';
import { history } from 'umi';
import { AccountLogin } from '@/services/login';
import { setAuthority } from '@/utils/authority';
import { getPageQuery } from '@/utils/utils';
import { message } from 'antd';
const Model = {
  namespace: 'login',
  state: {
    status: undefined,
  },
  effects: {
    *login({ payload }, { call, put }) {
      const response = yield call(AccountLogin, payload);
      yield put({
        type: 'changeLoginStatus',
        payload: response,
      }); // Login successfully
      if (response.code === 1) {
        message.error(response.message)
      }
      if (response.code === 0) {
        const urlParams = new URL(window.location.href);
        const params = getPageQuery();
        sessionStorage.setItem("isLogin", "true");
        message.success('🎉 🎉 🎉  登录成功！');
        let { redirect } = params;
        if (redirect) {
          const redirectUrlParams = new URL(redirect);
          console.log('redirectUrlParams.origin urlParams.origin', redirectUrlParams.origin, urlParams.origin);
          if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(urlParams.origin.length);

            if (window.routerBase !== '/') {
              redirect = redirect.replace(window.routerBase, '/');
            }

            if (redirect.match(/^\/.*#/)) {
              redirect = redirect.substr(redirect.indexOf('#') + 1);
            }
          } else {
            window.location.href = '/';
            return;
          }
        }

        history.replace(redirect || '/');
      }
    },

    logout() {
      const { redirect } = getPageQuery(); // Note: There may be security issues, please note

      if (window.location.pathname !== '/user/login' && !redirect) {
        history.replace({
          pathname: '/user/login',
          search: stringify({
            redirect: window.location.href,
          }),
        });
      }
    },
  },
  reducers: {
    changeLoginStatus(state, { payload }) {
      setAuthority(payload.data.identity);
      return { ...state, status: payload.state, userData: payload.data };
    },
  },
};
export default Model;
