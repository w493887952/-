<template>
      <div class="contents">
           <div class="head">
                <div class="head_left" > 
                    <em @click="search">+  {{basic.location}} <i class="iconfont">&#xe618;</i></em>
                    
                </div>
                
                <div class="head_right">{{currentDate}}</div>
            </div>
           <ul>
             <li>{{now.tmp}}℃</li>
           
             <li><i class="iconfont">&#xe609;</i> {{now.wind_dir}} {{now.wind_sc}}级 / <i class="iconfont">&#xe6f7;</i>{{now.hum}}%</li>
             <li>{{warmPrompt}}</li>
             <li></li>
           </ul>
           
      </div>
</template>

<script>
import axios from 'axios'
import {mapGetters} from 'vuex'

import moment from 'moment'
export default {
  name: 'contents',
  data () {
    return {
        basic:[],
        update:'',
        now:[],
        currentDate:'',
        warmPrompt: '',

       
    }
  },
   computed: {
      ...mapGetters([
          'CityCode'
      ])
   },   


   created() {
       let startDate = moment(this.update.loc).format('M月DD日');
       this.currentDate = startDate
              //console.log(startDates)

 
   },
   methods:{
 
  
       search () {
       this.$router.push('/search')
    },
       getWeather () {
           axios.get('https://free-api.heweather.net/s6/weather/now?location='+this.CityCode+'&group=world&key=f49c2a48193644129bf2aa3c5c782296')
           .then((response) => {
               // console.log(response.data.HeWeather6[0].basic);
                this.basic = response.data.HeWeather6[0].basic;
                this.update = response.data.HeWeather6[0].update;
                this.now = response.data.HeWeather6[0].now;
               
           })
           .catch((error) => {
               console.log(error);
           })
       },
      getHint () {
      axios.get('https://free-api.heweather.net/s6/weather/lifestyle?location='+this.CityCode+'&key=f49c2a48193644129bf2aa3c5c782296')
      .then((res) => {
           //console.log(res.data.HeWeather6[0].lifestyle);
          this.warmPrompt = res.data.HeWeather6[0].lifestyle[1].txt;
         
          // const hint = res.data.HeWeather6[0].lifestyle[1].txt;
         

      })
      .catch((error) => {
          console.log(error);
      })
  }




       
   },
   mounted () {
       this.getWeather (),
       this.getHint ()
   }
}
</script>

<style lang="scss" scoped>
    .contents{
        ul{
            li{
                width: 100%;
                height: auto;
                text-align: center;
                font-weight: 100;
                margin-top: 8px;
                font-size: 20px; 
                i{
                    font-size: 14px;
                   
                }
                i:nth-child(2){font-size: 20px; }
            }
            li:nth-child(1){font-size: 70px; font-family:楷体;}
            li:nth-child(2){ opacity: 0.8; }
            li:nth-child(3){opacity: 0.8; font-size: 14px; width: 95%; margin: 10px auto; line-height: 17px;}

        }
        .head{
                height: 40px;
                width: 100%;
                
                display: flex;
                justify-content: space-between;
                align-items:center;


                .head_left{
                    padding-left: 10px;
                    i{
                        font-size: 12px;
    
                    }
                }
                .head_right{
                    padding-right: 10px;
                }
        }
      
    }



</style>
