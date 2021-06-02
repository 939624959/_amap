<template>
    <div id="root">
        <div id="container" style="height:100%;width:100%;"></div>
        <div class="input-card">
            <button class="btn" @click="zoomMap" :class="{active: isZoom}">地图缩放</button>
            <button class="btn" @click="dragMap" :class="{active: isDrag}">地图拖拽</button>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'test',
        data () {
            return {
                map: null,
                mapOpts: {
                    zoom: 16,
                    center: [117.133548, 36.673054],
                    showIndoorMap: false, // 是否在有矢量底图的时候自动展示室内地图，PC默认true,移动端默认false
                    resizeEnable: true, //是否监控地图容器尺寸变化，默认值为false
                    dragEnable: false, // 地图是否可通过鼠标拖拽平移，默认为true
                    keyboardEnable: false, //地图是否可通过键盘控制，默认为true
                    doubleClickZoom: false, // 地图是否可通过双击鼠标放大地图，默认为true
                    zoomEnable: false, //地图是否可缩放，默认值为true
                    rotateEnable: false, // 地图是否可旋转，3D视图默认为true，2D视图默认false
                },
                isZoom: false,
                isDrag: false
            }
        },
        mounted () {
            this.map = new AMap.Map('container', this.mapOpts)
            this.map.on('click', function(e) {
                console.log(e)
            });
        },
        methods: {
            zoomMap(){
                this.isZoom = !this.isZoom
                this.map.setStatus({
                    zoomEnable: this.isZoom
                })
            },
            dragMap() {
                this.isDrag = !this.isDrag
                this.map.setStatus({
                    dragEnable: this.isDrag
                })
            }
        }
    }
</script>

<style scoped>
</style>