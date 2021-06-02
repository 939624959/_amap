<template>
   <div id="root">
       <div id="container" style="height:100%;width:100%;"></div>
       <div class="input-card">
           <div>
               <button class="btn" :class="{active: isActive.Marker}" @click="addMarker">添加marker点</button>
               <button class="btn" :class="{active: isActive.Polyline}" @click="addPolyline">添加折线</button>
               <button class="btn" :class="{active: isActive.Polygon}" @click="addPolygon">添加多边形</button>
               <button class="btn" :class="{active: isActive.Circle}" @click="addCircle">添加圆形</button>
               <button class="btn" :class="{active: isActive.Rectangle}" @click="addRectangle">添加矩形</button>
               <br>
               <button class="btn" :class="{active: isActive.edit}" @click="editPolyline">编辑折线</button>
               <!--<button class="btn" :class="{active: isActive.edit}" @click="editPolyline">编辑点</button>-->
               <button class="btn" :class="{active: isActive.edit}" @click="editPolygon">编辑多边形</button>
               <button class="btn" :class="{active: isActive.edit}" @click="editCircle">编辑圆</button>
           </div>
           <div style="float: right" v-show="isDraw">
               <button class="btn active" @click="save">保存</button>
               <button class="btn active" @click="clear">清除</button>
           </div>
       </div>
   </div>
</template>

