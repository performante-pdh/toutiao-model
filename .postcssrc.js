/**
 * PostCSS 配置文件
 */

module.exports = {
  // 配置要使用的 PostCSS 插件
  plugins: {
    // 配置使用 autoprefixer 插件
    // 作用：生成浏览器 CSS 样式规则前缀

    // VueCli内部已经配置一遍了，所以注释掉
    // 'autoprefixer': { // autoprefixer 插件的配置
    //     // 配置要兼容到的环境信息
    //     browsers: ['Android >= 4.0', 'iOS >= 8']
    // },
    // 配置使用 postcss-pxtorem 插件
    // 作用：把 px 转为 rem
    'postcss-pxtorem': {
      // 把一行设置为10份，每一份就是宽度的十分之一
      // rootValue的值应为设计稿宽度的十分之一
      // 此项目的psd为750px，所以就是75
      // 但是vant建议设置为37.5，所以使用设计稿的单位都要除以2
      // 所以vant的设置成37.5，自己的样式设计成75
      // `rootValue` 支持两种参数类型：
      // - 数字：固定值
      // - 函数：动态计算返回
      // 根据路径来判断是vnt还是自己的来匹配用37.5还是75
      rootValue ({ file }) {
        return file.indexOf('vant') !== -1 ? 37.5 : 75
      },
      // 配置要转换的 CSS 属性
      // * 表示所有
      propList: ['*']
    }
  }
}
