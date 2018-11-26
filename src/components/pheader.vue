<template>
    <div class="up_header">
      <div class="up_nav">
        <div class="up_nav_content">
        <span>
          <img src="./../assets/logo.png" alt="">
          <span class="title">综合业务管理系统</span>
        </span>
          <span class="welcome">
          <i class="iconfont icon-yonghu"></i><strong>admin</strong>
          <i class="icon iconfont icon-shenqing"></i><strong>设置</strong>
          <i class="iconfont icon-tuichu-copy"></i><strong>退出</strong>
        </span>
        </div>
      </div>
      <div class="p-content">
        <div class="p-left">
          <div class="p-left-height">
            <div class="nav_left active">
              <div class="slider">
                <ul>
                  <li>
                    <router-link
                            :to="{name:'platform.user'}"
                            class="left-cell"
                            :class="{active: $route.name == 'platform.user'}">
                      <i class="icon iconfont icon-yonghuguanli"></i>用户管理</router-link>
                  </li>
                  <li><router-link
                          :to="{name:'platform.org'}"
                          :class="{active: $route.name == 'platform.org'}"
                          class="left-cell"><i class="icon iconfont icon-guanli"></i>机构管理</router-link></li>
                  <li><router-link
                          :to="{name:'platform.menu'}"
                          :class="{active: $route.name == 'platform.menu'}"
                          class="left-cell"><i class="icon iconfont icon-liucheng"></i>菜单管理</router-link></li>
                  <li><router-link
                          :to="{name:'platform.role'}"
                          :class="{active: $route.name == 'platform.role'}"
                          class="left-cell"><i class="icon iconfont icon-huiyi"></i>角色管理</router-link></li>
                  <li><router-link
                          :to="{name:'platform.log'}"
                          :class="{active: $route.name == 'platform.log'}"
                          class="left-cell"><i class="icon iconfont icon-youjiantou"></i>日志查询</router-link></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div class="view" :class="{views : $route.meta.hideLeft,manager_statistics:$route.name == 'platform.flowstatistics'}">
          <slot name="right-view"></slot>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
      name: 'PHeader',
      data(){
        return{
          isActive:1,
          isLeftActive:1,
          isLeftNav: 1
        }
      },
      methods:{
        switcher(number){
          this.isLeftActive=number;
        }
      }
    }
</script>

<style lang="less" scoped>
  .up_header{
    min-width: 1200px;
    height: 100%;
    margin: 0 auto;
    font-size: 18px;
    font-weight: bold;
  }
  .up_nav{
    background-color: #026ab3;
    width: 100%;
    margin: auto;
    .up_nav_content{
      width: 90%;
      height: 100px;
      overflow: hidden;
      line-height: 100px;
      margin: auto;
      img{
        float: left;
        margin-top: 0.8%;
      }
      .title {
        color:#fff;
        margin-left:8px;
        font-size: 22px;
      }
      .welcome{
        cursor: pointer;
        float: right;
        color: #d5e0ee;
        .iconfont {
          margin-right: 8px;
        }
        strong {
          margin-right: 15px;
          &:last-child {
             margin-right: 0;
           }
        }
      }
    }
  }
  .iconfont {
    font-size: 22px;
  }
  a,a:hover{
    text-decoration:none;
    color: #a3afbc;
  }
  a:hover{
    color: #ffffff;
    font-weight: bolder;
  }
  .p-content {
    width:100%;
    overflow:hidden;
    position: relative;
    zoom:1;
    min-height: 800px;
    .p-left {
      width: 16%;
      float: left;
      min-height: 800px;
      height: 100%;
      background-color: #003b64;
      .p-left-height{
        position: absolute;
        width: 16%;
        top: 0;
        left: 0;
        background-color: #003b64;
        height: 100%;
        .nav_left{
          width: 100%;
          height: auto;
          font-weight: bolder;
          font-size: 18px;
          display: none;
          &.active{
            display: block;
          }
          li{
            list-style: none;
            height: 85px;
            line-height: 85px;
            .left-cell,.left-cell:hover{
              display: block;
              text-decoration:none;
              color: #a3afbc;
            }
            .left-cell:hover{
              color: #003b64 !important;
              background-color: white !important;
            }
            a {
              padding-left:40px;
              box-sizing: border-box;
              .icon {
                margin-right: 15px;
              }
              &.active {
                 color: #003b64 !important;
                 background-color: white !important;
               }
            }
            a:hover{
              color: #003b64 !important;
              background-color: white !important;
            }
          }
        }
      }
    }
    .view {
      float: left;
      width: 84%;
      padding: 0 0 0 0;
      box-sizing: border-box;
      &.views {
        width:100%;
       }
      &.manager_statistics {
        padding: 0 5% 0 0;
      }
    }
  }
</style>
