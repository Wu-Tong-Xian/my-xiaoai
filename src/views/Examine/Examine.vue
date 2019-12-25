<template>
  <div>
    <!-- 头部 -->
    <div class="public-top">
      <div>
        <el-button type="danger" size="mini" @click="goback">返回</el-button>
      </div>
    </div>
    <div>
      <div class="check-title">{{info.title}}</div>
      <div class="check-abstract">摘要:{{info.abstract}}</div>
      <div class="check-date">发布于:{{info.date}}</div>
      <mavon-editor
        v-model="info.text"
        :subfield="false"
        defaultOpen="preview"
        :toolbarsFlag="false"
        class="box-card"
      />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 存储传过来的文章id
      ids: "",
      // 存储本页的文章全部信息
      info: {}
    };
  },
  components: {},
  methods: {
    goback() {
      history.back();
    },
    getarticle() {
      // - 查看单个文章: /article/article
      // 根据从 bennoub传过来的id 获得对应的文章信息
      this.$axios
        .req("/article/article", { _id: this.ids })
        .then(res => {
          // 存储本页的文章全部信息
          this.info = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    // 获得从 bennoub传过来的id
    this.ids = this.$route.query.ids1;
    this.getarticle();
  },
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
.public-top {
  height: 34px;
  background: rgb(201, 255, 187);
  margin: 0 8px 30px;
  line-height: 30px;
  padding-left: 88%;
}
.check-title {
  width: 99%;
  margin: 5px auto;
  font-size: 28px;
  font-weight: 700;
  text-align: center;
}
.check-abstract {
  width: 99%;
  margin: 5px auto;
  font-weight: 500;
  text-align: center;
}
.check-date {
  width: 99%;
  margin: 5px auto;
  font-size: 12px;
  color: gray;
  text-align: center;
}
.check-text {
  line-height: 30px;
  padding: 5px;
}
</style>
