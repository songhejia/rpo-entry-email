<template>
  <div class="delivery">
    <div class="table-title">
      <h3>客户确认函-交付明细</h3>
    </div>
    <el-table v-if="data" v-loading.body="loading" element-loading-text="拼命加载中" ref="multipleTable" :data="data" border tooltip-effect="dark" style="width: 100%">
      <el-table-column prop="Name" label="候选人" width="120">
      </el-table-column>
      <el-table-column prop="JobTitle" label="职位名称">
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  name: "delivery",
  data() {
    return {
      data: [],
      loading: false,
      selected: [],
      sendTime: ""
    };
  },
  methods: {
    getDelivery() {
      var params = {
        projectid: this.$route.query.projectid,
        startdate: this.$route.query.startdate,
        enddate: this.$route.query.enddate,
        senddate: this.$route.query.senddate,
        token: this.$route.query.token
      };
      this.loading = true;
      return this.$http
        .get(`/irpo/entryconfirm/GetDelivery?${new Date().getTime()}`, {
          params
        })
        .then(result => {
          let data = result.data;
          if (data.code == 500) {
            this.$alert("链接失效", "提示");
            return;
          }
          this.data = data.data;
          this.loading = false;
        });
    }
  },
  mounted() {
    console.log("mounted");
    this.getDelivery();
  }
};
</script>
<style lang="scss">
.delivery {
  .table-title {
    h3 {
      margin: 20px 0;
    }
  }
}
</style>


