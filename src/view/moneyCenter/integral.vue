<template>
    <div>
       <!--  <div style="margin:8px;text-align:left">
         <Button type="primary" @click="addSkip">添加</Button>
        </div> -->
        
        <Table size="large" border :columns="columns7" :data="data6"></Table>
        <Page :total="pageData.totalCount" size="small" show-elevator show-sizer @on-change="pageChange"></Page>

       
    </div>
</template>
<script>
    export default {
        data () {
            return {
                columns7: [
                   
                 {
                        title: '获得时间',
                        key: 'receiveDate',
                        width:110
                    },
                 {
                        title: '奖金类型',
                        key: 'type'
                    },
                    {
                        title: '获得积分',
                        key: 'amount'
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
            this.findPage();
        },
        methods: {
            findPage(){
                this.$http.get("/bonus/findIntegralPageUser?pageIndex="+this.pageData.pageIndex+"&pageSize="+this.pageData.pageSize+"&orderBy=id desc").then(response=> {
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
                    content: `编号：${this.data6[index].id}<br>获得日期：${this.data6[index].receiveDate}<br>积分数额：${this.data6[index].amount}<br>积分类型：${this.data6[index].type}<br>备注：${this.data6[index].remark}`
                })
            },
            remove (index) {
                this.data6.splice(index, 1);
            }
        }
    }
</script>