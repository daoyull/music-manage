<template>

  <div>

    <div>
      <el-row>

        <el-col :span="3">
          <el-input v-model="searchOne" placeholder="姓名搜索" align="right"></el-input>
        </el-col>

        <el-col :span="2" :offset="19">
          <el-button type="success" icon="el-icon-circle-plus-outline" @click="centerDialogVisible = true">添加歌手
          </el-button>
        </el-col>

      </el-row>


    </div>

    <div>
      <el-table :data="data" border style="width: 100%" height="500px">

        <el-table-column
          label="歌手姓名" prop="name" align="center" width="150px"
        ></el-table-column>

        <el-table-column
          label="歌手图片" prop="pic" align="center" width="150px" height="100px"
        >

          <template slot-scope="scope">
            <div class="singer-img">
              <img :src="getUrl(scope.row.pic)" style="width:100%"/>
            </div>
            <el-upload :action="uploadUrl(scope.row.id)" :before-upload="beforeAvatorUpload"
                       :on-success="handleAvatorSuccess">
              <el-button size="mini">更新图片</el-button>
            </el-upload>
          </template>
        </el-table-column>

        <el-table-column
          label="性别" prop="sex" align="center" width="75px"
        >
          <template slot-scope="scope">
            {{ changeSex(scope.row.sex) }}
          </template>

        </el-table-column>

        <el-table-column
          label="出生日期" prop="birth" align="center" width="250px"
        >
          <template slot-scope="scope">
            {{ attachBirth(scope.row.birth) }}
          </template>

        </el-table-column>

        <el-table-column
          label="简介" prop="introduction" align="center"
        ></el-table-column>

        <el-table-column
          align="center" label="操作">

          <template slot-scope="scope">
            <el-button
              size="mini"


              @click="openEditTable(scope.row)"
            >
              <!--              @click="handleEdit(scope.$index, scope.row)"-->
              编辑
            </el-button>


            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        background
        layout="prev, pager, next"
        :current-page="currentPage"
        :page-size="pageSize"
        :total="tableDataOne.length"
        @current-change="changePage"
      >
      </el-pagination>

      <!--      添加歌手-->
      <el-dialog title="添加歌手" :visible.sync="centerDialogVisible" width="400px" center>
        <el-form :model="dataTable" ref="dataTable" label-width="80px">
          <el-form-item prop="name" label="歌手名" size="mini">
            <el-input v-model="dataTable.name" placeholder="歌手名"></el-input>
          </el-form-item>
          <el-form-item label="性别" size="mini">
            <el-radio-group v-model="dataTable.sex">
              <el-radio :label="0">女</el-radio>
              <el-radio :label="1">男</el-radio>
              <el-radio :label="2">组合</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item prop="birth" label="生日" size="mini">
            <el-date-picker type="date" placeholder="选择日期" v-model="dataTable.birth"
                            style="width:100%"></el-date-picker>
          </el-form-item>

          <el-form-item prop="introduction" label="简介" size="mini">
            <el-input v-model="dataTable.introduction" placeholder="简介" type="textarea"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer">
                <el-button size="mini" @click="centerDialogVisible = false">取消</el-button>
                <el-button size="mini" @click="addSinger">确定</el-button>

            </span>
      </el-dialog>
      <!--      编辑信息-->
      <el-dialog title="编辑歌手信息" :visible.sync="editorTable" width="400px" center>
        <el-form :model="editortable" ref="editortable" label-width="80px">
          <el-form-item prop="name" label="歌手名" size="mini">
            <el-input v-model="editortable.name" placeholder="歌手名"></el-input>
          </el-form-item>
          <el-form-item label="性别" size="mini">
            <el-radio-group v-model="editortable.sex">
              <el-radio :label="0">女</el-radio>
              <el-radio :label="1">男</el-radio>
              <el-radio :label="2">组合</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item prop="birth" label="生日" size="mini">
            <el-date-picker type="date" placeholder="选择日期" v-model="editortable.birth"
                            style="width:100%"></el-date-picker>
          </el-form-item>

          <el-form-item prop="introduction" label="简介" size="mini">
            <el-input v-model="editortable.introduction" placeholder="简介" type="textarea"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer">
                <el-button size="mini" @click="editorTable = false">取消</el-button>
                <el-button size="mini" @click="savaSinger">确定</el-button>

            </span>
      </el-dialog>
    </div>


  </div>


</template>

<script>

import {addSinger, deleteSinger, getAllSinger, updateSinger} from '../api/index'
import {mixin} from '../mixins/index'

export default {
  mixins: [mixin],
  data () {
    return {
      centerDialogVisible: false,
      editorTable: false,
      dataTable: {
        name: '',
        sex: [{
          0: '男',
          1: '女',
          2: '组合'
        }
        ],
        birth: '',
        introduction: ''
      },
      editortable: {
        name: '',
        sex: [{
          0: '男',
          1: '女',
          2: '组合'
        }
        ],
        birth: '',
        introduction: ''
      },
      tableDataOne: [],
      tableDataTwo: [],
      searchOne: '',
      pageSize: 3,
      currentPage: 1,

    }
  },
  methods: {
    Flush () {
      this.tableDataOne = []
      getAllSinger().then(res => {
        this.tableDataOne = res
      })
    },
    //添加歌手
    addSinger () {
      addSinger(JSON.stringify(this.dataTable))
        .then(res => {
          if (res.code == 1) {
            this.Flush()
            this.notify('添加成功', 'success')
          } else {
            this.notify('添加失败', 'error')
          }
        })
        .catch(err => {
          console.log(err)
        })
      this.centerDialogVisible = false
    },
    openEditTable (row) {
      this.editorTable = true
      this.editortable = {
        id: row.id,
        name: row.name,
        sex: row.sex,
        birth: row.birth,
        introduction: row.introduction
      }
    },
    savaSinger () {
      console.log(this.editortable)
      updateSinger(JSON.stringify(this.editortable))
        .then(res => {
          if (res.code == 1) {
            this.Flush()
            this.notify('修改成功', 'success')
          } else {
            this.notify('修改失败', 'error')
          }
        })
    },
    changePage (val) {
      this.currentPage = val
    },
    handleEdit (index, row) {
      console.log(index, row)
    },
    handleDelete (index, row) {

      deleteSinger(row.id)
        .then(result => {
          if (result.code == 1) {
            this.Flush()
            this.notify('删除成功', 'success')
          } else {
            this.notify('删除成功', 'error')
          }
        })

    },
    uploadUrl
      (id) {
      return `${this.$store.state.HOST}/music/singer/updateSingerPic?id=${id}`
    }

  },
  created () {
    getAllSinger().then(res => {
      this.tableDataOne = res
      this.tableDataTwo = res

    })
  },
  watch: {
    searchOne: function () {
      if (this.searchOne == '') {
        this.tableDataOne = this.tableDataTwo
      } else {
        this.tableDataOne = []
        for (let item of this.tableDataTwo) {
          if (item.name.includes(this.searchOne)) {
            this.tableDataOne.push(item)
          }
        }
      }
    }
  },
  computed: {
    //计算当前搜索结果表里的数据
    data () {

      return this.tableDataOne.slice((this.currentPage - 1) * this.pageSize, (this.currentPage - 1) * this.pageSize + this.pageSize)
    }
  }

}
</script>

<style scoped>

</style>
