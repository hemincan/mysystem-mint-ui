<template>
    <div>
        <!-- <div style="margin:8px;text-align:left">
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
                        key: 'obtainDate',
                        width:110
                    },
                 {
                        title: '奖金类型',
                        key: 'bonusType'
                    },
                    {
                        title: '金额',
                        key: 'money'
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
                this.$http.get("/bonus/findPageUser?pageIndex="+this.pageData.pageIndex+"&pageSize="+this.pageData.pageSize+"&orderBy=id desc").then(response=> {
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
                var content = `编号：${this.data6[index].id}<br>获得日期：${this.data6[index].obtainDate}<br>奖金类型：${this.data6[index].bonusType}<br>金额：${this.data6[index].money}元<br>对碰积分：${this.data6[index].collisionIntegral}<br>对碰比例：${this.data6[index].collisionRatio}<br>封顶奖励：${this.data6[index].collisionTop}`;
                if(this.data6[index].bonusType=='代理申单奖金'){
                    content = `编号：${this.data6[index].id}<br>获得日期：${this.data6[index].obtainDate}<br>奖金类型：${this.data6[index].bonusType}<br>金额：${this.data6[index].money}元<br>代理姓名：${this.data6[index].agentName}<br>代理帐号：${this.data6[index].agentAccount}`;
                }
                this.$Modal.info({
                    title: '详细信息',
                    content: content
                })
            },
            remove (index) {
                this.data6.splice(index, 1);
            }
        }
    }
</script>