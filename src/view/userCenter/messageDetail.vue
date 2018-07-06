<template>
	<Card>
        <p slot="title">
            <Icon type="person"></Icon>
            消息详情
        </p>
        <div style="width:90vw;word-wrap: break-word">
		{{message.content}}
	</div>
	</Card>
</template>
<script>
	 export default {
        data (){
            return {
            	message:[]
            }
        },
        mounted(){
        	this.get();
        },
        methods:{
        	 get(){
                this.$http.get("/message/get?id="+this.$route.query.id).then(response=> {
                      var data = response.data;
                      this.message=data.result;
                })
            }
        }
    }
</script>