<template>
    <div class="life_exponent">
      <em>生活指数	</em>
        <ul>
          <li><span class="iconfont">&#xe70b;</span><p>舒适度指数<i>{{www}}</i></p></li>
          <li><span class="iconfont">&#xe61b;</span><p>穿衣指数<i>{{www1}}</i></p></li>
          <li><span class="iconfont">&#xe641;</span><p>感冒指数<i>{{www2}}</i></p></li>
          <li><span class="iconfont">&#xe61c;</span><p>运动指数<i>{{www3}}</i></p></li>
          <li><span class="iconfont">&#xe64b;</span><p>旅游指数<i>{{www4}}</i></p></li>
          <li><span class="iconfont">&#xeb26;</span><p>紫外线指数<i>{{www5}}</i></p></li>
          <li><span class="iconfont">&#xe623;</span><p>洗车指数<i>{{www6}}</i></p></li>
          <li><span class="iconfont">&#xe6ac;</span><p>空气污染指数<i>{{www7}}</i></p></li>
        </ul>
    </div>
</template>

<script>
import axios from 'axios'
import {mapGetters,mapMutations} from 'vuex'

export default {
  name: 'home',   
  data () {
    return {
      www: [],
      www1:[],
      www2: [],
      www3: [],
      www4: [],
      www5: [],
      www6: [],
      www7: [],

    }
  },
  computed: {
    ...mapGetters([
      'CityCode'
    ]),
  //  ...mapMutations({
  //     setwarmPrompt: 'SET_WARMPROMPT'
  //   }),

  },
  methods:{
      getLife () {
      axios.get('https://free-api.heweather.net/s6/weather/lifestyle?location='+this.CityCode+'&key=f49c2a48193644129bf2aa3c5c782296')
      .then((res) => {
          // console.log(res.data.HeWeather6[0].lifestyle);
          this.www = res.data.HeWeather6[0].lifestyle[0].brf;
          this.www1 = res.data.HeWeather6[0].lifestyle[1].brf;
          this.www2 = res.data.HeWeather6[0].lifestyle[2].brf;
          this.www3 = res.data.HeWeather6[0].lifestyle[3].brf;
          this.www4 = res.data.HeWeather6[0].lifestyle[4].brf;
          this.www5 = res.data.HeWeather6[0].lifestyle[5].brf;
          this.www6 = res.data.HeWeather6[0].lifestyle[6].brf;
          this.www7 = res.data.HeWeather6[0].lifestyle[7].brf;
          // const hint = res.data.HeWeather6[0].lifestyle[1].txt;
          // console.log(hint)
         // this.setwarmPrompt(hint)

      })
      .catch((error) => {
          console.log(error);
      })
  }
  },
   mounted () {
       this.getLife ()
   }

}
</script>

<style lang="scss" scoped>
.life_exponent{
  margin-top: 6px;
  em{
     display: block; 
     padding: 10px;
  }
    ul{
      overflow: hidden;
      li{
        box-sizing: border-box;
        float: left;
        width: 49.6%;
        height: 60px;
        margin-top: 2px;
        background: rgba(0,0,0,0.3);
        display: flex;
        align-items:center;
        span{
          display: block;
          width: 50px;
          height: 50px;;
          line-height: 50px;
          text-align: center;
          font-size: 31px;
          background: rgba(255,255,255,0.2);
          border-radius: 50px;
          margin-left: 8%;
        }
      }
      p{
        margin-left: 8%;
        
        i{
          display: block;
          margin-top: 5px;
          overflow:hidden;
          
          
        }
      }
      li:nth-child(2n+1) {
         margin-right: 2px;
      }

    }
}

</style>
