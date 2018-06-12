<template>
    <div id="main" class="app-main">

        <drawer
          width="200px;"
          :show.sync="drawerVisibility">

        <div slot="drawer">
          <!-- 菜单内容 -->
          <div style="width: 60vw;padding-top: 30px;">
              <div v-for="item in sideMenusList" :key="item.to">
                  <div @click="jumpto(item)">
                      {{item.name}}
                  </div>
              </div>
          </div>
        </div>

        <view-box ref="viewBox" :body-padding-top="isShowNav ? '46px' : '0'" body-padding-bottom="55px">
               <mt-header fixed title="多个按钮">
                    <mt-button  slot="left" @click="openMenu">菜单</mt-button>
                  <mt-button icon="more" slot="right"></mt-button>
                </mt-header>
                <router-view/>
          </view-box>

        </drawer>
    </div>
</template>

<script>
    import { Drawer,XHeader,ViewBox } from 'vux'
    export default {
        components: {
            Drawer,
            XHeader,
            ViewBox
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
}
.app-main{
    width: 100%;
    height: 100%;
}
</style>
