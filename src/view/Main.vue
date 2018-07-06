<template>
    <div id="main" class="app-main">

        <drawer
          :show.sync="drawerVisibility" show-mode="push">

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

        <view-box ref="viewBox" :body-padding-top="isShowNav ? '46px' : '0'" body-padding-bottom="0px">
               <mt-header  style="z-index:100;background:#495060;height:50px" fixed :title="currentMenu.name">
                    <mt-button  slot="left" @click="openMenu">
                        <Icon size="36" type="navicon-round" class="menuIcon"></Icon>
                    </mt-button>
                    <div slot="header">
                        sss
                    </div>
                  <mt-button icon="" slot="right"  @click="exitSystem"><Icon size="36" type="home" class="menuIcon"></Icon></mt-button>
                </mt-header>
                <div style="padding:25px 5px 5px 5px;background:#f0f0f0;height:100vh;margin-top:-10px;">
                     <router-view/>
                     <div style="height:200px;"></div>
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
                currentMenu:{},
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
                 this.currentMenu={};
                 this.$router.push({path:'/home'});
            },
            menuClick(menu){
                this.currentMenu=menu;
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
.menuIcon:hover {
    color: #2d8cf0;
}
</style>
