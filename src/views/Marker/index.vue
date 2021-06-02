<template>
   <div id="root">
       <div id="container" style="height:100%;width:100%;"></div>
       <div class="input-card">
           <button class="btn active" @click="addMarker">添加标记</button>
           <button class="btn active" @click="removeMarker">删除标记</button>
           <button class="btn active" @click="addCircle">添加圆形</button>
           <button class="btn active" @click="removeCircle">删除圆形</button>
           <button class="btn" @click="toggleHot" :class="{active: isHot}">显示热点</button>
       </div>
   </div>
</template>

<script>
    export default {
        name: 'Markers',
        data(){
            return {
                map: null,
                marker: new AMap.Marker({
                    icon: "https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png",
                    position: [117.132662, 36.673871],
                    offset: new AMap.Pixel(-9,-31),
                    draggable: true,
                    cursor: 'move',
                    raiseOnDrag: true
                }),
                circle: new AMap.Circle({
                    center: new AMap.LngLat("117.132662", "36.673871"), // 圆心位置
                    radius: 300,  //半径
                    strokeColor: "#F33",  //线颜色
                    strokeOpacity: 1,  //线透明度
                    strokeWeight: 3,  //线粗细度
                    fillColor: "#ee2200",  //填充颜色
                    fillOpacity: 0.35 //填充透明度
                }),
                isCircle: false,
                isMarker: false,
                placeSearch: null, // 构造地点查询类
                infoWindow: new AMap.AdvancedInfoWindow({}),
                isHot: false
            }
        },
        mounted() {
            this.map = new AMap.Map('container', {
                zoom: 16,
                center: [117.133548, 36.673054],
                resizeEnable: true,
                showIndoorMap:false,
                isHotspot: this.isHot
            })
            this.placeSearch = new AMap.PlaceSearch()
            console.log(this.placeSearch.getDetails)
            this.map.on('hotspotover', (result) => {
                this.placeSearch.getDetails(result.id, (status, result) => {
                    if (status === 'complete' && result.info === 'OK') {
                        this.placeSearch_CallBack(result);
                    }
                });
            })
        },
        methods: {
            addMarker() {
                // 构造点标记
                const content = '<div class="marker-route marker-marker-bus-from"></div>'
                if (this.isMarker) return false
                this.isMarker = true
                this.map.add(this.marker)
                this.map.setFitView()
            },
            removeMarker() {
                if (!this.isMarker) return false
                this.isMarker = false
                this.map.remove(this.marker)
                this.map.setFitView()
            },
            addCircle() {
                // 构造矢量圆形
                if (this.isCircle) return false
                this.isCircle = true
                this.map.add(this.circle)
                this.map.setFitView()
            },
            removeCircle() {
                if (!this.isCircle) return false
                this.isCircle = false
                this.map.remove(this.circle)
                this.map.setFitView()
            },
            createContent(poi) {  //信息窗体内容
                let s = [];
                s.push('<div class="info-title">'+poi.name+'</div><div class="info-content">'+"地址：" + poi.address);
                s.push("电话：" + poi.tel);
                s.push("类型：" + poi.type);
                s.push('<div>');
                return s.join("<br>");
            },
            placeSearch_CallBack(data) { //infoWindow.open(map, result.lnglat);
                const poiArr = data.poiList.pois;
                const location = poiArr[0].location;
                this.infoWindow.setContent(this.createContent(poiArr[0]));
                this.infoWindow.open(this.map,location);
            },
            toggleHot() {
                this.isHot = !this.isHot
                this.map.setStatus({
                    isHotspot: this.isHot
                })
            }
        }
    }
</script>

<style>
    #root .info-title{
        font-weight: bolder;
        color: #fff;
        font-size: 14px;
        width: 320px;
        line-height: 26px;
        padding: 0 0 0 6px;
        background-color: #409eff;
    }
    #root .info-content{
        width: 250px;
        padding: 4px;
        color: #666666;
        line-height: 23px;
        font: 12px Helvetica, 'Hiragino Sans GB', 'Microsoft Yahei', '微软雅黑', Arial;
    }
    #root .info-content img{
        float: left;
        margin: 3px;
    }
    #root .amap-info-combo .keyword-input {
        height: auto;
    }
</style>