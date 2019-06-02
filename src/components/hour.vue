<template>
    <div class="hour">
        <p>24小时预报</p>
        <swiper :options="swiperOption">
                <swiper-slide class="qq">
                    <ul class="now">
                         <!-- <li><img :src="require(`@/assets/weatherImg/${now.cond_code}.png`)" alt=""></li>  -->
                          <!-- <img :src="require(`@/assets/weatherImg/${now.cond_code}.png`)" alt=""> -->
                           
                        <li>{{time}} <br/>{{now.cond_txt}} {{now.tmp}}℃</li>
                       
                    </ul>
                    <ul class="dir">
                       <li v-for="(item, index) in hourlys" :key="index">
                           <div class="weather">{{item.cond_txt}} <img :src="require(`@/assets/weatherImg/${item.cond_code}.png`)" alt=""></div>
                           
                           <i class="iconfont" v-bind:style="{'transform':transform(item)}">&#xe679;</i>
                           <span>{{item.wind_sc}}级</span>
                       </li>
                    </ul>
 
                     
                    <div id="myhour" :style="{width: '500px', height: '250px'}"></div>
                 
                </swiper-slide>
                
            </swiper>
            
    </div>
</template>
<script>
import axios from 'axios'
import {mapGetters} from 'vuex'
import moment from 'moment'


export default {
      data(){
       return {
        dataArr: [],
        dataTimeArr:[],
        now:[],
        update: [],
        time:[],
        hourlys:[],
        //newArrr: [],
        swiperOption: {
          slidesPerView: 0.5,
          spaceBetween: 0,
          freeMode: true,  
        }
      }
  },
    created() {

             // console.log(dataArr)

              
   },
    computed: {
      ...mapGetters([
          'CityCode'
      ]),

      
   }, 

    mounted(){
            this.drawLine();
            this.getHour ();
            this.getTemperature();
            
        },
        watch:{
            dataArr(val){//监听数据发生改变 刷新图表数据
                this.drawLine();
            },
            dataTimeArr(val){
                this.drawLine();
            }
        },
    
    created() {
        let times = moment(this.update.loc).format('HH:mm')
        this.time = times
        

     
    },
  
  methods: {
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

    getHour () {
           axios.get('https://free-api.heweather.net/s6/weather/hourly?location='+this.CityCode+'&group=world&key=f49c2a48193644129bf2aa3c5c782296')
           .then((response) => {
                 //console.log(response.data.HeWeather6[0].hourly)
                 this.hourlys = response.data.HeWeather6[0].hourly
                 const newArr = [];
                    response.data.HeWeather6[0].hourly.forEach((item)=> {
                    newArr.push(item.tmp)
                    })
                    this.dataArr = newArr

                    
                 const timeArr = [];
                    response.data.HeWeather6[0].hourly.forEach((item)=> {
                        let wyn = moment(item.time).format('HH:mm');
                       // console.log(wyn)
                        timeArr.push(wyn)
                    })
                   // console.log(timeArr)
                    this.dataTimeArr = timeArr;


           })
           .catch((error) => {
               console.log(error);
           })
       },
       getTemperature () {
           axios.get('https://free-api.heweather.net/s6/weather/now?location='+this.CityCode+'&group=world&key=f49c2a48193644129bf2aa3c5c782296')
           .then((res) => {
           // console.log(res.data.HeWeather6[0].now)
                this.now = res.data.HeWeather6[0].now;
                this.update = res.data.HeWeather6[0].update;


           })
           .catch((error) => {
               console.log(error);

           })
       },

 
    drawLine(){
        var odataArr=this.dataArr;
        var odataTimeArr=this.dataTimeArr;
        //console.log(this.dataArr);
        // 基于准备好的dom，初始化echarts实例
        let myhour = this.$echarts.init(document.getElementById('myhour'))
        // 绘制图表
        myhour.setOption({
            title: { text: '' },
            option: {
            legend: {},
            xAxis: {},
            yAxis: {},
            label: {},
            series: [],
            },
            
            grid: {left: '5%', top:'100px'},
            legend: {
                    data: [],
                    },
           
            xAxis: {
            type: 'category',   // 还有其他的type，可以去官网喵两眼哦
            data: odataTimeArr,   // x轴数据
            name: '',   // x轴名称
            // x轴名称样式
            offset: 5,
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
            axisTick:{ //x轴刻度线
                    show:false
                    },

            },
            yAxis: {
            "show":true,
            default: true,
            offset: -18,
            axisTick:{ //x轴刻度线
                    show:false
                    },
            axisLine:{
                show:false,
                lineStyle: {
                    color: "#fff",
                    
                }
            },
            type: 'value',
            axisLabel: {
              formatter:'{value} °'
            },
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
                    name: '气温',
                    data: odataArr,
                    type: 'line',
                    smooth: true,
                    symbol: "circle",
                    symbolSize: 6,
                    
                   // symbol :'image://http://5g.wxkbj.com/templets/bobo/banner/20171201.jpg',
                    
                    animation:false,
                    hoverAnimation: false,
                    itemStyle:{
                        
                    normal : {  
                        borderColor: "#4fcfff",
                        color:'#4fcfff',  
                        width:"20px",
                        label: {
                            show: true,
                            color:'#fff', 
                            

                        }  
                    } ,
                    emphasis: {
                    color: '#4fcfff',//hover拐点颜色定
                    
                    

                }
                },
                areaStyle: {normal: {
                color:'rgba(255,255,255,0.4)'//折线下面区块的颜色
                  }
                },
                 lineStyle:{  
                     
                        normal: {
                           color: "#fff"   // 线条颜色
                        },
                     
                
                    },
                    
                    
                },
   
                
               ]
        });
    }
  },
  
       

  
}
</script>


<style lang="scss" scoped>
#myhour{
    height: 100%;
}
    .hour{
        position: relative;

        p{
            height: 40px;
            line-height: 40px;
            text-indent: 10px;
        }
        .swiper-slide{
            background:rgba(0,0,0,0.1);
        }
        .now{
            position: absolute;
            left: 58px;
            top: 10px;
            display: flex;
            align-items:center;
            li{
                float: left;
                line-height: 20px;
                
                img{
                    width: 30px;
                    height: 30px;
                }
            }
        }
        .dir{
            position: absolute;
            top: 233px;
            left: 2.5%;
          
           li{
             width: 45px;
             height:auto;
             float: left;
             margin-left: 8px;
             text-align: center;
             .weather{
                 opacity: 0.8;
                img{
                    display: block;
                    margin: 8px auto 10px;
                    width: 30px;
                    height: 30px;
                   
                }
             }
           }
           i{
               display: block;
               
           }
           span{ 
               display: block;
               margin: auto;
               opacity: 0.8;
               margin-top: 10px;
           }


        }

        .swiper-container{
            height: 365px;
        }
    }
</style>
