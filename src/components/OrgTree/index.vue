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
  },
  methods: {
    //根据子级获取父级
    getParentIdList(list, id) {
      if (!list || !id) {
        return ''
      }
      const arr = []
      const findParent = (data, nodeId, parentId) => {
        for (var i = 0, length = data.length; i < length; i++) {
          const node = data[i]
          // 由于后端返回的树状结构数组里面的value值为string类型,所以为了避免判断全等有问题,所以将传入的城市id使用toString进行了类型转换
          if (node.DocNo === nodeId) {
            arr.unshift(node)
            if (nodeId === list[0].DocNo) {
              break
            }
            findParent(list, parentId)
            break
          } else {
            if (node.Childs) {
              findParent(node.Childs, nodeId, node.DocNo)
            }
            continue
          }
        }
        return arr
      }
      return findParent(list, id)
    }
  }
}
</script>
<style lang="scss">
@import './styles/org-tree';
</style>
