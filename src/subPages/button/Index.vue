<template>
  <page-wraper>
    <view class="page-button">
      <demo-block :title="$t('jiBenYongFa')">
        <bt-button>{{ $t('zhu-yao-an-niu') }}</bt-button>
        <bt-button type="success">{{ $t('cheng-gong-an-niu-0') }}</bt-button>
        <bt-button type="info">{{ $t('xin-xi-an-niu') }}</bt-button>
        <bt-button type="warning">{{ $t('jing-gao-an-niu-0') }}</bt-button>
        <bt-button type="error">{{ $t('wei-xian-an-niu') }}</bt-button>
      </demo-block>
      <demo-block :title="$t('jin-yong-an-niu')">
        <bt-button disabled>{{ $t('zhu-yao-an-niu') }}</bt-button>
        <bt-button type="success" disabled>{{ $t('cheng-gong-an-niu-0') }}</bt-button>
        <bt-button type="info" disabled>{{ $t('xin-xi-an-niu') }}</bt-button>
        <bt-button type="warning" disabled>{{ $t('jing-gao-an-niu-0') }}</bt-button>
        <bt-button type="error" disabled>{{ $t('wei-xian-an-niu') }}</bt-button>
      </demo-block>
      <demo-block :title="$t('you-ling-an-niu')">
        <bt-button plain>{{ $t('zhu-yao-an-niu') }}</bt-button>
        <bt-button type="success" plain>{{ $t('cheng-gong-an-niu-0') }}</bt-button>
        <bt-button type="info" plain>{{ $t('xin-xi-an-niu') }}</bt-button>
        <bt-button type="warning" plain>{{ $t('jing-gao-an-niu-0') }}</bt-button>
        <bt-button type="error" plain>{{ $t('wei-xian-an-niu') }}</bt-button>
      </demo-block>
      <demo-block :title="$t('xi-bian-kuang-you-ling-an-niu')">
        <bt-button plain hairline>{{ $t('zhu-yao-an-niu') }}</bt-button>
        <bt-button type="success" plain hairline>{{ $t('cheng-gong-an-niu-0') }}</bt-button>
        <bt-button type="info" plain hairline>{{ $t('xin-xi-an-niu') }}</bt-button>
        <bt-button type="warning" plain hairline>{{ $t('jing-gao-an-niu-0') }}</bt-button>
        <bt-button type="error" plain hairline>{{ $t('wei-xian-an-niu') }}</bt-button>
      </demo-block>
      <demo-block :title="$t('you-ling-an-niu-jin-yong-zhuang-tai')">
        <bt-button plain disabled>{{ $t('zhu-yao-an-niu') }}</bt-button>
        <bt-button type="success" plain disabled>{{ $t('cheng-gong-an-niu-0') }}</bt-button>
        <bt-button type="info" plain disabled>{{ $t('xin-xi-an-niu') }}</bt-button>
        <bt-button type="warning" plain disabled>{{ $t('jing-gao-an-niu-0') }}</bt-button>
        <bt-button type="error" plain disabled>{{ $t('wei-xian-an-niu') }}</bt-button>
      </demo-block>
      <demo-block :title="$t('an-niu-da-xiao')">
        <bt-button size="small">{{ $t('xiao-xing-an-niu') }}</bt-button>
        <bt-button size="medium">{{ $t('pu-tong-an-niu') }}</bt-button>
        <bt-button size="large">{{ $t('da-xing-an-niu') }}</bt-button>
      </demo-block>
      <demo-block :title="$t('jia-zai-zhong-0')">
        <bt-button loading>{{ $t('jia-zai-zhong-0') }}</bt-button>
        <bt-button type="success" loading>{{ $t('jia-zai-zhong-0') }}</bt-button>
        <bt-button type="warning" loading>{{ $t('jia-zai-zhong-0') }}</bt-button>
        <bt-button type="error" loading>{{ $t('jia-zai-zhong-0') }}</bt-button>
        <bt-button type="info" loading>{{ $t('jia-zai-zhong-0') }}</bt-button>
        <bt-button type="info" plain loading>{{ $t('jia-zai-zhong-0') }}</bt-button>
      </demo-block>
      <demo-block :title="$t('wen-zi-an-niu')">
        <bt-button type="text">{{ $t('an-niu-0') }}</bt-button>
        <bt-button type="text" disabled>{{ $t('an-niu-0') }}</bt-button>
      </demo-block>
      <demo-block :title="$t('tu-biao-an-niu')">
        <bt-button type="icon" icon="delete-thin"></bt-button>
        <bt-button type="icon" icon="delete-thin" disabled></bt-button>
      </demo-block>
      <demo-block :title="$t('dai-tu-biao-de-ji-ben-an-niu')">
        <bt-button icon="download">{{ $t('xia-zai') }}</bt-button>
        <bt-button icon="setting">{{ $t('she-zhi') }}</bt-button>
        <bt-button classPrefix="fish" icon="kehuishouwu">{{ $t('ke-hui-shou') }}</bt-button>
        <bt-button icon="download" size="small">{{ $t('xia-zai') }}</bt-button>
        <bt-button icon="setting" size="small">{{ $t('she-zhi') }}</bt-button>
        <bt-button icon="download" size="large">{{ $t('xia-zai') }}</bt-button>
        <bt-button icon="setting" size="large">{{ $t('she-zhi') }}</bt-button>
      </demo-block>
      <demo-block :title="$t('kuai-zhuang-an-niu-kuan-du-100')">
        <bt-button block size="large">{{ $t('zhu-yao-an-niu') }}</bt-button>
        <bt-button type="success" block size="large">{{ $t('cheng-gong-an-niu-0') }}</bt-button>
        <bt-button type="info" block size="large">{{ $t('xin-xi-an-niu') }}</bt-button>
        <bt-button type="warning" block size="large">{{ $t('jing-gao-an-niu-0') }}</bt-button>
        <bt-button type="error" block size="large">{{ $t('wei-xian-an-niu') }}</bt-button>
      </demo-block>
      <demo-block :title="$t('chang-yong-an-niu-kuai-zhuang-yuan-jiao')">
        <bt-button block size="large" disabled>{{ $t('zhu-yao-an-niu') }}</bt-button>
        <bt-button block size="large">{{ $t('zhu-yao-an-niu') }}</bt-button>
        <bt-button block size="large" loading>{{ $t('zhu-yao-an-niu') }}</bt-button>
        <bt-button type="info" block size="large" disabled>{{ $t('xin-xi-an-niu') }}</bt-button>
        <bt-button type="info" block size="large">{{ $t('xin-xi-an-niu') }}</bt-button>
      </demo-block>
      <demo-block :title="$t('chang-yong-an-niu-yuan-jiao-huo-yuan-jiao-you-ling')">
        <view>
          <bt-button disabled>{{ $t('zhu-cao-zuo') }}</bt-button>
          <bt-button size="small" disabled>{{ $t('zhu-cao-zuo') }}</bt-button>
        </view>
        <view>
          <bt-button>{{ $t('zhu-cao-zuo') }}</bt-button>
          <bt-button size="small">{{ $t('zhu-cao-zuo') }}</bt-button>
        </view>
        <view>
          <bt-button type="info" disabled>{{ $t('ci-cao-zuo-0') }}</bt-button>
          <bt-button type="info" size="small" disabled>{{ $t('ci-cao-zuo-0') }}</bt-button>
        </view>
        <view>
          <bt-button type="info">{{ $t('ci-cao-zuo-0') }}</bt-button>
          <bt-button type="info" size="small">{{ $t('ci-cao-zuo-0') }}</bt-button>
        </view>
        <view>
          <bt-button plain disabled>{{ $t('you-ling-an-niu') }}</bt-button>
          <bt-button size="small" plain disabled>{{ $t('you-ling-an-niu') }}</bt-button>
        </view>
        <view>
          <bt-button plain>{{ $t('you-ling-an-niu') }}</bt-button>
          <bt-button size="small" plain>{{ $t('you-ling-an-niu') }}</bt-button>
        </view>
        <view>
          <bt-button type="info" plain disabled>{{ $t('ci-cao-zuo-0') }}</bt-button>
          <bt-button type="info" size="small" plain disabled>{{ $t('ci-cao-zuo-0') }}</bt-button>
        </view>
        <view>
          <bt-button type="info" plain>{{ $t('ci-cao-zuo-0') }}</bt-button>
          <bt-button type="info" size="small" plain>{{ $t('ci-cao-zuo-0') }}</bt-button>
        </view>
      </demo-block>

      <demo-block :title="$t('zi-ding-yi-yang-shi-material-design-3-feng-ge-boxshadow')">
        <bt-button custom-class="custom-shadow">{{ $t('zhu-yao-an-niu') }}</bt-button>
        <bt-button type="success" custom-class="custom-shadow">{{ $t('cheng-gong-an-niu-0') }}</bt-button>
        <bt-button type="info" custom-class="custom-shadow">{{ $t('xin-xi-an-niu') }}</bt-button>
        <bt-button type="warning" custom-class="custom-shadow">{{ $t('jing-gao-an-niu-0') }}</bt-button>
        <bt-button type="error" custom-class="custom-shadow">{{ $t('wei-xian-an-niu') }}</bt-button>
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
