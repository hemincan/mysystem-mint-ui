<template>
    <div id="main" class="app-main">

        <drawer
          width="200px;"
          :show.sync="drawerVisibility">

        <div slot="drawer" style="background:#495060;height:100vh">
            <mainmenu @menuClick="menuClick"></mainmenu>

          <!-- 菜单内容 -->
        <!--   <div style="width: 60vw;padding-top: 30px;">
              <div v-for="item in sideMenusList" :key="item.to">
                  <div @click="jumpto(item)">
                      {{item.name}}
                  </div>
              </div>
          </div> -->
        </div>

        <view-box ref="viewBox" :body-padding-top="isShowNav ? '46px' : '0'" body-padding-bottom="55px">
               <mt-header  style="z-index:100;background:#495060" fixed title="欢迎使用系统 ">
                    <mt-button  slot="left" @click="openMenu">菜单</mt-button>
                  <mt-button icon="" slot="right"  @click="exitSystem">退出系统</mt-button>
                </mt-header>
                <div style="padding:25px 5px 5px 5px;background:#f0f0f0;height:100vh;margin-top:-10px;">
                     <router-view/>
                </div>
               
          </view-box>

        </drawer>
    </div>
</template>

<script>
    import Mainmenu from "./Menu.vue"
    import { Drawer,XHeader,ViewBox } from 'vux'
    export default {
        components: {
            Drawer,
            XHeader,
            ViewBox,
            Mainmenu
        },
        data () {
            return {
                drawerVisibility:false,
                isShowNav:true,
                sideMenusList:[
                    {
                        to:'/',
                        name:"测试一"
                    },
                    {
                        to:'/main',
                        name:"测试二"
                    }
                ]
            };
        },
        mounted () {

        },
        beforeDestroy () {

        },
        methods: {
            openMenu(){
                this.drawerVisibility=true;
            },
            jumpto(item){
                this.$router.push(item.to);
                this.drawerVisibility=false;
            },
            exitSystem(){
                //向服务器请求退出
                 this.$router.push({path:'/login'});
            },
            menuClick(){

                this.drawerVisibility=false;
            }
        }
    };
</script>

<style>
html,body{
    width: 100%;
    height: 100%;
    background: #f0f0f0;
    overflow: hidden;
    margin:0;
    padding: 0;
    font-size: 18px;
}
.app-main{
    width: 100%;
    height: 100%;
}
</style>
