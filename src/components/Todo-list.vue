<template>
  <div>
    <div class="head1">
      <div class="head2" @click="clickitem" :v-model="checkbox">选中</div>
      <div class="box1">Todo List</div>
    </div>
    <div class="center">
      <div v-for="(item) in arr" :key="item.id" class="center1">
        <div>
          <input type="checkbox" v-model="item.checked" class="center-left" />
          {{item.name}}
        </div>
        <!-- 删除功能 -->
        <div class="center-right" @click="del(item)">X</div>
      </div>
    </div>
    <div class="buttom">
      <div>{{arr.length}} item left</div>
      <!-- 点击之后还存在的所有状态都显示 -->
      <div @click="click1">All</div>
      <!-- 点击之后所有选中的拉出来 -->
      <div @click="click2">Active</div>
      <!-- 点击之后所有没选中的拉出来 -->
      <div @click="click3">Completed</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      checkbox: false,
      arr: [
        {
          name: "star this repository",
          checked: false
        },
        {
          name: "fork this repository",
          checked: false
        },
        {
          name: "follow author",
          checked: false
        },
        {
          name: "vue-admin",
          checked: false
        },
        {
          name: "vue",
          checked: false
        },
        {
          name: "element-ui",
          checked: false
        },
        {
          name: "axios",
          checked: true
        },
        {
          name: "webpack",
          checked: true
        }
      ],
      arr1:[]
    };
  },
  components: {},
  methods: {
    clickitem() {
      // 点击之后改变checkbox为相反的状态
      this.checkbox = !this.checkbox;
      // map循环通过v-model改变其他所有状态跟他一样
      this.arr.map(item => {
        // 全选和全部选
        item.checked = this.checkbox;
        // 全选和反选  需要把上面checkbox为相反状态去掉
      // item.checked = ! item.checked
      });
    },
    click1() {
     this.arr= this.arr1.filter(item=>{
        return item
      })
    },
    click2() {
       this.arr = this.arr1.filter(item=>{
        return item.checked===true
      })
    },
    click3() {
      this.arr = this.arr1.filter(item=>{
        return item.checked===false
      })
    },
    del(n){
      this.arr=this.arr.filter(item=>{
        return item !=n
      })
    }
  },
  mounted() {
    this.arr1 = this.arr
  },
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
.head1 {
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
}
.head2 {
  margin-left: 30px;
}
.box1 {
  font-weight: 700;
  margin-right: 30px;
}
.center1 {
  display: flex;
  justify-content: space-between;
  font-size: 16px;
  margin-top: 20px;
}
.center-left {
  margin-left: 30px;
}
.center-right {
  margin-right: 30px;
}
.buttom {
  display: flex;
  justify-content: space-between;
  margin: 20px 30px 0 30px;
}
</style>