<template>
  <div class="org-tree-container">
    <div class="org-tree" :class="{horizontal}">
      <tree-node :data="data" :props='props' :horizontal='horizontal'></tree-node>
    </div>
  </div>
</template>
<script>
import treeNode from './tree-node'
export default {
  components: { treeNode },
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
  }
}
</script>
<style lang="scss">
@import './styles/org-tree';
</style>
