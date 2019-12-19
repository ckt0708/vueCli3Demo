<template>
    <div class="home">
        <img alt="Vue logo" src="../assets/logo.png">
        <!-- <HelloWorld msg="Welcome to Your Vue.js App" /> -->
        <div>价格：¥{{price}}</div>
        <div>总价：¥{{price*quantity}}</div>
        <div>折扣后：¥{{totlePriceWithTax}}</div>
        <p class="click" @click="add()">点我有惊喜哦</p>
        <p class="click" @click="getUserMsg2()">获取用户信息</p>
    </div>
</template>

<script>
    // @ is an alias to /src
    import HelloWorld from '@/components/HelloWorld.vue'
    import {
        setTimeout
    } from 'timers';
    
    export default {
        name: 'home',
        components: {
            HelloWorld
        },
        data() {
            return {
                token:JSON.parse(localStorage.getItem('userMsg')).token,
                price:5.00,//单价
    	        quantity:2//数量
            }
        },
        created() {
            console.log("$route",this.$route)
            async function hello(flag) {
                if (flag) {
                    return 'hello world';
                } else {
                    throw 'happen Error';
                }
            }
            // console.log(hello(0));
            // console.log(hello(1));
            // hello(0).catch(err=>{
            //   console.log(err);
            // })
        },
        methods: {
            // clickMe(){
            //   console.log("你点到我了")
            // },
            cli() {
                this.clickMe().then((res) => {
                    this.add();
                    console.log("res", res)
                })
            },
            async clickMe() {
                console.log("你点到我了")
                let userMsg = await this.getUserMsg();
                console.log("this.userMsg", userMsg)
            },
            getUserMsg() {
                return new Promise((resolve, reject) => {
                    setTimeout(() => {
                        console.log("我发起请求了")
                        this.$axios.post('/api/user/info', {
                            token: this.token
                        })
                        .then((res) => {
                            let { nickname } = res.data.data;
                            console.log("name",res,nickname)
                        })
                    }, 800)
                })
            },
            getUserMsg2() {
                console.log("我发起请求了2",this)
                this.$post('/api/user/info', {token: this.token})
                .then((res) => {
                    console.log("name",res)
                })
            },
            add() {
                this.price = 10.00;
            },
            delete() {
                console.log("delete")
            }
        },
        mounted() {
            
        },
        computed: {
            totlePriceWithTax() {
                return this.price*this.quantity*2
            }
        },
    }
</script>

<style scoped>
    .click{
        font-size: 1rem;
        margin: 20px 0;
        transform: translateY(-10px);
    }
</style>

