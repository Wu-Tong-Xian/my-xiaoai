<template>
  <div>
    <el-tabs :tab-position="tabPosition" style="height: 200px;">
      <el-tab-pane label="未读信息 " @click="filt(1)">
        <div v-for="(item,index) in filt(1) " :key="index" class="box">
          <div>{{item.name}}</div>
          <div>
            <div>
              {{item.time}}
             <el-button slot="reference" class="flag" @click='flag(item)'>标为已读</el-button>
            </div>
          </div>
        </div>
        <!-- 点击之后全部放载已读 -->
        <div v-if="this.filt(1).length === 0 " >暂无数据</div>
        <div v-else ><el-button slot="reference" class="flag1" @click='flag1'>全部标为已读</el-button></div>
      </el-tab-pane>

      <el-tab-pane label="已读信息" @click="filt1(2)">
        <div v-for="(item,index) in filt(2) " :key="index" class="box">
          <div>{{item.name}}</div>
          <div>
            <div>
              {{item.time}}
              <el-button slot="reference" class="del" @click='del(item)' >删除</el-button>
            </div>
          </div>
        </div>
        <!-- 点击之后全部放在回收站 -->
        <div v-if="this.filt(2).length ===0" > 暂无数据</div>
        <div v-else > <el-button slot="reference" class="del1" @click="del1" >全部删除</el-button></div>
      </el-tab-pane>

      <el-tab-pane label="回收站" @click="filt(3)">
        <div v-for="(item,index) in filt(3) " :key="index" class="box">
          <div>{{item.name}}</div>
          <div>
            <div>
              {{item.time}}
              <el-button slot="reference" class="restore" @click='restore(item)' >还原</el-button>
            </div>
          </div>
        </div>
        <div v-if="this.filt(3).length===0"> 暂无数据 </div>
        <div v-else ><el-button slot="reference" class="restore1" @click='restore1()'>清空回收站</el-button> </div>
      </el-tab-pane>
      <!-- <el-tab-pane label="定时任务补偿">定时任务补偿</el-tab-pane> -->
    </el-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tabPosition: "",
      arr: [
        { name: "发红包了", time: "2019-12-13 12:02:45", falg: 1 },
        { name: "成都", time: "2019-12-13 12:02:45", falg: 1 },
        { name: "喜欢你", time: "2019-12-13 12:02:45", falg: 1 },
        { name: "南山南", time: "2019-12-13 12:02:45", falg: 2 },
        { name: "冷雨夜", time: "2019-12-13 12:02:45", falg: 2 },
        { name: "红包已过期", time: "2019-12-13 12:02:45", falg: 3 }
      ]
    };
  },
  components: {},
  methods: {
  
    // 点击谁就把未读标为已读的    未读页面的两个方法
    flag(item){
      item.falg =2
    },
    // 把未读的  全部标为已读的 并在已读去掉放在未读方法
    flag1(){
     this.arr.map(item=>{
       if(item.falg ===1){
         item.falg =2
       }
     })
    },

      // 删除，点击谁就把已读放在回收站的方法  已读页面的两个方法
    del(item){
      item.falg =3
    },
 // 把已读的  全部放在回收站方法  
    del1(){
     this.arr.map(item=>{
       if(item.falg ===2){
         item.falg =3
       }
     })
    },

    // 点击谁就把已回收站的放在已读的方法  回收站页面的两个方法
    restore(item){
      item.falg =2
    },

// 把在回收站的 全部删除方法
    restore1(){
     this.arr= this.arr.filter(item=>{
        return item.falg !==3
      })
    },

    
    // 通过filter过滤出每一项中falg===我传的参数 在返回这个方法
    filt(n) {
      return this.arr.filter(item => {
        return item.falg === n;
      });
    },
    handleClick(tab, event) {
      console.log(tab, event);
    }
  },
  mounted() {
    this.filt(1);
  },
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
.box {
  display: flex;
  justify-content: space-between;
  margin: 20px 30px 10px 20px;
}
.flag {
  background: rgb(74, 134, 212);
  color:beige;
}
.flag1 {
  background: rgb(74, 134, 212);
  color:beige;
}

.del1 {
   background: rgb(209, 38, 81);
   color:beige;
}
.restore {
  background: rgb(243, 219, 4)
}
.restore1 {
  background: rgb(200, 216, 213)
}
</style>