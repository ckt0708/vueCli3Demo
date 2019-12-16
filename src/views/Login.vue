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
        

        <van-button type="primary" @click="onSubmit()">主要按钮</van-button>

        
    </div>
</template>

<script>
import authApi from "../auth.js";
import { Dialog,Button,Field } from 'vant';

export default {
    name: 'login',
    data(){
        return{
            username:null,
            password:null,
        }
    },
    methods:{
        // 登录
        onSubmit(){
            authApi.login(this.username,this.password)
            .then(() => this.$router.push("/"))
            .catch(() => { this.tipsError() })
        },
        tipsError(){
            Dialog.confirm({
                title: '提示',
                message: '登录错误'
            }).then(() => {
            // on confirm
                console.log("confirm")
            }).catch(() => {
            // on cancel
                console.log("cancel")
            });
        }
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

