/**
 * 用户相关的请求模块
 */
// 导入request.js中的request
import request from '@/utils/request'

/**
 * 用户登录
 */
export const login = data => { // data是形参，调用login时，需要将这次请求的数据传递过来
  return request({
    method: 'POST',
    url: '/app/v1_0/authorizations',
    data: data
  })
}

// 发送验证码
// 注意 每个手机号每分钟一次  但是这个接口有问题 还欠费了

export const sendSms = mobile => {
  return request({
    method: 'GET',
    url: `/app/v1_0/sms/codes/${mobile}`
  })
}
