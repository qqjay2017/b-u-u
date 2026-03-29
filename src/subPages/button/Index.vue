<template>
  <page-wraper>
    <view class="page-button">
      <demo-block title="基本用法">
        <bt-button>主要按钮</bt-button>
        <bt-button type="success">成功按钮</bt-button>
        <bt-button type="info">信息按钮</bt-button>
        <bt-button type="warning">警告按钮</bt-button>
        <bt-button type="error">危险按钮</bt-button>
      </demo-block>
      <demo-block title="禁用按钮">
        <bt-button disabled>主要按钮</bt-button>
        <bt-button type="success" disabled>成功按钮</bt-button>
        <bt-button type="info" disabled>信息按钮</bt-button>
        <bt-button type="warning" disabled>警告按钮</bt-button>
        <bt-button type="error" disabled>危险按钮</bt-button>
      </demo-block>
      <demo-block title="幽灵按钮">
        <bt-button plain>主要按钮</bt-button>
        <bt-button type="success" plain>成功按钮</bt-button>
        <bt-button type="info" plain>信息按钮</bt-button>
        <bt-button type="warning" plain>警告按钮</bt-button>
        <bt-button type="error" plain>危险按钮</bt-button>
      </demo-block>
      <demo-block title="细边框幽灵按钮">
        <bt-button plain hairline>主要按钮</bt-button>
        <bt-button type="success" plain hairline>成功按钮</bt-button>
        <bt-button type="info" plain hairline>信息按钮</bt-button>
        <bt-button type="warning" plain hairline>警告按钮</bt-button>
        <bt-button type="error" plain hairline>危险按钮</bt-button>
      </demo-block>
      <demo-block title="幽灵按钮禁用状态">
        <bt-button plain disabled>主要按钮</bt-button>
        <bt-button type="success" plain disabled>成功按钮</bt-button>
        <bt-button type="info" plain disabled>信息按钮</bt-button>
        <bt-button type="warning" plain disabled>警告按钮</bt-button>
        <bt-button type="error" plain disabled>危险按钮</bt-button>
      </demo-block>
      <demo-block title="按钮大小">
        <bt-button size="small">小型按钮</bt-button>
        <bt-button size="medium">普通按钮</bt-button>
        <bt-button size="large">大型按钮</bt-button>
      </demo-block>
      <demo-block title="加载中">
        <bt-button loading>加载中</bt-button>
        <bt-button type="success" loading>加载中</bt-button>
        <bt-button type="warning" loading>加载中</bt-button>
        <bt-button type="error" loading>加载中</bt-button>
        <bt-button type="info" loading>加载中</bt-button>
        <bt-button type="info" plain loading>加载中</bt-button>
      </demo-block>
      <demo-block title="文字按钮">
        <bt-button type="text">按钮</bt-button>
        <bt-button type="text" disabled>按钮</bt-button>
      </demo-block>
      <demo-block title="图标按钮">
        <bt-button type="icon" icon="delete-thin"></bt-button>
        <bt-button type="icon" icon="delete-thin" disabled></bt-button>
      </demo-block>
      <demo-block title="带图标的基本按钮">
        <bt-button icon="download">下载</bt-button>
        <bt-button icon="setting">设置</bt-button>
        <bt-button classPrefix="fish" icon="kehuishouwu">可回收</bt-button>
        <bt-button icon="download" size="small">下载</bt-button>
        <bt-button icon="setting" size="small">设置</bt-button>
        <bt-button icon="download" size="large">下载</bt-button>
        <bt-button icon="setting" size="large">设置</bt-button>
      </demo-block>
      <demo-block title="块状按钮，宽度100%">
        <bt-button block size="large">主要按钮</bt-button>
        <bt-button type="success" block size="large">成功按钮</bt-button>
        <bt-button type="info" block size="large">信息按钮</bt-button>
        <bt-button type="warning" block size="large">警告按钮</bt-button>
        <bt-button type="error" block size="large">危险按钮</bt-button>
      </demo-block>
      <demo-block title="常用按钮：块状+圆角">
        <bt-button block size="large" disabled>主要按钮</bt-button>
        <bt-button block size="large">主要按钮</bt-button>
        <bt-button block size="large" loading>主要按钮</bt-button>
        <bt-button type="info" block size="large" disabled>信息按钮</bt-button>
        <bt-button type="info" block size="large">信息按钮</bt-button>
      </demo-block>
      <demo-block title="常用按钮：圆角或圆角+幽灵">
        <view>
          <bt-button disabled>主操作</bt-button>
          <bt-button size="small" disabled>主操作</bt-button>
        </view>
        <view>
          <bt-button>主操作</bt-button>
          <bt-button size="small">主操作</bt-button>
        </view>
        <view>
          <bt-button type="info" disabled>次操作</bt-button>
          <bt-button type="info" size="small" disabled>次操作</bt-button>
        </view>
        <view>
          <bt-button type="info">次操作</bt-button>
          <bt-button type="info" size="small">次操作</bt-button>
        </view>
        <view>
          <bt-button plain disabled>幽灵按钮</bt-button>
          <bt-button size="small" plain disabled>幽灵按钮</bt-button>
        </view>
        <view>
          <bt-button plain>幽灵按钮</bt-button>
          <bt-button size="small" plain>幽灵按钮</bt-button>
        </view>
        <view>
          <bt-button type="info" plain disabled>次操作</bt-button>
          <bt-button type="info" size="small" plain disabled>次操作</bt-button>
        </view>
        <view>
          <bt-button type="info" plain>次操作</bt-button>
          <bt-button type="info" size="small" plain>次操作</bt-button>
        </view>
      </demo-block>

      <demo-block title="自定义样式-Material Design 3 风格 box-shadow">
        <bt-button custom-class="custom-shadow">主要按钮</bt-button>
        <bt-button type="success" custom-class="custom-shadow">成功按钮</bt-button>
        <bt-button type="info" custom-class="custom-shadow">信息按钮</bt-button>
        <bt-button type="warning" custom-class="custom-shadow">警告按钮</bt-button>
        <bt-button type="error" custom-class="custom-shadow">危险按钮</bt-button>
      </demo-block>
    </view>
  </page-wraper>
</template>
<script lang="ts" setup>
function handleGetuserinfo(event: any) {
  // TODO
  console.log(event)
}
</script>
<style lang="scss" scoped>
.page-button {
  :deep(button) {
    margin: 0 10px 10px 0;
  }

  :deep() {
    .custom-shadow {
      box-shadow: 0 3px 1px -2px rgb(0 0 0 / 20%), 0 2px 2px 0 rgb(0 0 0 / 14%), 0 1px 5px 0 rgb(0 0 0 / 12%);
    }
  }
  .button-block {
    margin-right: 0;
  }
}
</style>
