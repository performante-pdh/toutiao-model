<template>
  <div class="login-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar" title="登录" />
    <!-- /导航栏 -->

    <!-- 登录表单 -->
    <van-form ref="loginForm" @submit="onSubmit">
      <van-field
        v-model="user.mobile"
        name="mobile"
        placeholder="请输入手机号"
        :rules="userFormRules.mobile"
        type="number"
        maxlength="11"
      >
        <i slot="left-icon" class="iconfont iconshouji"></i> <!-- 通过插槽处理自定义图标 -->
      </van-field>
    <van-field
        v-model="user.code"
        name="code"
        placeholder="请输入验证码"
        :rules="userFormRules.code"
        type="number"
        maxlength="6"
      >
      <!-- 字体图标 -->
        <i slot="left-icon" class="iconfont iconyanzhengma"></i><!-- 通过插槽处理自定义图标 -->
        <template #button><!-- 新版本插槽的写法
        #button相当于solt="button" -->

        <!-- 设置倒计时时长 -->
        <van-count-down
         v-if="isCountDownShow"
         :time="1000*10"
         format="ss s"
         @finish="isCountDownShow = false"
        />
          <van-button
           v-else
           class="send-sms-btn"
           native-type="button"
           round
           size="small"
           @click="onSendSms"
           type="default">
           发送验证码
          </van-button>
        </template>
      </van-field>
      <div class="login-btn-wrap">
        <van-button class="login-btn" block type="info" native-type="submit">
          登录
        </van-button>
      </div>
    </van-form>
    <!-- /登录表单 -->
  </div>
</template>

<script>
import { login, sendSms } from '@/api/user'
export default {
  // 组件名称
  name: 'LoginIndex',
  // 组件参数 接收来自父组件的数据
  props: {},
  // 局部注册的组件
  components: {},
  // 组件状态值
  data () {
    return {
      user: {
        mobile: '', // 手机号
        code: '' // 验证码
      },
      userFormRules: {
        mobile: [{
          required: true,
          message: '手机号不能为空'
        }, {
          pattern: /^1[3|5|7|8]\d{9}$/,
          message: '手机号格式错误'
        }],
        code: [{
          required: true,
          message: '验证码不能为空'
        }, {
          pattern: /^\d{6}$/,
          message: '验证码格式错误'
        }]
      },
      // 验证码倒计时
      isCountDownShow: false // 是否展示倒计时
    }
  },
  // 计算属性
  computed: {},
  // 侦听器
  watch: {},
  // 组件方法
  methods: {
    async onSubmit () {
      //   1获取表单数据
      const user = this.user// eslint-disable-line no-unused-vars
      // 2表单验证

      // loading 转圈圈提示
      this.$toast.loading({
        message: '登录中...',
        forbidClick: true, // 是否禁止背景点击
        duration: 0 // 持续时间  默认是2s,为0时持续展示
      })
      // 3提交表单请求登录
      try {
        const { data } = await login(this.user)
        this.$store.commit('setUser', data.data)
        this.$toast.success('登录成功')
      } catch (err) {
        if (err.response.status === 400) {
          this.$toast.fail('手机号或验证码错误')
        } else {
          this.$toast.fail('登录失败,请稍后再试')
        }
      }
      // 4 根据请求响应结果处理后续操作
    },

    // 验证码
    async onSendSms () {
      console.log('onSendSms')
      // 1. 校验手机号
      try {
        // 这里为啥添加await，是因为validata返回一个Promise
        // 参数是van-field的name
        await this.$refs.loginForm.validate('mobile') // 调用validate手动校验
      } catch (err) {
        return console.log('验证失败', err)// 这个写法其实就是在执行完log，然后结束代码执行，后续代码不执行
      }

      // 2. 验证通过，显示倒计时
      this.isCountDownShow = true

      // 3. 请求发送验证码
      try {
        await sendSms(this.user.mobile)
        this.$toast('发送成功')
      } catch (err) {
        // 发送失败,关闭倒计时
        if (err.response.status === 429) {
          this.$toast('发送太频繁了')
        } else {
          this.$toast('发送失败,请稍后重试')
        }
      }
    }
  },
  // 以下是生命周期钩子   注：没用到的钩子请自行删除
  /**
  * 组件实例创建完成，属性已绑定，但DOM还未生成，$ el属性还不存在
  */
  created () {
  },
  /**
  * el 被新创建的 vm.$ el 替换，并挂载到实例上去之后调用该钩子。
  * 如果 root 实例挂载了一个文档内元素，当 mounted 被调用时 vm.$ el 也在文档内。
  */
  mounted () {
  }
}
</script>

<style scoped lang="less">
.login-container {
  .toutiao {
    font-size: 37px;
  }
  .send-sms-btn {
    width: 160px;
    height: 46px;
    line-height: 23px;
    background-color: #ededed;
    font-size: 22px;
    color: #666;
  }
  .login-btn-wrap {
    padding: 53px 33px;
    .login-btn {
      background-color: #6db4fb;
      border: none;
    }
  }
}
</style>
