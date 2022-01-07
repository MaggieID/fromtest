<template>
  <div id="app">
    <!-- <HelloWorld msg="Welcome to Your Vue.js App" /> -->
    <!-- <GooFlow></GooFlow> -->
    <vue2-org-tree :data="data" :horizontal="true" />
    <Treeselect :options='data.children' v-model="select" :props="{value: 'id',label: 'deptNamr',children: 'children' }"></Treeselect>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
// import GooFlow from '@/components/GooFlow';
import Vue2OrgTree from '@/components/OrgTree'
import Treeselect from '@/components/Treeselect'
export default {
  name: 'App',
  components: {
    // HelloWorld
    // GooFlow
    Vue2OrgTree,
    Treeselect
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
  }
}
</script>

<style>
#app {
  height: 100vh;
  background-color: #f0f2f5;
  padding: 15px;
  box-sizing: border-box;
}

.g-container {
  height: 100%;
  width: 100%;
}
.el-scrollbar__wrap {
  overflow-x: hidden !important;
}
</style>
