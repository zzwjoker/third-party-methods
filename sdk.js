// fb初始化，返回当前应用授权状态
function fbInit (appId, version) {
  return new Promise((resolve, reject) => {
    window.fbAsyncInit = function () {
      FB.init({
        appId: appId,
        cookie: true,
        xfbml: true,
        version: version
      })
      // FB.AppEvents.logPageView();
      FB.getLoginStatus(function (response) {
        // console.log(response);
        if (response.status === 'connected') {
          resolve(response.authResponse)
        } else {
          reject(response)
        }
      }, true)
    };

    (function (d, s, id) {
      var js
      var fjs = d.getElementsByTagName(s)[0]
      if (d.getElementById(id)) {
        return
      }
      js = d.createElement(s)
      js.id = id
      js.src = 'https://connect.facebook.net/en_US/sdk.js'
      fjs.parentNode.insertBefore(js, fjs)
    })(document, 'script', 'facebook-jssdk')
  })
}

// fb登录
function fbLogin () {
  return new Promise((resolve, reject) => {
    FB.login(
      function (response) {
        // console.log(response);
        if (response.status === 'connected') {
          resolve(response.authResponse)
        } else {
          reject(response)
        }
      },
      {
        scope: 'email',
        return_scopes: true
      }
    )
  })
}

// fb登出
function fbLogout () {
  return new Promise((resolve, reject) => {
    FB.getLoginStatus(function (response) {
      if (response.status === 'connected') {
        FB.logout(function (response) {
          resolve(response)
        })
      } else {
        reject(response)
      }
    })
  })
}

// google初始化
let googleUser = {}
let auth2
function googleInit (clientId) {
  (function (d, s, id) {
    var js
    var fjs = d.getElementsByTagName(s)[0]
    if (d.getElementById(id)) {
      return
    }
    js = d.createElement(s)
    js.id = id
    js.src = 'https://apis.google.com/js/api:client.js'
    fjs.parentNode.insertBefore(js, fjs)
    js.onload = function () {
      startApp(clientId)
    }
  })(document, 'script', 'google-jssdk')
}

function startApp (clientId) {
  gapi.load('auth2', function () {
    // Retrieve the singleton for the GoogleAuth library and set up the client.
    auth2 = gapi.auth2.init({
      client_id: clientId,
      cookiepolicy: 'single_host_origin'
      // Request scopes in addition to 'profile' and 'email'
      // scope: 'additional_scope'
    })
  })
}

// google登录
function googleLogin () {
  return new Promise((resolve, reject) => {
    auth2.signIn().then(res => {
      resolve(res.getAuthResponse())
    }).catch(err => {
      reject(JSON.stringify(err, undefined, 2))
    })
  })
}

// fb分享
function fbShare (url) {
  return new Promise((resolve, reject) => {
    FB.ui(
      {
        method: 'share',
        href: url
      },
      function (response) {
        console.log(response)
        if (!response || response.error_message) {
          reject(response)
        }
        resolve(response)
      }
    )
  })
}

// fb分享好友
function fbShareFriend (url) {
  console.log(url)
  return new Promise((resolve, reject) => {
    FB.ui(
      {
        method: 'send',
        link: url,
        display: 'popup'
      },
      function (response) {
        console.log(response)
        if (!response || response.error_message) {
          reject(response)
        }
        resolve(response)
      }
    )
  })
}

// naver登录
function naverInit (clientId, callbackUrl) {
  return new Promise((resolve, reject) => {
    (function (d, s, id) {
      var js
      var fjs = d.getElementsByTagName(s)[0]
      if (d.getElementById(id)) {
        return
      }
      js = d.createElement(s)
      js.id = id
      js.src = 'https://static.nid.naver.com/js/naveridlogin_js_sdk_2.0.0.js'
      fjs.parentNode.insertBefore(js, fjs)
      js.onload = function () {
        var naverLogin = new naver.LoginWithNaverId(
          {
            clientId: clientId,
            callbackUrl: callbackUrl,
            isPopup: false,
            callbackHandle: true,
            loginButton: { color: "green", type: 3, height: 60 }
          }
        );
        naverLogin.init();
        naverLogin.getLoginStatus(function (status) {
          if (status) {
            // 已登录
            resolve(naverLogin.accessToken.accessToken)
          } else {
            // 未登录
            reject('Not Logged In')
          }
        })
      }
    })(document, 'script', 'naver-jssdk')
  })
}

export { fbInit, fbLogin, fbLogout, fbShare, googleInit, googleLogin, fbShareFriend, naverInit }
