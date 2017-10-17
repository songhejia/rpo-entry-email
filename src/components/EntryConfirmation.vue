<template>
    <div class="entry-confirmation">
        <div class="table-title">
            <h3>到岗候选人名单确认</h3>
        </div>
        <el-table v-if="data" ref="multipleTable" :data="data" border tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column prop="Name" label="姓名" width="120">
                <!-- <template scope="scope">{{ scope.row.date }}</template> -->
            </el-table-column>
            <el-table-column prop="JobTitle" label="推荐岗位">
            </el-table-column>
            <el-table-column label="是否到岗" show-overflow-tooltip>
                <template scope="scope">
                    <el-button size="small" type="success" @click="handleEdit(scope.$index, scope.row)">已到岗</el-button>
                    <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">未到岗</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
export default {
    name: 'entry-confirmation',
    data() {
        return {
            data: []
        }
    },
    methods: {
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        loadData() {
            var params = {
                emailid: this.$route.query.emailid
            }
            // console.log(this.$route.query.emailid)
            return this.$http.get('/irpo/entryconfirm/getentryconfirm', { params }).then(data => {
                this.data = data.data.data
                console.log(this.data)
            })
        }
    },
    mounted() {
        this.loadData()
    }
}
</script>
<style lang="scss">
.entry-confirmation {
    .table-title {
        h3 {
            margin: 20px 0;
        }
    }
}
</style>
