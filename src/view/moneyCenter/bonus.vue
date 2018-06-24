<template>
    <div>
        <!-- <div style="margin:8px;text-align:left">
         <Button type="primary" @click="addSkip">添加</Button>
        </div> -->
        
        <Table border :columns="columns7" :data="data6"></Table>
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
                        key: 'obtainDate'
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
                        title: '代理人',
                        key: 'agentName'
                    },
                    {
                        title: '代理帐号',
                        key: 'agentAccount'
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
                this.$Modal.info({
                    title: 'User Info',
                    content: `Name：${this.data6[index].name}<br>Age：${this.data6[index].age}<br>Address：${this.data6[index].address}`
                })
            },
            remove (index) {
                this.data6.splice(index, 1);
            }
        }
    }
</script>