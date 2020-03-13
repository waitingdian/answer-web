import { Message } from 'element-ui';

export default function ({$axios, app}) {
  let userInfo = {};
  if (sessionStorage && sessionStorage.getItem) {
    try {
      userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
      if (!userInfo) {
        userInfo = {};
      } else {
        app.store.commit('user/set', userInfo);
      }
    } catch(e) {

    }

  }

  if (userInfo.token) {
    $axios.defaults.headers.common['Authorization'] = userInfo.token;
  } else {
    if (location.href.indexOf('login') === -1) {
      location.href = '/login';
    }
  }

  function handleError(data) {
    switch(data.errno) {
      case 4102:
      case 4103:
      case 4104:
      case 4105:
      case 4106:
        location.href = '/login';
        break;
      default:

    }
  }

  $axios.onRequest(config => {

  });

  $axios.onResponse(function (response) {
    if (response.config && response.config.url.indexOf('apis/oss/getSignature') === -1) {
      if (response.data.code === 200) {
        return response
      } else if (response.data.code === 401) {
        Message.error("登录失效,请重新登录")
        setTimeout(() => {
          app.router.replace('/login')
        }, 500)
      } else {
        Message({
          message: response.data.message,
          type: 'error'
        });
        return Promise.reject(response.data.message);
      }
    }
  });

  $axios.onError(error => {
    const code = parseInt(error.response && error.response.status)
    switch(code) {
      case 502:
        iview.Notice.error({
          title: '服务器错误',
          desc: '服务器正在重启中，请稍后重试。'
        });
        break;
    }

    if (code === 400) {
      redirect('/400')
    }
  })
}
