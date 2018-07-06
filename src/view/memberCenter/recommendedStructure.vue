<template>
    <Card>
        <p slot="title">
            <Icon type="person"></Icon>
            推荐结构
        </p>
         <div>
              <div style="color:#f0f0f0">帐号未激活或者已经禁用不会显示</div>
             <!-- <Tree :data="data2" show-checkbox></Tree> -->
        </div>
        <div>
            <div style="padding:10px;">
              总代理数：{{statisticsData.agentCount }}人，
              代理成功报单次数：{{statisticsData.applyGoodsCount }}次，
              代理总业绩：{{statisticsData.totalApplyMoney }}元
            </div>
           <Table border :columns="columns7" :data="data6"></Table>
            <!-- <Page :total="pageData.totalCount" size="small" show-elevator show-sizer @on-change="pageChange"></Page> -->
        </div>
    </Card>
</template>
<script>
import Cookies from 'js-cookie';
    export default {
        data () {
            return {
                data2: [],
                statisticsData:[],
                columns7: [
                   
                 {
                        title: '帐号',
                        key: 'accountNumber'
                    },
                 {
                        title: '姓名',
                        key: 'userName'
                    },
                      {
                        title: '代理类型',
                        key: 'agentTypeName'
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 80,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.show(params.index)
                                        }
                                    }
                                }, '查看')])
                            }
                        }
                
                ],
                data6: [
                ],
                pageData:{
                    pageIndex:0,
                    pageSize:10,
                    totalPages: 0,
                    totalCount: 0
                }
              }
        },
        mounted(){
            // this.init();
            this.findPage();
            this.findStatisticsData();
        },
        methods:{
            // init() {

            //        this.$http.get("/agentTree/recommendedStructure").then(response=> {
            //               var data = response.data;
            //               this.data2=data.result;

            //               if(this.data2==null){
            //                 this.data2=new Array();
            //               }

            //               var parent = {};
            //               var children = new Array();
            //               for (var i = 0; i < this.data2.length; i++) {
            //                   var title = this.data2[i].userName + "（" + this.data2[i].accountNumber +"）";
            //                   this.data2[i].title = title;
            //                   if(this.data2[i].accountNumber==Cookies.get("account")){
            //                       parent=this.data2[i];
            //                   }else {
            //                     children.push(this.data2[i]);
            //                   }
            //               }
            //               parent.children=children;
            //               this.data2= new Array();
            //               this.data2.push(parent);
                          
            //         })
            // },
            findPage(){
                this.$http.get("/agentTree/recommendedStructure?pageIndex="+this.pageData.pageIndex+"&pageSize="+this.pageData.pageSize+"&orderBy=id desc").then(response=> {
                      var data = response.data;
                      this.data6=data.result;
                      // this.pageData.totalCount=data.result.totalCount;
                      // this.pageData.totalPages = data.result.totalPages;
                })
            },
            findStatisticsData(){
               this.$http.get("/agentTree/statistics").then(response=> {
                          var data = response.data;
                          this.statisticsData = data.result;
               });
            },
            show (index) {
                this.$Modal.info({
                    title: '详细信息',
                    content: `编号：${this.data6[index].id}<br>帐号：${this.data6[index].accountNumber}<br>姓名：${this.data6[index].userName}<br>代理类型：${this.data6[index].agentTypeName}`
                })
            },
            pageChange(pageIndex){
                this.pageData.pageIndex=pageIndex;
                this.findPage();
            },
        }
    }
</script>