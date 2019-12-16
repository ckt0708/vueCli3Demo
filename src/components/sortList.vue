<template>
    <div class="main">
        <div class="header flex v-c">
            <a href="javascript:history.go(-1);" class="flex v-c">
                <img src="../assets/images/back.png" alt="">
                <span>返回</span>
            </a>
        </div>
    
        <div class="list">
            <h1>可上下移动排序列表</h1>
            <ul>
                <li v-for="(item,index) in tableData" :key="index" @click="isSelectLi(index,item.isSelect)" :class="item.isSelect ? 'active' : '' ">
                    <span @click="sortUp(index,item)">{{item.name}}上移{{index}}</span>
                    <span @click="sortDown(index,item)">下移</span>
                    <span>删除</span>
                    <span>编辑</span>
                    <span :class="(item.name ? 'active'+ item.id : '' )"></span>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            tableData:[
                {
                    name:"张飞",
                    seq:1,
                    sex:"男",
                    id:1,
                    isSelect:false,
                },
                {
                    name:"张飞2",
                    seq:2,
                    sex:"女",
                    id:2,
                    isSelect:false,
                },
                {
                    name:"张飞3",
                    seq:3,
                    sex:"女",
                    id:3,
                    isSelect:false,
                },
                {
                    name:"张飞4",
                    seq:4,
                    sex:"男",
                    id:4,
                    isSelect:false,
                },
            ],
        }
    },
    created(){

    },
    methods:{
        // 选择
        isSelectLi(index,type){
            if(type == false){
                this.tableData[index].isSelect = true;
            }else{
                this.tableData[index].isSelect = false;
            }
            this.$set(this.tableData, index, this.tableData[index]);
        },
        // 上移
        sortUp (index,row) {
            let temp = this.tableData[index - 1];
            console.log("temp",temp,index,this.tableData)
            if(index == 0){
                console.log("最上级了")
                return false;
            }
            this.$set(this.tableData, index - 1, this.tableData[index]);
            this.$set(this.tableData, index, temp)
        },
        // 下移
        sortDown (index,row) {
            let i = this.tableData[index + 1];
            var arrLength = this.tableData.length;
            if(index == arrLength - 1){
                console.log("最下级了")
                return false;
            }
            this.$set(this.tableData, index + 1, this.tableData[index]);
            this.$set(this.tableData, index, i)
        },
    }
}
</script>

<style scoped>
.flex {
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
}

.flex.v-c {
    -webkit-box-align: center;
    -webkit-align-items: center;
    align-items: center
}

/* top-back */
.header{
    font-size:17px;
    height: 50px;
}

.header a{
    font-size: 16px;
    color: #000;
}

.header img{
    width: 9px;
    height: 14px;
    margin: 0 11px 0 8px;
}
/* top-back END */

.list{
    font-size: 0.15rem;
    color: #000;
}

.list li{
    display: flex;
    justify-content: center;
    margin-bottom: 0.1rem;
    width: 100%;
    height: 0.4rem;
    line-height: 0.4rem;
    background: #fff;
}

.list li.active{
    background: #f3f3f3;
}

.list li span{
    flex: 1;
    border: 1px solid red;
}
</style>
