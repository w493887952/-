<template>

<div class="search">
  <top :goBack="goBack"></top>
  <div class="aaa">
  <scroll ref="scroll" class="aaa-content" >
        <div class="box2">
  <div class="searchBox" @click="searchCity">
      <i class="iconfont">&#xe611;</i><input placeholder="添加城市/景区" type="text">
  </div>

  <div class="hot public">
      <p class="public2 rm">热门城市</p>
      <p @click="location" class="location">定位</p>
      <ul class="clearfix">
          
          <li v-for="item in getHots" :key="item.cid" :id='item.cid'  @click='sendCity($event)'>{{item.parent_city}}</li>
      </ul>
  </div>

  <div class="history public" >
       <p>
         <span class="public2">历史记录</span>
         <i class="public2 iconfont" v-show="searchHistory.length" @click="deleteAll" >&#xe60c;</i>
       </p>
       <ul v-show="searchHistory.length">
           <li @click="acquireCity($event)" v-for="(item,index ) in searchHistory" :key="index">{{item}}</li>
       </ul>
       <em class="public2" @click="deleteAll" v-show="searchHistory.length">清空历史记录</em>
  </div>

  



        </div>
  </scroll>
  </div>
  </div>


</template>

<script>
import axios from 'axios'
import {mapMutations, mapGetters, mapActions} from 'vuex'
import Scroll from 'base/scroll/scroll'

import top from 'components/top'

export default {
    
  data(){
    return {
       
            goBack:'&#xe605;',
            getHots:[],
            
    }
  },


  components: {
    top,
    Scroll
  },
  methods:{
      deleteAll () {
      this.clearSearchHistory()
  },


  acquireCity(e){
     //const hzw = e.target.innerHTML
         // console.log(hzw)
    this.setCityCode(e.target.innerHTML)
    this.$router.push('/')

  },

    searchCity () {
    this.$router.push('/searchCity')
       },
       getHot () {
         axios.get("https://search.heweather.net/top?group=cn&number=10&key=f49c2a48193644129bf2aa3c5c782296")
         .then((response) => {
           //console.log(response.data.HeWeather6[0].basic);
           this.getHots = response.data.HeWeather6[0].basic;
            
         })
         .catch((error) => {
           console.log(error);
         })
       },

    location(){
        this.setCityCode('auto_ip')
        this.$router.push('/')
    },

     sendCity (event) {
          //console.log(event.currentTarget.getAttribute("id")); // event.currentTarget获取当前点击元素cid
          const wyn = event.currentTarget.getAttribute("id");
         // console.log(wyn);
           this.setCityCode(wyn) //传值到vuex
           this.$router.push('/')
        },
        
        ...mapMutations({
          setCityCode: 'SET_CITYCODE'
        })
    },

      computed: {
    ...mapGetters([
      'searchHistory',
    ]),
    ...mapActions([
      'clearSearchHistory'
    ])
  },
    mounted () {
      this.getHot ()
     
    },
    
 
  
}
</script>

<style lang="scss" scoped>
    .search{
      .clearfix{
            
              li:nth-child(1){
                margin-left: 37%;
              
            }
          }
      .searchBox{
          width: 90%;
          height: 40px;
          background: rgba(0,0,0,0.3);
          opacity: 0.6;
          margin:15px auto 30px;
          border-radius: 50px;
          display: flex;
          align-items: center;
          i{
              padding: 15px;
          }
          input{
            background: none;
            color: #fff;
            border: none;
          }
          input::-webkit-input-placeholder {
            color: #fff;
            font-size: 15px;
    }
      }
      .public{
           width: 100%;
            margin: auto;
            height: auto;
            .location{
              width: 25%;
              height: 33px;
              border: 1px solid rgba(255, 255, 255, 0.4);
              line-height: 33px;
              text-align: center;
              border-radius: 50px;
              font-size: 18px;
              opacity: 0.5;
              margin-left: 5.8%;
              position: relative;
              top: 50px;
            }
          
      }
      .history{
          margin: 40px auto 30px;

          p{
              display: flex;
              justify-content: space-between;
              margin-left: 5.8%;
          }  
          i{
            margin-right: 5.8%;
          }     
      }
    ul{ 
      overflow: hidden;
        li{
            width: 25%;
            height: 33px;
            border: 1px solid rgba(255,255,255,0.4);
            line-height: 33px;
            text-align: center;
            border-radius: 50px;
            font-size: 18px;
            opacity: 0.9;
            margin-top: 15px;
            float: left;
            margin-left: 5.8%;
            overflow:hidden;
            text-overflow:ellipsis;
            white-space:nowrap; 
        }
      }
      .public2{
          font-size: 16px;
          opacity: 0.6;
      }
      em{
        display: block;
        width: 100%;
        text-align: center;
        margin-top: 18px;

      }
      .rm{margin-left: 5.8%}
      .box2{
        height: 102%;
      }
    }
   .aaa{
        position: fixed;
        width: 100%;
        top: 40px;
        bottom: 0;
   }
    
    .aaa-content{
        height: 100%;
        overflow: hidden;
    }
      
</style>