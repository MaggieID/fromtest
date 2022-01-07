<template>
  <div class="org-tree-node" :class="{'is-leaf':isLeaf(data, props.children)}">
    <div class="org-tree-node-label" @click="nodeClick($event,data)">
      <div class="org-tree-node-label-inner">
        <div class="item ">
          <div class="dept" :class="{select:data.isok}">
            <div>{{ data.orderNamr }}</div>
            <div style="font-size:10px;margin-top:10px">{{ data.deptNamr }}</div>
          </div>
          <div v-if="data.ordernum" class="order">
            <div> {{data.order}}</div>
            <div> {{data.ordernum}}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="org-tree-node-children" v-if="data.children&&data.children.length>0">
      <tree-node v-for="(item,index) in data.children" :key="index" :data="item" :props='props' :horizontal='horizontal'></tree-node>
    </div>
  </div>
</template>
<script>
export default {
  name: 'tree-node',
  props: {
    data: {
      type: Object,
      required: true
    },
    props: {
      type: Object,
      default: () => ({
        expand: 'expand',
        children: 'children'
      })
    },
    horizontal: Boolean
  },
  methods: {
    isLeaf(data, prop) {
      return !(Array.isArray(data[prop]) && data[prop].length > 0)
    },
    nodeClick(e, data) {
      this.$emit('on-node-click', e, data)
    }
  }
}
</script>
<style lang="scss" scoped>
.item {
  position: relative;
  min-width: 200px;
  display: flex;
  flex-direction: column;
  .dept {
    padding: 10px 15px;
    border: 1px solid #51be8d;
    border-radius: 5px;
    z-index: 999;
    background: white;
  }
  .order {
    background: #d2eee0;
    border-radius: 5px;
    color: #56585b;
    padding: 30px 20px 10px;
    width: 110%;
    z-index: 1;
    text-align: left;
    margin-top: -25px;
    margin-left: -5%;
  }
}
.select {
  position: relative;
  margin: 0 auto;
  text-align: center;
  background-color: #fff;
  box-shadow: 0px 2px 7px 0px rgba(85, 110, 97, 0.35);
  border-radius: 7px;
  border: 1px solid rgba(74, 190, 132, 1);
}
.select:before {
  content: '';
  position: absolute;
  right: 0;
  bottom: 0;
  border: 17px solid #4abe84;
  border-top-color: transparent;
  border-left-color: transparent;
}
.select:after {
  content: '';
  width: 7px;
  height: 12px;
  position: absolute;
  right: 6px;
  bottom: 6px;
  border: 2px solid #fff;
  border-top-color: transparent;
  border-left-color: transparent;
  transform: rotate(45deg);
}
</style>