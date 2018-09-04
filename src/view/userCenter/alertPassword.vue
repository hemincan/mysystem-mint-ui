<template>
	<Card>
        <p slot="title">
            <!-- <Icon type="person"></Icon> -->
            申请提现
        </p>
        <div style="width:90vw">
	<div>
		 <Form ref="editPasswordForm" :model="editPasswordForm" :label-width="90" label-position="right" :rules="passwordValidate">
                <FormItem label="原密码" prop="oldPass" :error="oldPassError">
                    <Input size="large" v-model="editPasswordForm.oldPass" placeholder="请输入现在使用的密码" ></Input>
                </FormItem>
                <FormItem label="新密码" prop="newPass">
                    <Input size="large" v-model="editPasswordForm.newPass" placeholder="请输入新密码，至少6位字符" ></Input>
                </FormItem>
                <FormItem label="确认新密码" prop="rePass">
                    <Input size="large" v-model="editPasswordForm.rePass" placeholder="请再次输入新密码" ></Input>
                </FormItem>
            </Form>
            <div style="color:red">{{passwordErrorMessage}}</div>
           
           <!--  <Button type="text" >取消</Button> -->
            <Button type="primary" size="large" long :loading="savePassLoading" @click="saveEditPass">保存</Button>
           
	</div>
	</div>
	</Card>
</template>
<script>
export default {
	data(){
        const valideRePassword = (rule, value, callback) => {
            if (value !== this.editPasswordForm.newPass) {
                callback(new Error('两次输入密码不一致'));
            } else {
                callback();
            }
        };
		return {
			 editPasswordForm: {
                oldPass: '',
                newPass: '',
                rePass: ''
            },
            passwordErrorMessage:'',
            passwordValidate: {
                oldPass: [
                    { required: true, message: '请输入原密码', trigger: 'blur' }
                ],
                newPass: [
                    { required: true, message: '请输入新密码', trigger: 'blur' },
                    { min: 6, message: '请至少输入6个字符', trigger: 'blur' },
                    { max: 32, message: '最多输入32个字符', trigger: 'blur' }
                ],
                rePass: [
                    { required: true, message: '请再次输入新密码', trigger: 'blur' },
                    { validator: valideRePassword, trigger: 'blur' }
                ]
            },
            oldPassError: '',
            savePassLoading:false
		}
	},
	methods:{
		saveEditPass () {
            this.$refs['editPasswordForm'].validate((valid) => {
                if (valid) {
                    this.passwordErrorMessage="";
                    this.savePassLoading = true;
                    // you can write ajax request here
                    this.$http.post("/user/alertPassword",{
                        oldPassword: this.editPasswordForm.oldPass,
                        newPassword: this.editPasswordForm.newPass
                    }).then(response=> {
                          //如果接口走成功就执行这里
                          // console.log(JSON.stringify(response));
                          var data = response.data;
                          if(data.code == 0) {
                              this.$Notice.success({
                                    title: "修改密码已成功！"
                                });
                          }else{
                              this.passwordErrorMessage = data.message;
                          }
                          this.savePassLoading = false;
                          this.editPasswordModal=false;
                    }).catch(function (error) {
                      //接口失败，也就是state不是200的时候，走这里
                    });
                }
            });
        },
	}
}
</script>