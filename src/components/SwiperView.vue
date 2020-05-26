<template>
  <div class='swiper_view'>
    <div v-swiper:mySwiper="swiperOption">
      <div class="swiper-wrapper">
        <div class="swiper-slide">
          <div>123</div>
        </div>
      </div>
      <div class="swiper-button-prev">
        <i class="iconfont icon-shangyiye"></i>
      </div>
      <div class="swiper-button-next" @click.native="Next">
        <i class="iconfont icon-xiayiye"></i>
      </div>
    </div>
    <div class="nav">
      <!-- <el-menu
        ref="elMenu"
        unique-opened
        default-active="1"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose">
        <el-submenu v-for="(item, index) in navList" :key="index" :index="item.id">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>{{item.nName}}</span>
          </template>
          <el-menu-item-group>
            <el-menu-item :index="'1-' + index" v-for="(list, index) in item.subMenu" :key="index">{{list}}</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu> -->
    </div>
    <div class="tabs">
      <!-- <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="用户管理" name="first">用户管理</el-tab-pane>
        <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>
        <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
        <el-tab-pane label="定时任务补偿" name="fourth" lazy>定时任务补偿</el-tab-pane>
      </el-tabs> -->
    </div>
    <div class="menu">
      <!-- <ul>
        <li v-for="(item, index) in menuList" :key="index" ref="menuLi">
          <span>{{item.name}}</span>
          <i class="el-icon-arrow-right"></i>
        </li>
      </ul> -->
    </div>
  </div>
</template>

<script>
import { getHomeData } from '@/api'
export default {
  name: 'SwiperView',
  data () {
    return {
      swiperOption: {
        loop: true,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      },
      navList: [
        {nName: '导航1', subMenu: ['李老师', '王老师', '刘老师'], id: '1'},
        {nName: '导航2', subMenu: ['李老师', '王老师', '刘老师'], id: '2'},
        {nName: '导航3', subMenu: ['李老师', '王老师', '刘老师'], id: '3'},
        {nName: '导航4', subMenu: ['李老师', '王老师', '刘老师'], id: '4'}
      ],
      keyIndex: 1,
      activeName: 'second',
      menuList: []
    }
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClick (tab, event) {
      console.log(tab, event)
    },
    async getMenuData () {
      this.menuList = await getHomeData(1)
      console.log(this.menuList)
    },
    Next () {
      console.log(123)
    }
  },
  created () {
    this.getMenuData()
  },
  // mounted () {
  //   // this.$nextTick(() => {
  //   //   let a = this.$refs.menuList
  //   //   console.log(a)
  //   // })
  //   // console.log(this.$refs.menuLi)
  // },
  updated () {
    let aLi = this.$refs.menuLi
    let index = 0
    for (let i = 0, len = aLi.length; i < len; i++) {
      aLi[i].onmouseenter = () => {
        aLi[index].classList.remove('on')
        index = i
        aLi[index].classList.add('on')
      }
      aLi[i].onmouseleave = () => {
        aLi[index].classList.remove('on')
      }
    }
  }
}
</script>

<style lang='scss' scoped>
  .swiper_view {
    width: 500px;
    margin: 50px auto;
    & >>> .swiper-container {
      .swiper-button-prev:after, .swiper-container-rtl .swiper-button-next:after {
        content: '';
      }
      .swiper-button-next:after, .swiper-container-rtl .swiper-button-prev:after {
        content: '';
      }
    }
    .nav {
      margin: 50px 0;
    }
    .menu {
      margin-top: 50px;
      ul {
        li {
          height: 40px;
          line-height: 40px;
          display: flex;
          justify-content: space-between;
          justify-items: center;
          padding: 0 15px;
          cursor: pointer;
          border-bottom: 1px dashed #ddd;
          color: #666;
          transition: all .3s;
          &.on {
            background-color: #eee;
          }
          i {
            position: relative;
            top: 50%;
            margin-top: -8px;
          }
        }
      }
    }
  }
</style>
