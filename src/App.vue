<template>
  <div id="app">
      <router-view v-if="isRouterAlive"></router-view>
  </div>
</template>

<script>
export default {
        name: 'App',
        provide () {    //父组件中通过provide来提供变量，在子组件中通过inject来注入变量。                                             
            return {
                reload: this.reload                                              
            }
        },
        data() {
            return{
                isRouterAlive: true                    //控制视图是否显示的变量
            }
        },
        methods: {
            reload () {
                this.isRouterAlive = false;            //先关闭，
                this.$nextTick(function () {
                    this.isRouterAlive = true;         //再打开
                }) 
            }
        }
    }
</script>

<style>

#app{
  font-family: Helvetica Neue,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,"\5FAE\8F6F\96C5\9ED1",Arial,sans-serif;
}
* {
  margin: 0px;
  padding: 0px;
  touch-action: pan-x;
}

html, body, #app {
  height: 100%;
}
</style>
