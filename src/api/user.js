/**
 * 用户相关的请求模块
 */
// 导入request.js中的request
import request from '@/utils/request'
import store from '@/store'

/**
 * 用户登录
 */
export const login = data => { // data是形参，调用login时，需要将这次请求的数据传递过来
  return request({
    method: 'POST',
    url: '/v1_0/authorizations',
    data: data
  })
}

// 发送验证码
// 注意 每个手机号每分钟一次  但是这个接口有问题 还欠费了

export const sendSms = mobile => {
  return request({
    method: 'GET',
    url: `/v1_0/sms/codes/${mobile}`
  })
}
/**
 * 获取用户自己的信息
 */
export const getUserInfo = () => {
  return request({
    method: 'GET',
    url: '/v1_0/user',
    // 发送请求头数据
    headers: {
      // 注意：该接口需要授权才能访问
      //       token的数据格式：Bearer token数据，注意 Bearer 后面有个空格
      Authorization: `Bearer ${store.state.user.token}`
    }
  })
}
/*
获取用户信息
*/
export const getUserChannels = () => {
  return request({
    method: 'GET',
    url: '/v1_0/user/channels'
  })
}
