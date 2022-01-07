<template>
  <div style="display: flex;">
    <el-button icon="el-icon-arrow-left" @click="lastWeek"></el-button>
    <el-radio-group v-model="value">
      <el-radio-button :label="item" v-for="(item,index) in dates" :key="index">
        <div class="date">{{item}}</div>
        <div class="week">{{weeks[index]}}</div>
      </el-radio-button>
    </el-radio-group>
    <el-button icon="el-icon-arrow-right" @click="nextWeek"></el-button>
  </div>
</template>
<script>
export default {
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      weeks: [
        '星期日',
        '星期一',
        '星期二',
        '星期三',
        '星期四',
        '星期五',
        '星期六'
      ],
      dates: [],
      currentFirstDate: ''
    }
  },
  mounted() {
    console.log(this.setDate(new Date()))
    this.setDate(new Date())
  },
  methods: {
    setDate(date) {
      var arr = []
      var week = date.getDay() - 1
      date = this.addDate(date, week * -1)
      this.currentFirstDate = new Date(date)
      for (var i = 0; i < 7; i++) {
        arr.push(this.formatDate(i == 0 ? date : this.addDate(date, 1)))
      }
      this.dates = arr
    },
    addDate(date, n) {
      date.setDate(date.getDate() + n)
      return date
    },
    formatDate(date) {
      var year = date.getFullYear() + '-'
      var month = date.getMonth() + 1 //+ '月';
      var day = date.getDate() //+ '日';
      if (month < 10) {
        month = `0${month}-`
      } else {
        month = `${month}-`
      }
      if (day < 10) {
        day = `0${day}`
      } else {
        day = `${day}`
      }
      console.log(`${year}${month}${day}`)
      return year + month + day
    }, //获取时间对象返回上周7天的日期、本周7天的日期、下周七天的日期

    getTime() {
      let obj = {}
      obj.stateWeek = this.setDate(new Date()) //当前周7天的日期
      obj.nextWeek = this.setDate(this.addDate(currentFirstDate, 7)) //下一周七天的日期
      this.currentFirstDate = null //清空数据，不然出现变量污染，出现重复日期
      obj.stateWeek = this.setDate(new Date()) //当前周7天的日期
      obj.priveWeek = this.setDate(this.addDate(currentFirstDate, -7)) //上周七天的日期
      return obj
    }, //获取当前时间当前年的第几月的第几周
    getMonthWeek(Y, M, D) {
      var date = new Date(Y, parseInt(M) - 1, D),
        w = date.getDay(),
        d = date.getDate()
      if (w == 0) {
        w = 7
      }
      var config = {
        getMonth: date.getMonth() + 1,
        getYear: date.getFullYear(),
        getWeek: Math.ceil((d + 6 - w) / 7)
      }
      return `${config.getYear}${config.getMonth}${config.getWeek}`
    },
    lastWeek() {
      this.setDate(this.addDate(this.currentFirstDate, -7))
    },
    nextWeek() {
      this.setDate(this.addDate(this.currentFirstDate, 7))
    }
  }
}
</script>
<style lang="scss" scoped>
.el-button {
  padding: 8px 5px;
  height: 59px;
  vertical-align: middle;
}
.el-radio-group {
  flex: 1;
  display: flex;
}
.el-radio-button {
  flex: 1;
  ::v-deep .el-radio-button__inner {
    width: 100%;
    padding: 12px 12px;
  }
}
.date {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 3px;
}
.week {
  color: #a2a1a1;
}
.el-radio-button__orig-radio:checked + .el-radio-button__inner {
  .week {
    color: white;
  }
}
</style>