<script>
    export default {
        name: 'EditMarkers',
        data(){
            return {
                map: null,
                isActive: {},
                isDraw: false,
                mouseTool: null,
                polyEditor: null,
                overlays: {
                    markers: [],
                    circles: [],
                    polygons: [],
                    polylines: []
                },
                tempLays: [],
                paths: {
                    markerPath: {},
                    circlePath: {},
                    polygonPath: {},
                    polylinePath: {}
                },
            }
        },
        // computed: {
        //   paths() {
        //       const paths = {
        //           markerPath: {},
        //           circlePath: {},
        //           polygonPath: {},
        //           polylinePath: {}
        //       }
        //       Object.keys(this.overlays).forEach(key => {
        //           const  layers = this.overlays[key]
        //           switch (key) {
        //               case 'markers':{
        //                   for (let i = 0; i < layers.length; i ++) {
        //                       const position = [layers[i].lng, layers[i].lat]
        //                       paths.markerPath.push(position)
        //                   }
        //                   break;
        //               }
        //               case 'circles':{
        //                   break;
        //               }
        //               case 'polygons':{
        //                   break;
        //               }
        //               case 'polylines':{
        //                   break;
        //               }
        //           }
        //       })
        //       return paths
        //   }
        // },
        mounted() {
            this.map = new AMap.Map('container', {
                zoom: 16,
                center: [117.133548, 36.673054],
                resizeEnable: true,
                showIndoorMap:false
            })
            this.mouseTool = new AMap.MouseTool(this.map)
            // this.polyEditor = new AMap.PolylineEditor(this.map)
        },
        methods: {
            // 根据图层过滤路径信息
            updatePath(obj){
                const { markerPath, circlePath, polygonPath, polylinePath } = this.paths
                Object.keys(obj).forEach(key => {
                    const  layers = obj[key]
                    switch (key) {
                        case 'markers':{
                            for (let i = 0; i < layers.length; i ++) {
                                const position = [layers[i].Ce.position.lng, layers[i].Ce.position.lat]
                                this.$set(markerPath, 'marker' + i, position)
                            }
                            break;
                        }
                        case 'circles':{
                            for (let i = 0; i < layers.length; i ++) {
                                const center = [layers[i].Ce.center.lng, layers[i].Ce.center.lat]
                                const radius = layers[i].Ce.radius
                                this.$set(circlePath, 'circle' + i, {center, radius})
                            }
                            break;
                        }
                        case 'polygons':{
                            for (let i = 0; i < layers.length; i ++) {
                                const paths = layers[i].Ce.path
                                let path = []
                                for (let j = 0; j < paths.length; j ++){
                                    path.push([paths[j].lng, paths[j].lat])
                                }
                                this.$set(polygonPath, 'polygon' + i, path)
                            }
                            break;
                        }
                        case 'polylines':{
                            for (let i = 0; i < layers.length; i ++) {
                                const paths = layers[i].Ce.path
                                let path = []
                                for (let j = 0; j < paths.length; j ++){
                                    path.push([paths[j].lng, paths[j].lat])
                                }
                                this.$set(polylinePath, 'polyline' + i, path)
                            }
                            break;
                        }
                    }
                })
            },
            // 编辑折线
            editPolyline(){
                console.log('编辑折线', this.paths.polygonPath)
                this.isDraw = true
                if (this.overlays.polygons && this.overlays.polygons.length > 0) {
                    const num = this.overlays.polygons.length - 1
                    this.polyEditor = new AMap.PolyEditor(this.map, this.overlays.polygons[num])
                    // this.polyEditor.setTarget(this.paths.polygonPath)
                    this.polyEditor.open()
                }
            },
            // 编辑多边形
            editPolygon(){},
            // 编辑圆形
            editCircle(){},
            // 监控绘制过程
            tempOverlays(){
                this.mouseTool.on('draw',e => {
                    this.tempLays.push(e.obj)
                })
            },
            // 保存绘制图层
            saveLays(obj) {
                switch (obj.CLASS_NAME) {
                    case 'AMap.Marker':{
                        this.overlays.markers.push(obj)
                        break;
                    }
                    case 'AMap.Polyline':{
                        this.overlays.polylines.push(obj)
                        break;
                    }
                    case 'AMap.Polygon':{
                        this.overlays.polygons.push(obj)
                        break;
                    }
                    case 'AMap.Circle':{
                        this.overlays.circles.push(obj)
                        break;
                    }
                }
            },
            // 添加点标记
            addMarker() {
                this.isActive = {}
                this.isActive.Marker = true
                this.isDraw = true
                this.draw('marker')
                this.tempOverlays()
            },
            // 添加折线
            addPolyline(){
                this.isActive = {}
                this.isActive.Polyline = true
                this.isDraw = true
                this.draw('polyline')
                this.tempOverlays()
            },
            // 添加多边形
            addPolygon(){
                this.isActive = {}
                this.isActive.Polygon = true
                this.isDraw = true
                this.draw('polygon')
                this.tempOverlays()
            },
            // 添加圆
            addCircle(){
                this.isActive = {}
                this.isActive.Circle = true
                this.isDraw = true
                this.draw('circle')
                this.tempOverlays()
            },
            // 添加矩形
            addRectangle(){
                this.isActive = {}
                this.isActive.Rectangle = true
                this.isDraw = true
                this.draw('rectangle')
                this.tempOverlays()
            },
            // 保存
            save() {
                this.mouseTool && this.mouseTool.close()
                this.polyEditor && this.polyEditor.close()
                this.isDraw = false
                this.isActive = {}
                if (this.tempLays && this.tempLays.length>0) {
                    this.saveLays(this.tempLays[this.tempLays.length-1])
                    this.tempLays = []
                }
                this.updatePath(this.overlays)
            },
            // 清除
            clear(){
                this.map.remove(this.tempLays)
                this.tempLays = []
            },
            // 绘制
            draw(type) {
                switch(type){
                    case 'marker':{
                        this.mouseTool.marker({
                            //同Marker的Option设置
                            icon: "https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png",
                            // offset: new AMap.Pixel(-9,-31),
                            draggable: true,
                            cursor: 'move'
                        })
                        break;
                    }
                    case 'polyline':{
                        this.mouseTool.polyline({
                            strokeColor:'#80d8ff'
                            //同Polyline的Option设置
                        });
                        break;
                    }
                    case 'polygon':{
                        this.mouseTool.polygon({
                            fillColor:'#00b0ff',
                            strokeColor:'#80d8ff'
                            //同Polygon的Option设置
                        });
                        break;
                    }
                    case 'rectangle':{
                        this.mouseTool.rectangle({
                            fillColor:'#00b0ff',
                            strokeColor:'#80d8ff'
                            //同Polygon的Option设置
                        });
                        break;
                    }
                    case 'circle':{
                        this.mouseTool.circle({
                            fillColor:'#00b0ff',
                            strokeColor:'#80d8ff'
                            //同Circle的Option设置
                        });
                        break;
                    }
                }
            }
        }
    }
</script>

<style>
</style>