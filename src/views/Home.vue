<template>
    <div class="home">
        <img alt="Vue logo" src="../assets/logo.png">
        <!-- <HelloWorld msg="Welcome to Your Vue.js App" /> -->
        <div>价格：¥{{price}}</div>
        <div>总价：¥{{price*quantity}}</div>
        <div>折扣后：¥{{totlePriceWithTax}}</div>
        <p class="click" @click="add()">点我有惊喜哦</p>
        <p class="click" @click="getUserMsg()">获取用户信息</p>
    </div>
</template>

<script>
    // @ is an alias to /src
    import HelloWorld from '@/components/HelloWorld.vue'
    import { constants } from 'fs';

    export default {
        name: 'home',
        components: {
            HelloWorld
        },
        data() {
            return {
                token:JSON.parse(localStorage.getItem('userMsg')).token,
                price:5.00, //单价
                quantity:2, //数量
                list:[
                    {
                        id:1,
                        name:"小明",
                        age:20,
                        sex:"男"
                    },
                    {
                        id:2,
                        name:"小明2",
                        age:21,
                        sex:"男"
                    },
                    {
                        id:3,
                        name:"小明3",
                        age:22,
                        sex:"男"
                    },
                ],
            }
        },
        created() {

        },
        methods: {
            getUserMsg() {
                console.log("我发起请求了2",this)
                this.$post('/api/user/info', {token: this.token})
                .then((res) => {
                    let { nickname } = res.data;
                    console.log("name",res,nickname)
                })
            },
            add() {
                this.price = 10.00;
                // 查找某个特定属性
                var result = this.list.some(item=>{
                    if(item.id === 1){
                        console.log(item.name);
                    }
                })
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

