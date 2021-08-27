<template>

  <div>

    <div>
      <el-row>

        <el-col :span="3">
          <el-input v-model="searchOne" placeholder="姓名搜索" align="right"></el-input>
        </el-col>
      </el-row>


    </div>

    <div>
      <el-table :data="data" border style="width: 100%" height="500px">

        <el-table-column
          label="用户名" prop="username" align="center" width="100px"
        ></el-table-column>

        <el-table-column
          label="用户头像" prop="avator" align="center" width="130px" height="80px"
        >
          <template slot-scope="scope">
            <div>
              <img :src="getUrl(scope.row.avator)" style="width:100%"/>
            </div>
            <el-upload :action="uploadUrl(scope.row.id)" :before-upload="beforeAvatorUpload"
                       :on-success="handleAvatorSuccess">
              <el-button size="mini">更新图片</el-button>
            </el-upload>
          </template>
        </el-table-column>


        <el-table-column
          label="性别" align="center" prop="sex" width="60px"
        >
          <template slot-scope="scope">
            {{ changeSex(scope.row.sex) }}
          </template>
        </el-table-column>

        <el-table-column
          label="出生日期" prop="birth" align="center" width="150px"

        >

        </el-table-column>

        <el-table-column
          label="手机号" prop="phoneNum" align="center" width="150px"
        ></el-table-column>


        <el-table-column
          label="邮箱" prop="email" align="center" width="150px"
        ></el-table-column>


        <el-table-column
          label="个人介绍" prop="introduction" align="center"
        ></el-table-column>


        <el-table-column
          align="center" label="操作" width="150px">

          <template slot-scope="scope">
            <el-button
              size="mini"
              type="warning"
              @click="openEditTable(scope.row)">
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


      <!--      编辑信息-->
      <el-dialog title="编辑用户信息" :visible.sync="editorTable" width="400px" center>
        <el-form :model="editortable" ref="editortable" label-width="80px">


          <el-form-item prop="username" label="姓名" size="mini">
            <el-input v-model="editortable.username" placeholder="姓名" type="textarea"></el-input>
          </el-form-item>

          <el-form-item prop="sex" label="性别" size="mini">
            <el-radio-group v-model="editortable.sex">
              <el-radio :label="0">女</el-radio>
              <el-radio :label="1">男</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item prop="phoneNum" label="手机号" size="mini">
            <el-input v-model="editortable.phoneNum" placeholder="手机号" ></el-input>
          </el-form-item>

          <el-form-item prop="email" label="邮箱" size="mini">
            <el-input v-model="editortable.email" placeholder="邮箱" ></el-input>
          </el-form-item>

          <el-form-item prop="birth" label="生日" size="mini">
            <el-date-picker type="date" placeholder="选择日期" v-model="editortable.birth"
                            value-format="yyyy-MM-dd"
                            style="width:100%"></el-date-picker>
          </el-form-item>

          <el-form-item prop="introduction" label="个人介绍" size="mini">
            <el-input v-model="editortable.introduction" placeholder="个人介绍" ></el-input>
          </el-form-item>



        </el-form>
        <span slot="footer">

                <el-button size="mini" @click="editorTable = false">取消</el-button>
                <el-button size="mini" @click="savaUser">确定</el-button>
            </span>
      </el-dialog>
    </div>


  </div>


</template>

<script>

import {
  getAllUser,
  updateUser,
  deleteUser
} from '../api/index'
import {mixin} from '../mixins/index'

export default {
  mixins: [mixin],
  data () {
    return {
      editorTable: false,
      editortable: {
        id: '',
        username: '',
        sex: '',
        phoneNum: '',
        email: '',
        birth: '',
        introduction: ''
      },
      tableDataOne: [],
      tableDataTwo: [],
      searchOne: '',
      pageSize: 3,
      currentPage: 1,
      currentFile: [],
    }
  },
  methods: {
    Flush () {
      this.tableDataOne = []
      getAllUser().then(res => {
        this.tableDataOne = res
      })
    },

    openEditTable (row) {
      this.editorTable = true
      this.editortable = {
        id: row.id,
        username: row.username,
        sex: row.sex,
        phoneNum: row.phoneNum,
        email: row.email,
        birth: row.birth,
        introduction: row.introduction
      }
    },
    savaUser () {

      let data = new FormData();
      data.append("id",this.editortable.id)
      data.append("username",this.editortable.username)
      data.append("sex",this.editortable.sex)
      data.append("phoneNum",this.editortable.phoneNum)
      data.append("email",this.editortable.email)
      data.append("birth",this.editortable.birth)
      data.append("introduction",this.editortable.introduction)

      updateUser(data)
        .then(res => {
          if (res.code == 1) {
            this.Flush()
            this.notify(res.msg, 'success')
          } else {
            this.notify(res.msg, 'error')
          }
        })
      this.editorTable = false

    },
    changePage (val) {
      this.currentPage = val
    },
    handleEdit (index, row) {
      console.log(index, row)
    },
    handleDelete (index, row) {

      deleteUser(row.id)
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
      return `${this.$store.state.HOST}/music/consumer/updateSongPic?id=${id}`
    }

  },
  created: function () {
    getAllUser().then(res => {
      this.tableDataTwo = res
      this.tableDataOne = res

    })

  },
  watch: {
    searchOne: function () {
      if (this.searchOne == '') {
        this.tableDataOne = this.tableDataTwo
      } else {
        this.tableDataOne = []
        for (let item of this.tableDataTwo) {
          if (item.username.includes(this.searchOne)) {
            this.tableDataOne.push(item)
          }
        }
      }
    }
  }
  ,
  computed: {
    //计算当前搜索结果表里的数据
    data () {
      return this.tableDataOne.slice((this.currentPage - 1) * this.pageSize, (this.currentPage - 1) * this.pageSize + this.pageSize)
    },
  }
}
</script>

<style scoped>

</style>
