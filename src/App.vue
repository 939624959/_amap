<template>
  <div id="app">
    <nav class="nav">
      <router-link to="/edit" class="nav_item" :class="{active: $route.path==='/edit'}">编辑标记</router-link>
      <router-link to="/status" class="nav_item" :class="{active: $route.path==='/status'}">交互控制</router-link>
      <router-link to="/marker" class="nav_item" :class="{active: $route.path==='/marker'}">覆盖物</router-link>
      <router-link to="/control" class="nav_item" :class="{active: $route.path==='/control'}">控件</router-link>
    </nav>
    <div class="container">
      <router-view />
    </div>
  </div>
</template>

<script>
// import MapLoader from '@/plugins/amap.js'
// import AMapLoader from '@amap/amap-jsapi-loader'
export default {
  name: 'test',
}
</script>

<style>
html,body{
  margin: 0;
  padding: 0;
  height: 100%;
}
#app{
  width: 100%;
  height: 100%;
}
  .nav{
    width: 100%;
    height: 50px;
    background-color: black;
    line-height: 50px;
    text-align: center;
    position: absolute;
    top: 0;
    z-index: 99;
    display: flex;
    justify-content: space-around;
  }
  .nav_item{
    color: rgba(255,255,255,.6);
    text-decoration: none;
    font-size: 16px;
  }
  .nav_item:hover{
    color: white;
  }
.container{
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: 60px 10px 10px 10px;
}
#root{
  width: 100%;
  height: 100%;
}
.nav_item.active{
  color: white;
  }
.input-card{
  position: relative;
  top: -100%;
  float: right;
}
.btn{
  background-color: #ecf5ff;
  width: 100px;
  height: 46px;
  border-radius: 6px;
  float: left;
  border: 1px solid #b3d8ff;
  color: #409eff;
  margin: 2px;
}
  .btn.active,.btn:hover{
    color: white;
    background-color: #409eff;
  }
</style>
