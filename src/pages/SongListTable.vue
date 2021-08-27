<template>

  <div>

    <div>
      <el-row>

        <el-col :span="3">
          <el-input v-model="searchOne" placeholder="歌单名搜索" align="right"></el-input>
        </el-col>

        <el-col :span="2" :offset="19">
          <el-button type="success" icon="el-icon-circle-plus-outline" @click="centerDialogVisible = true">添加歌单
          </el-button>
        </el-col>

      </el-row>


    </div>

    <div>
      <el-table :data="data" border style="width: 100%" height="500px">

        <el-table-column
          label="歌单名" prop="title" align="center" width="170px"
        ></el-table-column>

        <el-table-column
          label="歌单图片" prop="pic" align="center" width="150px" height="100px"
        >

          <template slot-scope="scope">
            <div class="singer-img">
              <img :src="getUrl(scope.row.pic)" style=" width:100%"/>
            </div>
            <el-upload :action="uploadUrl(scope.row.id)" :before-upload="beforeAvatorUpload"
                       :on-success="handleAvatorSuccess">
              <el-button size="mini">更新图片</el-button>
            </el-upload>
          </template>
        </el-table-column>


        <el-table-column
          label="歌单信息" prop="introduction" align="center" width="450px"
        ></el-table-column>

        <el-table-column
          label="歌单风格" align="center" width="100px"
        >
          <template slot-scope="scope">
            {{ computedName(scope.row.typeId) }}
          </template>

        </el-table-column>


        <el-table-column
          align="center" label="操作">

          <template slot-scope="scope">

            <el-button
              size="mini"
              type="primary"
              @click="openSongofTable(scope.row)">添加歌曲进入此歌单
            </el-button>

            <el-button
              size="mini"
              type="warning"
              @click="openEditTable(scope.row)"
            >
              编辑歌单
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


      <!--      添加歌曲进入歌单-->
      <el-dialog title="添加歌曲进入歌单" :visible.sync="tableDialogVisible" width="400px" center>
        <el-form :model="addSongOfTable" ref="dataTable" label-width="80px">


          <el-form-item prop="songId" label="歌曲名" size="mini">
            <el-select placeholder="歌曲名" v-model="addSongOfTable.songId">
              <el-option
                v-for="item in songs"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>


        </el-form>
        <span slot="footer">
                <el-button size="mini" @click="tableDialogVisible = false">取消</el-button>
                <el-button size="mini" @click="addSongOne">确定</el-button>

            </span>
      </el-dialog>

      <!--      添加歌单-->
      <el-dialog title="添加歌单" :visible.sync="centerDialogVisible" width="400px" center>
        <el-form :model="dataTable" ref="dataTable" label-width="80px">

          <el-form-item prop="lyric" label="歌单名" size="mini">
            <el-input v-model="dataTable.title" placeholder="歌单名" type="textarea"></el-input>
          </el-form-item>

          <el-form-item prop="lyric" label="歌单信息" size="mini">
            <el-input v-model="dataTable.introduction" placeholder="歌单信息" type="textarea"></el-input>
          </el-form-item>

          <el-form-item prop="singerId" label="歌单风格" size="mini">
            <el-select placeholder="歌单风格" v-model="dataTable.typeId">
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
                <el-button size="mini" @click="centerDialogVisible = false">取消</el-button>
                <el-button size="mini" @click="addSong">确定</el-button>

            </span>
      </el-dialog>
      <!--      编辑信息-->
      <el-dialog title="编辑歌手信息" :visible.sync="editorTable" width="400px" center>
        <el-form :model="editortable" ref="editortable" label-width="80px">


          <el-form-item prop="title" label="歌单名" size="mini">
            <el-input v-model="editortable.title" placeholder="歌单名" type="textarea"></el-input>
          </el-form-item>

          <el-form-item prop="introduction" label="歌单信息" size="mini">
            <el-input v-model="editortable.introduction" placeholder="歌单信息" type="textarea"></el-input>
          </el-form-item>

          <el-form-item prop="typeId" label="歌单风格" size="mini">
            <el-select placeholder="歌单风格" v-model="editortable.typeId">
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
                <el-button size="mini" @click="savaSongList">确定</el-button>

            </span>
      </el-dialog>
    </div>


  </div>


</template>

<script>

import {
  getAllType,
  getSongListTable,
  addSongList,
  deleteSongList,
  updateSongList,
  getSongTable,
  addListSong
} from '../api/index'
import {mixin} from '../mixins/index'

export default {
  mixins: [mixin],
  data () {
    return {
      centerDialogVisible: false,
      editorTable: false,
      tableDialogVisible: false,
      options: [],
      songs: [],
      singername: '',
      singernames: [],
      songList: [],
      addSongOfTable: {
        songId: '',
        songListId: ''
      },
      dataTable: {
        title: '',
        pic: '',
        introduction: '',
        typeId: ''
      },
      editortable: {
        id: '',
        title: '',
        introduction: '',
        typeId: ''
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
      getSongListTable().then(res => {
        this.tableDataOne = res
      })
    },
    //添加歌手
    addSong () {
      let data = new FormData()
      data.append('title', this.dataTable.title)
      data.append('introduction', this.dataTable.introduction)
      data.append('typeId', this.dataTable.typeId)
      addSongList(data).then(res => {
        if (res.code == 1) {
          this.Flush()
          this.notify('添加成功', 'success')
        } else {
          this.notify('添加失败', 'error')
        }
      })
      this.centerDialogVisible = false
    },
    openSongofTable (row) {
      this.tableDialogVisible = true
      this.addSongOfTable.songListId = row.id
    },
    addSongOne () {
      let data = new FormData()
      data.append("songListId",this.addSongOfTable.songListId)
      data.append("songId",this.addSongOfTable.songId)
      addListSong(data).then(res=>{
        if (res.code == 1) {
          this.notify('添加成功', 'success')
          this.tableDialogVisible = false
        } else {
          this.notify(res.msg, 'error')
        }
      })


    },
    openEditTable (row) {
      this.editorTable = true
      this.editortable = {
        id: row.id,
        title: row.title,
        introduction: row.introduction,
        typeId: row.typeId,
        pic: row.pic
      }
    },
    savaSongList () {
      let data = new FormData()
      data.append('id', this.editortable.id)
      data.append('title', this.editortable.title)
      data.append('introduction', this.editortable.introduction)
      data.append('typeId', this.editortable.typeId)
      updateSongList(data)
        .then(res => {
          if (res.code == 1) {
            this.Flush()
            this.currentPage = cur
            this.notify('修改成功', 'success')
          } else {
            this.notify('修改失败', 'error')
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

      deleteSongList(row.id)
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
      return `${this.$store.state.HOST}/music/song-list/updateSongPic?id=${id}`
    }

  },
  created: function () {

    getSongListTable().then(res => {
      this.tableDataTwo = res
      this.tableDataOne = res
    })

    getSongTable().then(res => {
      for (let item of res) {

        let jsonAry = {
          id: item.id,
          name: item.name
        }
        this.songs.push(jsonAry)
      }
    })

    getAllType().then(res => {

        for (let item of res) {

          let jsonAry = {
            id: item.id,
            name: item.type
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
          console.log(item)
          if (item.title.includes(this.searchOne)) {
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
