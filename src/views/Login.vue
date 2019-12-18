<template>
    <div>
        <h1>登录页面</h1>
        <!-- <van-cell-group> -->
            <van-field
                v-model="username"
                required
                clearable
                label="邮箱"
                right-icon="question-o"
                placeholder="请输入邮箱"
                @click-right-icon="$toast('question')"
            />

            <van-field
                v-model="password"
                type="password"
                label="密码"
                placeholder="请输入密码"
                required
            />
        <!-- </van-cell-group> -->
        

        <van-button type="primary" @click="login()">主要按钮</van-button>

        
    </div>
</template>

<script>
import authApi from "../auth.js";
import { Dialog,Button,Field,Notify } from 'vant';

export default {
    name: 'login',
    data(){
        return{
            username:null,
            password:null,
            hao:false,
        }
    },
    created () {
        document.title = '登录';
    },
    methods:{
        // 登录
        login(){
            // var reg=11&& /^((13|14|15|17|18)[0-9]{1}\d{8})$/;//手机号正则验证
            var phoneNum = this.username;
            if(!phoneNum){
                Notify({ type: 'danger', message: '请输入登录账号' });
                return;
            }
            // if(!reg.test(phoneNum)){
            //   Notify({ type: 'danger', message: '手机号不合法' });
            //   return;
            // }
            var password = this.password;
            if(!password){
                Notify({ type: 'danger', message: '请输入密码' });
                return;
            }else if(password.length<6 || password.length>18){
                Notify({ type: 'danger', message: '请输入正确的密码' });
                return;
            }
            this.$axios.post('/api/login/index',{
                phone:phoneNum,
                password:password
            })
            .then( (res) =>{
                console.log("res",res)
                if(this.hao){
                    localStorage.setItem('phone',phoneNum);
                    localStorage.setItem('password',password);
                }
                else{
                    localStorage.setItem('phone','');
                    localStorage.setItem('password','');
                }
                if(res.code=='0'){
                    localStorage.setItem('userMsg',JSON.stringify(res.data));
                    localStorage.setItem('user_id',res.data.user_id);
                    
                    localStorage.setItem('ifLogin','true');

                    Notify({ type: 'success', message: '登录成功' });

                    this.$router.push({path: '/'});
                }
                else{
                    Notify({ type: 'danger', message: res.data.message });
                }
            })
        },
    },
    components: {
        "van-button": Button,
        "van-field":Field,
    },

}
</script>

<style scoped>
    .van-button--normal{
        margin-top: 0.2rem;
    }
</style>

