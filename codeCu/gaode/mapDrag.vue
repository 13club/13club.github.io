<!--
  描述：拖放地图组件，默认尺寸是 500 * 300

  接收属性参数：
    lat: 纬度
    lng: 经度

  自定义事件：
    drag: 拖放完成事件

  示例：
    <mapDrag @drag="dragMap" lat="22.574405" lng="114.095388"></mapDrag>
-->
<template>
  <div class="m-map">
    <div class="search" v-if="placeSearch">
      <input type="text" placeholder="请输入关键字" v-model="searchKey">
      <button type="button" @click="handleSearch">搜索</button>
      <button @click="closeMap">关闭</button>
      <div id="js-result" v-show="jsResultList" class="result"></div>
    </div>
    <div id="js-container" class="map">正在加载数据 ...</div>
  </div>
</template>

<script>
import remoteLoad from './../utils/remoteLoad.js'
// import { MapKey, MapCityName } from '@/config/config'
var MapKey = "cfd8da5cf010c5f7441834ff5e764f5b";
var MapCityName = "深圳";
export default {
  props: ['lat', 'lng'],
  data () {
    return {
      searchKey: '',
      jsResultList:false,
      placeSearch: null,
      dragStatus: false,
      AMapUI: null,
      AMap: null
    }
  },
  watch: {
    searchKey () {
      if (this.searchKey === '') {
        this.placeSearch.clear()
      }
    }
  },
  methods: {
    // 搜索
    handleSearch () {
      console.log('输入：',this.searchKey)
      this.jsResultList = true;
      if (this.searchKey) {
        this.placeSearch.search(this.searchKey)
      }
    },
    closeMap(){
      this.jsResultList = false;

          this.getLocation();
    },
    // 实例化地图
    initMap () {
      // 加载PositionPicker，loadUI的路径参数为模块名中 'ui/' 之后的部分
      let AMapUI = this.AMapUI = window.AMapUI
      let AMap = this.AMap = window.AMap
      AMapUI.loadUI(['./misc/PositionPicker'], PositionPicker => {
        let mapConfig = {
          zoom: 16,
          cityName: MapCityName
        }
        if (this.lat && this.lng) {
          mapConfig.center = [this.lng, this.lat]
        }
        let map = new AMap.Map('js-container', mapConfig)
        // 加载地图搜索插件
        AMap.service('AMap.PlaceSearch', () => {
          this.placeSearch = new AMap.PlaceSearch({
            pageSize: 5,
            pageIndex: 1,
            citylimit: true,
            city: MapCityName,
            map: map,
            panel: 'js-result'
          })
          console.log(this.placeSearch)
        })
        // 启用工具条
        AMap.plugin(['AMap.ToolBar'], function () {
          map.addControl(new AMap.ToolBar({
            position: 'RB'
          }))
        })
        // 创建地图拖拽
        let positionPicker = new PositionPicker({
          mode: 'dragMap', // 设定为拖拽地图模式，可选'dragMap'、'dragMarker'，默认为'dragMap'
          map: map // 依赖地图对象
        })
        // 拖拽完成发送自定义 drag 事件
        positionPicker.on('success', positionResult => {
          // 过滤掉初始化地图后的第一次默认拖放
          if (!this.dragStatus) {
            this.dragStatus = true
          } else {
            this.$emit('drag', positionResult)
          }
        })
        // 启动拖放
        positionPicker.start()
      })
    },
    getLocation(){
      var map, geolocation;

      //加载地图，调用浏览器定位服务

      map = new AMap.Map('container', {

        resizeEnable: true

      });

      map.plugin('AMap.Geolocation', function() {

        geolocation = new AMap.Geolocation({

        enableHighAccuracy: true, //是否使用高精度定位，默认:true

        timeout: 10000, //超过10秒后停止定位，默认：无穷大

        buttonOffset: new AMap.Pixel(10, 20), //定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)

        zoomToAccuracy: true, //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false

        buttonPosition: 'RB'

      });

      map.addControl(geolocation);

        geolocation.getCurrentPosition();

        AMap.event.addListener(geolocation, 'complete', onComplete); //返回定位信息

        AMap.event.addListener(geolocation, 'error', onError); //返回定位出错信息

      });

      //解析定位结果

      function onComplete(data) {

        console.log(data);

        console.log(data.formattedAddress);

        console.log('纬度：' + data.position.getLat());

        console.log('经度：' + data.position.getLng());

      }

      // 解析定位错误信息

      function onError(data) {

        console.log('定位失败');

      }
    }
  },
  async created () {
    // 已载入高德地图API，则直接初始化地图
    if (window.AMap && window.AMapUI) {
      this.initMap()
    // 未载入高德地图API，则先载入API再初始化
    } else {
      await remoteLoad(`http://webapi.amap.com/maps?v=1.3&key=${MapKey}`)
      await remoteLoad('http://webapi.amap.com/ui/1.0/main.js')
      this.initMap()
    }

  },
}
</script>

<style lang="css">
.m-map{ min-width: 500px; min-height: 300px; position: relative; }
.m-map .map{ width: 100%; height: 100%; }
.m-map .search{ position: absolute; top: 10px; left: 10px; width: 285px; z-index: 1; }
.m-map .search input{ width: 180px; border: 1px solid #ccc; line-height: 20px; padding: 5px; outline: none; }
.m-map .search button{ line-height: 26px; background: #fff; border: 1px solid #ccc; width: 50px; text-align: center; }
.m-map .result{ max-height: 300px; overflow: auto; margin-top: 10px; }
</style>
