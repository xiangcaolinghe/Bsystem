<template>
    <div class="user-page">
        <div class="left cell">
            <div class="title">
                组织机构
            </div>
            <div class="content">

            </div>
        </div>
        <div class="right cell">
            <div class="title">
                组织机构
            </div>
            <div class="content"></div>
        </div>
    </div>
</template>

<script>
  export default {
    name: '',
    components:{  },
    created() {

    }
  }
</script>

<style lang="less" scoped>
    .user-page {
        width:100%;
        .cell {
            float:left;
            border-radius: 3px;
            overflow: hidden;
            box-sizing: border-box;
            border:1px solid #ccc;
            .title {
                height:40px;
                background: #ccc;
                text-align: center;
                line-height: 40px;
                color:#fff;
            }
            &.left {
                width:28%;
                margin: 0 1%;
             }
            &.right {
                 width:70%;
             }
        }
    }
</style>
