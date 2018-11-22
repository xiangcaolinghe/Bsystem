<template>
  <div>
    <p-header>
      <div slot="right-view">
        <router-view/>
      </div>
    </p-header>
    <div class="footer">
      <p-footer></p-footer>
    </div>
  </div>
</template>

<script>
  import PHeader from './components/pheader.vue'
  import PFooter from './components/pfooter.vue'
  export default {
    name: '',
    components:{ PHeader,PFooter },
    created() {

    }
  }
</script>

<style lang="less">
  @import './assets/styles/base.less';
  @import './assets/iconfonts/iconfont.css';
  @import './assets/styles/header.less';
  @import './assets/styles/footer.less';
#app {
  font-family: "Microsoft YaHei","Arial","黑体","宋体",sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  /*color: #2c3e50;*/
}
</style>
