<template>
    <div class="searchCity">
        
            <top :goBack="goBack"></top>
            
            <div class="box">
                <div class="searchBox" >
                    <i class="iconfont">&#xe611;</i>
                    <input v-focus v-model="keyword" placeholder="添加城市/景区" type="text">
                </div>
                <em @click="Back">取消</em>
            </div>
            <div class="search-content">
                <ul v-for="item in city" :key="item.cid">
                    <li :id="item.cid" :cit="item.location" @select="saveSearch" @click="sendCity($event)">{{item.location}},{{item.parent_city}},{{item.admin_area}},{{item.cnty}}</li>
                </ul>
                <p v-show="noData" v-bind="nullValue">没有找到符合条件的城市/景点</p>
                
            </div>

            

    </div>
</template>
<script>
import axios from 'axios'
import {mapActions,mapMutations} from 'vuex'
import top from 'components/top'

		// 节流函数
		const delay = (function() {
		  let timer = 0;
		  return function(callback, ms) {
		    clearTimeout(timer);
		    timer = setTimeout(callback, ms);
		  };
		})();

export default {
     data(){
    return {
        goBack:'&#xe605;',
        keyword: '', 
        city:[], //请求下来的城市
        noData: '' ,
    }
  },
  
    //聚焦input
    directives: {
    focus: {
        // 指令的定义
        inserted: function (el) {
        el.focus()
        }
    }
    },
    
    components:{
      top,
  },
		  watch: {
		    keyword() {
		      delay(() => {
		        this.fetchData();
		      }, 300);
		    },
		  },
     
    methods:{
       Back(){
           this.$router.go(-1)
       },
    
       
		    async fetchData(val) {
            //    axios.get('api/search-association.html?name='+this.keyword)
            axios.get('https://search.heweather.net/find?location='+this.keyword+'&key=f49c2a48193644129bf2aa3c5c782296')
		        .then(data =>{
		       // console.log(data.data.HeWeather6[0].basic)
            this.city = data.data.HeWeather6[0].basic
           //this.setCityCode(this.city.data.HeWeather6[0].basic.cid) //传值

		      })
        },
        sendCity (event) {
            const wyn = event.currentTarget.getAttribute("id");
            const wynn = event.currentTarget.getAttribute("cit");

            this.setCityCode(wyn)
             this.saveSearchHistory(wynn)
                         //console.log(wynn)


            this.$router.push('/')
             
          //this.saveSearchHistory(wyn)
          

        },
    
    saveSearch() {
    },
 
        ...mapMutations({
          setCityCode: 'SET_CITYCODE'
        }),

        ...mapActions([
         'saveSearchHistory'
        ]
        )

      

    },
    computed: {
      nullValue () {
        if (this.city === undefined) {
          //console.log('wyn')
          this.noData = 'true' 
        }
        
      }
    },
   mounted () {
       
   },


}

</script>
<style lang="scss" scoped>
 
.searchCity{
    height: 100%;
      overflow: hidden;
    .box{
        width: 90%;
        margin: auto;
        opacity: 0.8;
        margin:15px auto 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .searchBox{
            width: 86%;
            height: 40px;
            background: rgba(0,0,0,0.3);
            opacity: 0.8;
            border-radius: 50px;
            display: flex;
            align-items: center;
            i{
                padding: 15px;
            }
            input{
            background: none;
            width: 90%;
            color: #fff;
            border: none;
            }
            input::-webkit-input-placeholder {
            color: #fff;
            font-size: 15px;
            }
        }
        em{
            font-size: 17px;
        }
    }
    .search-content{
        ul{
            width: 90%;
            margin: auto;
            li{
               height: 50px;
               line-height: 50px;
               border-bottom: 0.5px solid rgba(255,255,255,0.5);
            }
        }
        p{
          width: 100%;
          text-align: center;
          opacity: 0.5;
          margin-top: 35px;
        }
    }

}

  
    
 
</style>