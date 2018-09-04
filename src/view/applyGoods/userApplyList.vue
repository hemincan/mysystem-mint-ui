<template>
    <div>
      <!--   <div style="margin:8px;text-align:left">
         <Button type="primary" @click="addSkip">添加</Button>
        </div> -->
      <!--    <div style="margin:8px;text-align:left;width:300px;">
                输入用户帐号：<Input v-model="searchForm.userAccount" placeholder="输入用户帐号" >
                    
                      <Button slot="append" type="primary" @click="serach">搜索</Button>
                </Input>
              
        </div> -->
        <Table size="large" border :columns="columns7" :data="data6"></Table>
        <Page :total="pageData.totalCount" size="small" show-elevator show-sizer @on-change="pageChange"></Page>
        <!-- {{pageData}} -->
          <Modal
            v-model="modal6"
            title="请确认"
            @on-ok="asyncOK">
            <div v-if="currentRow!=null">
                <p>{{currentRow.userName}}（{{currentRow.userAccount}}）</p>
             <p>{{currentRow.totalMoney}}元</p>
            </div>
            <p style="color:red;">请确认用户已经付款，此操作会使此订单启用，并会发放奖金和积分给推荐人,确认请按确认。</p>
        </Modal>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                columns7: [
              
                      {
                        title: '申请时间',
                        key: 'applyDate',
                        width:110
                    },
                       
                     {
                        title: '总价',
                        key: 'totalMoney'
                    },
                     {
                        title: '状态',
                        key: "state",
                         render: (h, params) => {
                            var state = "";
                            if(params.row.state==0){
                                state = "未处理";
                            }else{
                                state = "已完成";
                            }
                            return h('div', {
                                }, state);
                        }
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
                currentRow:null,
                modal6:false,
                pageData:{
                    pageIndex:0,
                    pageSize:10,
                    totalPages: 0,
                    totalCount: 0
                },
                searchForm:{
                   userAccount:null,
                }
            }
        },
        mounted(){
            this.findPage();
        },
        methods: {
            findPage(){
                for (var s in this.searchForm) {
                    if(this.searchForm[s]==''){
                        this.searchForm[s]=null;
                    }
                }
                this.$http.post("/applyGoods/findPageUser?pageIndex="+this.pageData.pageIndex+"&pageSize="+this.pageData.pageSize+"&orderBy=id desc",this.searchForm).then(response=> {
                      var data = response.data;
                      this.data6=data.result.result;
                      this.pageData.totalCount=data.result.totalCount;
                      this.pageData.totalPages = data.result.totalPages;
                })
            },
            addSkip(){
                this.$router.push({path: '/system/user/add'});
            },
            pageChange(pageIndex){
                this.pageData.pageIndex=pageIndex;
                this.findPage();
            },
            
             active(row){
                this.modal6=true;
                this.currentRow=row;
            },
            asyncOK(){
                this.modal6=false;
                 this.$http.get("/applyGoods/active?id="+this.currentRow.id).then(response=> {
                     alert(response.data.message);
                     row.state=1;
                })
            },
            show (index) {
                this.$Modal.info({
                    title: '详细信息',
                    content: `编号：${this.data6[index].id}
                    <br>申请日期：${this.data6[index].applyDate}
                    <br>类型：${this.data6[index].goodsType}
                    <br>商品数量：${this.data6[index].goodsCount}
                    <br>总价：${this.data6[index].totalMoney}
                    <br>收货电话：${this.data6[index].receiverPhone}
                    <br>收货人：${this.data6[index].receiverName}
                    <br>收货地址：${this.data6[index].receiverAddress}
                    <br>备注：${this.data6[index].remark}`


                })
            },
            remove (index) {
                this.data6.splice(index, 1);
            },
            serach(){
                this.findPage();
            }
        }
    }
</script>