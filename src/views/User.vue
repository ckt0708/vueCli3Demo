<template>
    <div>
        个人中心
        {{key}}
        <van-button type="danger" @click='exit()'>退出登录</van-button>
    </div>
</template>

<script>
    import { Dialog,Button } from 'vant';
    export default {
        name:"user",
        data() {
            return {
                key: "value"
            }
        },
        methods: {
            // 注销
            exit() {
                Dialog.confirm({
                    // title: '提示',
                    message: '确定退出登录'
                }).then(() => {
                    var that = this;
                    localStorage.removeItem('userMsg');
                    localStorage.removeItem('ifLogin');
                    localStorage.removeItem('bonus_count');
                    window.location.reload();
                    // that.WebSocket= new WebSocket(that.wsApiUrl);
                    // that.WebSocket.onopen = function () {
                    //     var obj = {"type":"exit_bonus_notice", "data": {"token": that.token}};
                    //     that.WebSocket.send(JSON.stringify(obj));
                    // };
                    // that.WebSocket.onclose = function () {
                        
                    // };
                    // that.WebSocket.onmessage = function (evt) {
                    //     var res = JSON.parse(evt.data);
                    //     switch(res.type){
                    //         case 'exit_notice_success':
                    //             localStorage.removeItem('bonus_count');
                    //             break;
                    //         default:;
                    //     }
                    // }
                }).catch(() => {

                });
                
            }
        },
        components: {
            "van-button": Button,
        },
    }
</script>

<style scoped>

</style>