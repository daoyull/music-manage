<template>

  <div>

    <div>
      <el-row>

        <el-col :span="3">
          <el-input v-model="searchOne" placeholder="姓名搜索" align="right"></el-input>
        </el-col>

        <el-col :span="2" :offset="19">
          <el-button type="success" icon="el-icon-circle-plus-outline" @click="centerDialogVisible = true">添加歌曲
          </el-button>
        </el-col>

      </el-row>


    </div>

    <div>
      <el-table :data="data" border style="width: 100%" height="500px">

        <el-table-column
          label="歌名" prop="name" align="center" width="150px"
        ></el-table-column>

        <el-table-column
          label="歌曲图片" prop="pic" align="center" width="150px" height="100px"
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
          label="歌手" align="center" width="100px"
        >
          <template slot-scope="scope">
            {{ computedName(scope.row.singerId) }}
          </template>

        </el-table-column>

        <el-table-column
          label="专辑" prop="album" align="center" width="150px"
        ></el-table-column>


        <el-table-column
          label="歌词" prop="lyric" align="center" show-overflow-tooltip
        ></el-table-column>


        <el-table-column
          align="center" label="操作">

          <template slot-scope="scope">
            <el-button
              size="mini"


              @click="openEditTable(scope.row)"
            >

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
      <el-dialog title="添加歌曲" :visible.sync="centerDialogVisible" width="400px" center>
        <el-form :model="dataTable" ref="dataTable" label-width="80px">

          <el-form-item prop="lyric" label="歌词" size="mini">
            <el-input v-model="dataTable.lyric" placeholder="歌词" type="textarea"></el-input>
          </el-form-item>

          <el-form-item prop="lyric" label="专辑" size="mini">
            <el-input v-model="dataTable.album" placeholder="专辑" type="textarea"></el-input>
          </el-form-item>

          <el-form-item prop="singerId" label="歌手" size="mini">
            <el-select placeholder="请选择演唱歌手" v-model="dataTable.singerID">
              <el-option
                v-for="item in options"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="上传歌曲" prop="file">
            <el-upload
              action=""
              :on-change="getFile">
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
          </el-form-item>


        </el-form>
        <span slot="footer">
                <el-button size="mini" @click="centerDialogVisible = false">取消</el-button>
                <el-button size="mini" @click="addSong">确定</el-button>

            </span>
      </el-dialog>
      <!--      编辑信息-->
      <el-dialog title="编辑歌手信息" :visible.sync="editorTable" width="400px" center>
        <el-form :model="editortable" ref="editortable" label-width="80px">


          <el-form-item prop="lyric" label="歌词" size="mini">
            <el-input v-model="editortable.lyric" placeholder="歌词" type="textarea"></el-input>
          </el-form-item>

          <el-form-item prop="lyric" label="专辑" size="mini">
            <el-input v-model="editortable.album" placeholder="专辑" type="textarea"></el-input>
          </el-form-item>

          <el-form-item prop="singerId" label="歌手" size="mini">
            <el-select placeholder="请选择演唱歌手" v-model="editortable.singerID">
              <el-option
                v-for="item in options"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
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

import {
  addSong,
  deleteSong,
  getAllSinger,
  getSongTable,
  updateSong,
} from '../api/index'
import {mixin} from '../mixins/index'

export default {
  mixins: [mixin],
  data () {
    return {
      centerDialogVisible: false,
      editorTable: false,
      options: [],
      singername: '',
      singernames: [],
      dataTable: {
        lyric: '',
        file: '',
        singerID: '',
        album: ''
      },
      editortable: {
        id: '',
        lyric: '',
        album: '',
        singerID: ''
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
    getFile (file) {
      this.currentFile = file.raw
    },
    Flush () {
      this.tableDataOne = []
      getSongTable().then(res => {
        this.tableDataOne = res
      })
    },
    //添加歌手
    addSong () {
      let data = new FormData()
      data.append('lyric', this.dataTable.lyric)
      data.append('file', this.currentFile)
      data.append('singerId', this.dataTable.singerID)
      data.append('album', this.dataTable.album)

      addSong(data).then(res => {
        if (res.code == 1) {
          this.Flush()
          this.notify('删除成功', 'success')
        } else {
          this.notify('删除成功', 'error')
        }
        get
      })
      this.centerDialogVisible = false
    },
    openEditTable (row) {
      this.editorTable = true
      this.editortable = {
        id: row.id,
        singerId:row.singerId,
        lyric: row.lyric,
        album: row.album,

      }
    },
    savaSinger () {
      let data = new FormData()
      data.append('lyric', this.editortable.lyric)
      data.append('singerId', this.editortable.singerID)
      data.append('album', this.editortable.album)
      data.append('id', this.editortable.id)
      console.log(JSON.stringify(this.editortable))
      updateSong(data)
        .then(res => {
          if (res.code == 1) {
            this.Flush()
            this.notify('修改成功', 'success')
          } else {
            this.notify('修改失败', 'error')
          }
        })
      this.editorTable=false

    },
    changePage (val) {
      this.currentPage = val
    },
    handleEdit (index, row) {
      console.log(index, row)
    },
    handleDelete (index, row) {

      deleteSong(row.id)
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
      return `${this.$store.state.HOST}/music/song/updateSongPic?id=${id}`
    }

  },
  created: function () {
    getSongTable().then(res => {

      this.tableDataTwo = res
      this.tableDataOne = res

    })

    getAllSinger().then(res => {

        for (let item of res) {

          let jsonAry = {
            id: item.id,
            name: item.name
          }
          this.options.push(jsonAry)
        }
      }
    )
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
  }
  ,
  computed: {
    //计算当前搜索结果表里的数据
    data () {

      return this.tableDataOne.slice((this.currentPage - 1) * this.pageSize, (this.currentPage - 1) * this.pageSize + this.pageSize)
    },

    computedName () {
      return function (id) {
        for (let item of this.options) {
          if (id == item.id) {
            return item.name
          }
        }
      }
    }

  }

}
</script>

<style scoped>

</style>
