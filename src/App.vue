<template>
  <div id="app">
    <!-- <div class="title">11</div>
    <div class="box"></div> -->
    <!-- <weekCalendar v-model="select"></weekCalendar> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App" /> -->
    <!-- <GooFlow></GooFlow> -->
    <!-- <vue2-org-tree :data="data" :horizontal="true" />-->
    <Treeselect :options='data.children' v-model="select" multiple :props="{value: 'id',label: 'deptNamr',children: 'children' }"></Treeselect>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
// import GooFlow from '@/components/GooFlow';
import Vue2OrgTree from '@/components/OrgTree'
import Treeselect from '@/components/Treeselect'
import weekCalendar from '@/components/weekCalendar'
import { parseTime } from '@/utils'
export default {
  name: 'App',
  components: {
    // HelloWorld
    // GooFlow
    Vue2OrgTree,
    Treeselect,
    weekCalendar
  },
  data() {
    return {
      select: '',
      data: {
        id: 0,
        deptNamr: 'XXX科技有限公司',
        orderNamr: '采购中心进行对外采购',
        order: '食堂需求单',
        ordernum: '9999',
        isok: true,
        children: [
          {
            id: 2,
            deptNamr: '产品研发部',
            orderNamr: '采购中心进行对外采购',
            order: '食堂需求单',
            ordernum: '9999',
            isok: true,
            children: [
              {
                id: 5,
                deptNamr: '研发-前端',
                orderNamr: '采购中心进行对外采购555',
                order: '食堂需求单',
                ordernum: '9999',
                isok: false,
                children: [
                  {
                    id: 11,
                    deptNamr: '研发-前端',
                    orderNamr: '采购中心进行对外采购555',
                    order: '食堂需求单',
                    ordernum: '9999',
                    isok: false
                  }
                ]
              },
              {
                id: 6,
                deptNamr: '研发-后端',
                orderNamr: '采购中心进行对外采购'
              },
              {
                id: 9,
                deptNamr: 'UI设计',
                orderNamr: '采购中心进行对外采购'
              },
              {
                id: 10,
                deptNamr: '产品经理',
                orderNamr: '采购中心进行对外采购'
              }
            ]
          },
          {
            id: 3,
            deptNamr: '销售部',
            orderNamr: '采购中心进行对外采购',
            children: [
              {
                id: 7,
                deptNamr: '销售一部',
                orderNamr: '采购中心进行对外采购'
              },
              {
                id: 8,
                deptNamr: '销售二部',
                orderNamr: '采购中心进行对外采购'
              }
            ]
          },
          {
            id: 4,
            deptNamr: '财务部',
            orderNamr: '采购中心进行对外采购'
          }
        ]
      }
    }
  },
  created() {
    // this.select = parseTime(new Date(), '{y}-{m}-{d}')
    console.log(this.select)
  }
}
</script>

<style>
#app {
  height: 100vh;
  background-color: #f0f2f5;
  padding: 15px;
  box-sizing: border-box;
  /* text-align: center;
  display: flex;
  align-items: center;
  justify-items: center;
  position: relative; */
}
.title {
  height: 60px;
  background: #eee;
  width: 100%;
  position: absolute;
  top: 0;
}
.box {
  width: 300px;
  height: 500px;
  background: rosybrown;
  margin: auto;
}
.g-container {
  height: 100%;
  width: 100%;
}
.el-scrollbar__wrap {
  overflow-x: hidden !important;
}
</style>
