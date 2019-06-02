<template>
         <ul class="sevenDays">
             <li v-for="(item,index) in daily_forecast" :key="index">
                 <span>{{item.date | dateformat('MM/DD')}}</span>
                 <i>   
                    <img :src="require(`@/assets/weatherImg/${item.cond_code_d}.png`)" alt="">
                    <em>{{item.cond_txt_d}}</em>
                 </i>
                 <em>{{item.tmp_max}}° ~ {{item.tmp_min}}°</em>
             </li>
 
         </ul>              
</template>

<script>
import axios from 'axios'

import {mapGetters} from 'vuex'
import moment from 'moment'

var Imgurl

export default {
    data () {
        return {
            daily_forecast:[],  
            // ImgUrl:require('@/assets/weatherImg/100.png')
        }
    },
//       created() {
//        let startDate = moment(this.daily_forecast.date).format('M月DD日');
//        this.currentDate = startDate
//               console.log(startDate)
//    },
    computed: {
       ...mapGetters([
           'CityCode'
       ])
    },
    methods:{
       getsevenDays () {
           axios.get('https://free-api.heweather.net/s6/weather/forecast?location='+this.CityCode+'&group=world&key=f49c2a48193644129bf2aa3c5c782296')
           .then((response) => {
               //console.log(response.data.HeWeather6[0].daily_forecast);
                this.daily_forecast = response.data.HeWeather6[0].daily_forecast;
               // this.update = response.data.HeWeather6[0].update;
           })
           .catch((error) => {
               console.log(error);
           })
       },

    },
    mounted () {
    this.getsevenDays ();


   }
    
}
</script>
<style lang="scss" scoped>
    .sevenDays{
        width: 95%;
        margin: auto;
        li{
            height: 50px;
            display: flex;
            justify-content: space-between;
            align-items:center;
            span{
                display: inline-block;

            }
            i{
                width: 112px;
                img{
                   width: 50px;
                   height: 50px; 
            }
            em{ 
                display:inline-block;
                width: 50px; 
                text-align: center;
                white-space: nowrap;
                }

            }
            
        }
    }
</style>
