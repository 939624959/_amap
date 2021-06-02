<template>
   <div id="root">
       <div id="container" style="height:100%;width:100%;"></div>
       <div class="input-card">
           <button class="btn" @click="toggleScale" :class="{active: showScale}">比例尺</button>
           <button class="btn" @click="toggleToolBar" :class="{active: showToolBar}">工具条</button>
           <button class="btn" @click="toggleToolBarDirection" :class="{active: showToolBar && showDir}">方向盘</button>
           <button class="btn" @click="toggleToolBarRuler" :class="{active: showToolBar && showRuler}">标尺</button>
       </div>
   </div>
</template>

<script>
    export default {
        name: 'Control',
        data(){
            return {
                map: null,
                marker: null,
                circle: null,
                scale: null,
                toolBar: null,
                overView: null,
                showScale: false,
                showToolBar: false,
                showDir: true,
                showRuler: true
            }
        },
        mounted() {
            this.map = new AMap.Map('container', {
                zoom: 16,
                center: [117.133548, 36.673054],
                resizeEnable: true,
                showIndoorMap:false
            })
            this.scale =  new AMap.Scale({
                visible: false
            })
            this.toolBar = new AMap.ToolBar({
                visible: false
            })
            this.overView = new AMap.OverView({
                visible: false
            })
            this.map.addControl(this.scale)
            this.map.addControl(this.toolBar)
            this.map.addControl(this.overView)
        },
        methods: {
            toggleScale() {
                this.showScale = !this.showScale
                if (this.showScale) {
                    this.scale.show()
                } else {
                    this.scale.hide()
                }
            },
            toggleToolBar() {
                this.showToolBar = !this.showToolBar
                if (this.showToolBar) {
                    this.toolBar.show()
                    this.toolBar.showDirection()
                    this.toolBar.showRuler()
                } else {
                    this.toolBar.hide()
                    this.toolBar.hideDirection()
                    this.toolBar.hideRuler()
                }
            },
            toggleToolBarDirection() {
                if (!this.showToolBar) return false
                this.showDir = !this.showDir
                if (this.showDir) {
                    this.toolBar.showDirection()
                } else {
                    this.toolBar.hideDirection()
                }
            },
            toggleToolBarRuler() {
                if (!this.showToolBar) return false
                this.showRuler = !this.showRuler
                if (this.showRuler) {
                    this.toolBar.showRuler()
                } else {
                    this.toolBar.hideRuler()
                }
            }
        }
    }
</script>

<style scoped>
</style>