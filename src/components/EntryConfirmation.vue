<template>
    <div class="entry-confirmation">
        <div class="table-title">
            <h3>到岗候选人名单确认-{{this.sendTime | moment("YYYYMMDD")}}</h3>
        </div>
        <el-row>
            <el-col :span="24">
                <div class="grid-content btn-group">
                    <el-button size="mini" type="success" @click="handleBatchEntry()">批量已到岗</el-button>
                </div>
            </el-col>
        </el-row>
        <el-table v-if="data" v-loading.body="loading" element-loading-text="拼命加载中" ref="multipleTable" :data="data" border tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
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
            selected: [],
            sendTime: ''
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
            return this.$http.get(`/irpo/entryconfirm/getentryconfirm?${new Date().getTime()}`, { params }).then(result => {
                let data = result.data
                if (data.code == 501) {
                    this.$alert('已超7天有效期', '提示')
                    return
                }
                if (data.code == 600 || data.code == 500) {
                    this.$alert('链接失效', '提示')
                    return
                }
                this.data = data.data
                if (data.data && data.data.length > 0) {
                    this.sendTime = data.data[0].SendTime
                    // console.log('moment', this.$moment)
                    // console.log(this)
                }
                // console.log(this.data)
            })
        },
        loadDataLoading() {
            this.loading = true
            this.$http.all([this.loadData()]).then(_ => {
                this.loading = false
            })
        },
        handleEntry(index, row, isEntry) {
            let isEntryText = isEntry ? '已到岗' : '未到岗'
            return this.$http.post('/irpo/entryconfirm/setentryconfirm', {
                relIds: row.RelId,
                isEntry: isEntry,
                emailId: row.EmailId
            }).then(data => {
                this.$notify({
                    title: '保存成功',
                    message: `${row.Name}-已设置为：${isEntryText}`,
                    type: isEntry ? 'success' : 'warning'
                });
                this.loadDataLoading()
            })
        },
        handleBatchEntry() {
            if (this.selected.length <= 0) {
                this.$message({
                    message: '没有选择任何项',
                    type: 'warning'
                })
                return
            }
            let relIds = this.selected.map(item => item.RelId)
            return this.$http.post('/irpo/entryconfirm/setentryconfirm', {
                relIds: relIds.join(';'),
                isEntry: 1,
                emailId: this.emailId
            }).then(data => {
                this.$notify({
                    title: '成功',
                    message: '批量保存成功',
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
