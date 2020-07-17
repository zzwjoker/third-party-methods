# google/facebook jssdk常用方法

## fb js-sdk初始化(返回当前授权状态)

```javascript
import { fbInit } from '.../sdk.js'

// fbInit('your-app-id', 'api-version')

fbInit('1188221111113909', 'v3.2')
  .then(res => {
    // 已授权登录
    // openid: res.userID,
    // token: res.accessToken
  })
  .catch(error => {
    // 未授权登录或没登录facebook
  });
```

## fb登录

```javascript
import { fbLogin } from '.../sdk.js'

fbLogin()
  .then(res => {
    // 登录成功
    // openid: res.userID,
    // token: res.accessToken
  })
  .catch(error => {
    // 登录失败
  });
```

## fb登出

```javascript
import { fbLogout } from '.../sdk.js'

fbLogout()
  .then(res => {
    // 退出成功
  })
  .catch(error => {
    // 退出失败，原因可能是未授权当前应用或未登录facebook
  });
```

## fb分享

```html
<meta property="og:title" content="少年梦江湖，事先预约，今日开启！">
<meta property="og:description" content="◆集结江湖◆ 5月初旬，双端开启。">
<meta property="og:image" content="https://qxjh.gamobi.com/order/share.png">
```
```javascript
import { fbShare } from '.../sdk.js'

// fbShare('share-url')

fbShare('https://qxjh.gamobi.com/order/')
  .then(res => {
    // 分享成功
  })
  .catch(error => {
    // 分享失败
  });
```

## fb分享好友(移动端不支持)

```javascript
import { fbShareFriend } from '.../sdk.js'

// fbShareFriend('share-url')

fbShareFriend('https://qxjh.gamobi.com/order/')
  .then(res => {
    // 分享成功
  })
  .catch(error => {
    // 分享失败
  });
```

## google初始化
```javascript
import { googleInit } from '.../sdk.js'

// googleInit('your-clientId')

googleInit('1188221111113909')
```

## google登录
```javascript
import { googleLogin } from '.../sdk.js'

googleLogin()
  .then(res => {
    // 登录成功
    // token: res.id_token
  })
  .catch(error => {
    // 登录失败
  })
```

## naver登录
```html
<div id="naverIdLogin"></div>
```
```javascript
import { naverInit } from '.../sdk.js'

// naverInit('your-clientId', 'callback-url')
// callback-url: 后台配置

naverInit('1188221111113909', 'https://cardduel.gamobi.com/sdhd/sdk')
  .then(res => {
    // 登录成功
    // token: res
  })
  .catch(error => {
    // 登录失败
  })
```



