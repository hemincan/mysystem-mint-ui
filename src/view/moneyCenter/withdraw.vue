<template>
    <div>
       <!--  <div style="margin:8px;text-align:left">
         <Button type="primary" @click="addSkip">添加</Button>
        </div> -->
          <!--  <div style="margin:8px;text-align:left;width:300px;">
                输入用户帐号：<Input v-model="searchForm.userAccount" placeholder="输入用户帐号" >
                    
                      <Button slot="append" type="primary" @click="serach">搜索</Button>
                </Input>
              
        </div> -->
        <Table size="large" border :columns="columns7" :data="data6"></Table>
        <Page :total="pageData.totalCount" size="small" show-elevator show-sizer @on-change="pageChange"></Page>
        <!-- {{pageData}} -->
    </div>
</template>
<script>
    export default {
        data () {
            return {
                columns7: [
                   {
                        title: '申请时间',
                        key: 'applicationTime',
                        width:110
                    },
            
                 {
                        title: '提现金额',
                        key: 'withdrawAmount'
                    },
                   
                    {
                        title: '状态',
                        key: 'state',
                        render: (h, params) => {
                            var str = '已处理';
                             if (params.row.state==0) {
                                str = '未处理';
                             }
                             return h('div',str);
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
                pageData:{
                    pageIndex:0,
                    pageSize:10,
                    totalPages: 0,
                    totalCount: 0
                },
                searchForm:{

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
                this.$http.post("/withdraw/findPageUser?pageIndex="+this.pageData.pageIndex+"&pageSize="+this.pageData.pageSize+"&orderBy=id desc",this.searchForm).then(response=> {
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
            show (index) {
                this.$Modal.info({
                    title: '详细信息',
                    content: `编号：${this.data6[index].id}
                    <br>提现金额：${this.data6[index].withdrawAmount}
                    <br>手续费：${this.data6[index].poundage}
                    <br>实获金额：${this.data6[index].realAmount}
                    <br>银行卡号：${this.data6[index].bankCard}
                    <br>户名：${this.data6[index].bankUserName}
                    <br>银行名：${this.data6[index].bankName}
                    
                    <br>申请时间：${this.data6[index].applicationTime}`
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