// fb初始化，返回当前应用授权状态
function fbInit (appId, version) {
  return new Promise((resolve, reject) => {
    window.fbAsyncInit = function () {
      FB.init({
        appId: appId,
        cookie: true,
        xfbml: true,
        version: version
      });
      // FB.AppEvents.logPageView();
      FB.getLoginStatus(function (response) {
        // console.log(response);
        if (response.status === "connected") {
          resolve(response.authResponse);
        } else {
          reject();
        }
      }, true);
    };

    (function (d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement(s);
      js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    })(document, "script", "facebook-jssdk");
  });
}

// fb登录
function fbLogin () {
  return new Promise((resolve, reject) => {
    FB.login(
      function (response) {
        // console.log(response);
        if (response.status === "connected") {
          resolve(response.authResponse);
        } else {
          reject();
        }
      },
      {
        scope: "email",
        return_scopes: true
      }
    );
  });
}

// fb登出
function fbLogout () {
  FB.logout(function (response) {
    console.log(response);
  });
}

// fb分享
function fbShare (url) {
  return new Promise((resolve, reject) => {
    FB.ui(
      {
        method: "share",
        href: url
      },
      function (response) {
        if (typeof response === "undefined") {
          reject();
        }
        resolve(response);
      }
    );
  });
}

// google初始化
let googleUser = {};
let auth2;
function googleInit (client_id) {
  (function (d, s, id) {
    var js,
      fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {
      return;
    }
    js = d.createElement(s);
    js.id = id;
    js.src = "https://apis.google.com/js/api:client.js";
    fjs.parentNode.insertBefore(js, fjs);
    js.onload = function () {
      startApp(client_id)
    };
  })(document, "script", "google-jssdk");
}

function startApp (client_id) {
  gapi.load("auth2", function () {
    // Retrieve the singleton for the GoogleAuth library and set up the client.
    auth2 = gapi.auth2.init({
      client_id: client_id,
      cookiepolicy: "single_host_origin"
      // Request scopes in addition to 'profile' and 'email'
      //scope: 'additional_scope'
    });
    // attachSignin(document.getElementById(element));
  });
}

//google登录
function googleLogin (element) {
  return new Promise((resolve, reject) => {
    auth2.attachClickHandler(
      element,
      {},
      function (googleUser) {
        resolve(googleUser.getAuthResponse())
      },
      function (error) {
        reject(JSON.stringify(error, undefined, 2));
      }
    );
  })
}

export { fbInit, fbLogin, fbLogout, fbShare, googleInit, googleLogin };
