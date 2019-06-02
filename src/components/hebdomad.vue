<template>
    <div class="hebdomad">
        <dl>
            <dd>7天预报</dd>
           
        </dl>
            <swiper :options="swiperOption" class="qt">
                <swiper-slide class="qq">
                    <div id="myChart" :style="{width: 'auto', height: '200px'}"></div>
                     <div class="bot">
                        
                        <ul>
                            <li v-for="(item,index) in weatherDate" :key="index">
                               
                                <p class="weather"><i>{{item.cond_txt_d}}</i><img :src="require(`@/assets/weatherImg/${item.cond_code_d}.png`)" alt=""></p>
                                <div class="vis"  v-bind:style="{'background':background(item)}" >{{item.vis}}</div> 
                                <p class="dir"><i class="iconfont" v-bind:style="{'transform':transform(item)}">&#xe679;</i>{{item.wind_sc}}级</p>
                            </li>
                           
                        </ul>
                        
                    </div> 
                </swiper-slide>
            </swiper>
    </div>
</template>
<script>
import axios from 'axios'
import {mapGetters} from 'vuex'
import moment from 'moment'

export default {
     data() {
      return {
          dateArrs:[],
          TmpMaxArrs:[],
          TmpMinArrs:[],
          weatherDate:{},
          //Tmp_min
        swiperOption: {
          slidesPerView: 0.5,
          spaceBetween: 0,
          freeMode: true,
        }
      }
    },
  computed: {
    ...mapGetters([
        'CityCode'
    ]),
    
  },
  watch:{
      dateArrs(val){
          this.drawLine();
      },
      TmpMaxArrs(val){
          this.drawLine();
      },
      TmpMinArrs(val){
          this.drawLine();
      }
  },

  methods: {
        background(item){
            if(item.vis <= 5 ) return "red"
            if(item.vis >= 6 && item.vis <= 15) return "#ffc000"
            if(item.vis >= 16) return "#0aca3f"
            },
        transform(item){
            if(item.wind_dir == "东北风") return "rotate(0deg)"
            if(item.wind_dir == "东风") return "rotate(50deg)"
            if(item.wind_dir == "东南风") return "rotate(85deg)"
            if(item.wind_dir == "南风") return "rotate(135deg)"
            if(item.wind_dir == "西南风") return "rotate(185deg)"
            if(item.wind_dir == "西风") return "rotate(230deg)"
            if(item.wind_dir == "西北风") return "rotate(275deg)"
            if(item.wind_dir == "北风") return "rotate(515deg)"
            if(item.wind_dir == "无持续风向") return "rotate(135deg)"
            if(item.wind_dir == "旋转风") return "rotate(135deg)"


        },    
    getDays () {
        axios.get('https://free-api.heweather.net/s6/weather/forecast?location='+this.CityCode+'&group=world&key=f49c2a48193644129bf2aa3c5c782296')
        .then((response) => {
            //console.log(response.data.HeWeather6[0].daily_forecast);
            this.weatherDate = response.data.HeWeather6[0].daily_forecast;
            //获取日期并格式化时间
            const newTimeArr = [];  
            response.data.HeWeather6[0].daily_forecast.forEach((item)=> {
                let dateArr = moment (item.date).format('MM/DD');
                newTimeArr.push(dateArr)
                //newTimeArr.push(item.date)
            })
           // console.log(newTimeArr)
            this.dateArrs = newTimeArr
            //获取最高温度
            const TmpMaxArr = [];
            response.data.HeWeather6[0].daily_forecast.forEach((item)=> {
                TmpMaxArr.push(item.tmp_max)
            })
            this.TmpMaxArrs = TmpMaxArr
            //获取最低温度
            const TmpMinArr = [];
            response.data.HeWeather6[0].daily_forecast.forEach((item)=> {
                TmpMinArr.push(item.tmp_min)
            })
            //console.log(TmpMinArr)
            this.TmpMinArrs = TmpMinArr

            
        })
        .catch((error) => {
            console.log(error);
        })
    },

    drawLine(){
        var odateArrs=this.dateArrs;
        var oTmpMaxArrs=this.TmpMaxArrs;
        var oTmpMinArrs=this.TmpMinArrs;
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById('myChart'))
        // 绘制图表
        myChart.setOption({
            title: { text: '' },
            option: {
            legend: {},
            xAxis: {},
            yAxis: {},
            label: {},
            tooltip: {},
            series: [],
            },
            
            grid: {left: '0%',
                   //top: '50%'  
            },
            legend: {
                    data: []
                    },
            tooltip: {
            trigger: 'axis',   // axis   item   none三个值
            },
            xAxis: {
            type: 'category',   // 还有其他的type，可以去官网喵两眼哦
            data: odateArrs,   // x轴数据
            name: '',   // x轴名称
           
            // x轴名称样式
            position: 'top',
            offset: 30,
            nameTextStyle: {
                fontWeight: 600,
                fontSize: 18,
            },
            axisLine: {
                show:false,
                lineStyle: {
                    color: "#fff",
                }
            },
            axisTick:{ //y轴刻度线
                    show:false
                    },
            
            },
            yAxis: {
            "show":false,
            default: false,
            
            type: 'value',
            
            
            name: '',   // y轴名称
            // y轴名称样式
            nameTextStyle: {
                fontWeight: 600,
                fontSize: 18
            },
            splitLine:{show: false}//去掉背景网格线
            },
          
            series: [
                {
                    name: '最高气温',
                    data: oTmpMaxArrs,
                    type: 'line',
                    smooth: true,
                    symbolSize: 6,
         
                    itemStyle:{
                    normal : {
                        color:'#fff',  
                        width:"20px",
                        lineStyle:{  
                        },
                        label: {
                            show: true,
                            position: [-4,-20],
                        }  
                    } 
                }
                },
                {
                    name: '最低气温',
                    data: oTmpMinArrs,
                    type: 'line',
                    smooth: true,
                    symbolSize: 6,
                  

                    itemStyle:{
                    normal : {  
                        
                        color:'#fff',  
                        width:"20px",
                        lineStyle:{  
                            color:'#fff'  
                        },
                        label: {
                            show: true,
                            position: [-4, 15],
                            
                        }  
                    } 
                }
                    
                },

                
               ]
        });
    }
  },
  mounted(){
    this.drawLine();
    this.getDays();
    
  },
}
</script>
<style lang="scss" scoped>
.hebdomad{
    background:rgba(0,0,0,0.1);
    // .yellow { background: #ffc000;}
    // .red{background: red;}
    // .green{background: #0aca3f;}
    dl{
        display: flex;
        width: 100%;
        height: 30px;
        line-height: 30px;
        justify-content: space-between;
        margin-top: 30px;
        dd:nth-child(1){
           margin-left: 20px;
        }
        dd:nth-child(2){
            margin-right: 10px;
        }
    }
    .swiper-container{
        height: 305px;
        
       
    }
    .swiper-slide{
        width: 700px;
         

    }
   .qq{
       position:relative;
       .bot{
           position:absolute;
           top:22px;
           width: 100%;
           ul{
               display: flex;
               justify-content: space-between;
               width: 87%;
               height: 280px;
               margin-left: 1%;
               li{
            
               width:12%;
               text-align: center;
               
               
               .weather{
                   margin-top: 135px;
                   i{
                       opacity: 0.7;
                   }
                   img{
                       display: block;
                       margin: auto;
                       width: 30px;
                       height: 30px;
                       }
               }
               .vis{
                   width: 40px;
                   height: 20px;
                   line-height: 20px;
                   border-radius: 5px;
                   margin: 5px auto;
               }
                .dir{

                    i{
                       display: block;
                       margin: 15px auto 10px;
                         //transform:rotate(50deg);
                       
                   }
                }  
               }
               

           }
           
        //    li:nth-child(1){
        //       margin-left: 12px;
        //    }
        //    li:nth-child(2){
        //       margin-left: 12px;
        //    }
        //    li:nth-child(3){
        //       margin-left: 12px;
        //    }
        //    li:nth-child(4){
        //       margin-left: 12px;
        //    }
           li:nth-child(6){
               width: 13.5%;
            }
            li:nth-child(7){
              width: 10%;
            }
       }
   }
    
}

</style>
