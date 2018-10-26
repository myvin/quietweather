<view class='container'>
  <view class="wrapper">
    <view class='search'>
      <view class="inner">
        <image class='icon' src='/img/search_grey.png'></image>
        <input value='{{inputText}}' placeholder='请输入城市名，快速查询天气信息' maxlength='20' confirm-type='搜索' bindinput='inputFilter' bindconfirm='inputFilter' bindfocus='inputFilter'></input>
      </view>
      <text class='cancel' catchtap='cancel'>清空</text>
    </view>
  </view>
  <!-- <view class='top' wx:if='{{hotCities.length}}'>
    <view class='title'>热门城市</view>
    <view class='items'>
      <view class='item' hover-class='hover-ddd' catchtap='choose' data-item='{{item}}' wx:key='{{index}}' wx:for='{{hotCities}}'>{{item.name}}</view>
    </view>
  </view> -->
  <view class='hot'>
    <view class='title'>猜你想找</view>
    <view class='cities'>
      <view class='item active' catchtap='choose'>
        <image class='icon' src='/img/location_s_w.png'></image>
        <view>定位</view>
      </view>
      <view class='item' hover-class='active' catchtap='choose' wx:for='{{hotCities}}' wx:key='{{index}}' data-name='{{item.name}}'>{{item.name}}</view>
    </view>
  </view>
  <view class='bottom'>
    <view wx:key='{{index}}' wx:for='{{showItems}}'>
      <view class='key'>{{index}}</view>
      <view class='values'>
        <view wx:key='{{index}}' class='value' hover-class='hover' wx:for='{{item}}' catchtap='choose' data-name='{{item.name}}'>{{item.name}}</view>
      </view>
    </view>
  </view>
  <view class='empty' wx:if='{{!showItems}}'>暂无城市可以选择</view>
</view>
