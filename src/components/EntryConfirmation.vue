<template>
    <div class="entry-confirmation">
        <div class="table-title">
            <h3>到岗候选人名单确认</h3>
        </div>
        <el-row>
            <el-col :span="24">
                <div class="grid-content btn-group">
                    <el-button size="mini" type="success" @click="handleBatchEntry()">批量已到岗</el-button>
                </div>
            </el-col>
        </el-row>
        <el-table v-if="data" v-loading.body="loading" ref="multipleTable" :data="data" border tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column prop="Name" label="姓名" width="120">
                <!-- <template scope="scope">{{ scope.row.date }}</template> -->
            </el-table-column>
            <el-table-column prop="JobTitle" label="推荐岗位">
            </el-table-column>
            <el-table-column label="是否到岗" show-overflow-tooltip>
                <template scope="scope">
                    <el-button size="small" :type="scope.row.IsEntry==1?'success':'default'" @click="handleEntry(scope.$index, scope.row,1)">已到岗</el-button>
                    <el-button size="small" :type="scope.row.IsEntry==0?'danger':'default'" @click="handleEntry(scope.$index, scope.row,0)">未到岗</el-button>
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
            data: [],
            loading: false,
            selected: []
        }
    },
    computed: {
        emailId() {
            return this.$route.query.emailid
        }
    },
    methods: {
        handleSelectionChange(val) {
            // console.log(val)
            this.selected = val
        },
        loadData() {
            var params = {
                emailid: this.emailId
            }
            // console.log(this.$route.query.emailid)
            return this.$http.get('/irpo/entryconfirm/getentryconfirm', { params }).then(data => {
                this.data = data.data.data
                console.log(this.data)
            })
        },
        loadDataLoading() {
            this.loading = true
            this.$http.all([this.loadData()]).then(_ => {
                this.loading = false
            })
        },
        handleEntry(index, row, isEntry) {
            return this.$http.post('/irpo/entryconfirm/setentryconfirm', {
                relIds: row.RelId,
                isEntry: isEntry,
                emailId: row.EmailId
            }).then(data => {
                this.$message({
                    message: '保存成功-' + row.Name,
                    type: 'success'
                });
                this.loadDataLoading()
            })
        },
        handleBatchEntry() {
            if (this.selected.length <= 0) {
                this.$message({
                    message: '没有选择任何项',
                    type: 'warning'
                });
                return
            }
            let relIds = this.selected.map(item => item.RelId)
            console.log(relIds)
            return this.$http.post('/irpo/entryconfirm/setentryconfirm', {
                relIds: relIds.join(';'),
                isEntry: 1,
                emailId: this.emailId
            }).then(data => {
                this.$message({
                    message: '保存成功',
                    type: 'success'
                });
                this.loadDataLoading()
            })

        }
    },
    mounted() {
        this.loadDataLoading()
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
    .btn-group {
        padding: 10px 0;
    }
}
</style>
