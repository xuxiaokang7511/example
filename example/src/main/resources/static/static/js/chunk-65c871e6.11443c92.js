(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-65c871e6"],{"71d1":function(t,a,e){"use strict";var i=e("e89a"),n=e.n(i);n.a},8398:function(t,a,e){"use strict";var i=e("b5ed"),n=e.n(i);n.a},9406:function(t,a,e){"use strict";e.r(a);var i=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"dashboard-container"},[e("editorDashboard")],1)},n=[],s=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"dashboard-editor-container"},[e("panel-group",{on:{handleSetLineChartData:t.handleSetLineChartData}}),t._v(" "),e("el-row",{staticStyle:{padding:"10px 16px","margin-bottom":"8px"}},[e("line-chart",{attrs:{"chart-data":t.lineChartData}})],1),t._v(" "),e("el-row",{staticStyle:{padding:"10px 16px","margin-bottom":"8px"},attrs:{gutter:24}},[e("el-col",{attrs:{xs:24,sm:24,lg:8}},[e("div",{staticClass:"chart-wrapper"},[e("raddar-chart")],1)]),t._v(" "),e("el-col",{attrs:{xs:24,sm:24,lg:8}},[e("div",{staticClass:"chart-wrapper"},[e("pie-chart")],1)]),t._v(" "),e("el-col",{attrs:{xs:24,sm:24,lg:8}},[e("div",{staticClass:"chart-wrapper"},[e("bar-chart")],1)])],1)],1)},r=[],c=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("el-row",{staticClass:"panel-group",staticStyle:{padding:"10px 16px 0"},attrs:{gutter:24}},[e("el-col",{staticClass:"card-panel-col",attrs:{xs:12,sm:12,lg:6}},[e("div",{staticClass:"card-panel",on:{click:function(a){return t.handleSetLineChartData("newVisitis")}}},[e("div",{staticClass:"card-panel-icon-wrapper icon-people"},[e("svg-icon",{attrs:{"icon-class":"peoples","class-name":"card-panel-icon"}})],1),t._v(" "),e("div",{staticClass:"card-panel-description"},[e("div",{staticClass:"card-panel-text"},[t._v("New Visits")]),t._v(" "),e("count-to",{staticClass:"card-panel-num",attrs:{"start-val":0,"end-val":102400,duration:2600}})],1)])]),t._v(" "),e("el-col",{staticClass:"card-panel-col",attrs:{xs:12,sm:12,lg:6}},[e("div",{staticClass:"card-panel",on:{click:function(a){return t.handleSetLineChartData("messages")}}},[e("div",{staticClass:"card-panel-icon-wrapper icon-message"},[e("svg-icon",{attrs:{"icon-class":"message","class-name":"card-panel-icon"}})],1),t._v(" "),e("div",{staticClass:"card-panel-description"},[e("div",{staticClass:"card-panel-text"},[t._v("Messages")]),t._v(" "),e("count-to",{staticClass:"card-panel-num",attrs:{"start-val":0,"end-val":81212,duration:3e3}})],1)])]),t._v(" "),e("el-col",{staticClass:"card-panel-col",attrs:{xs:12,sm:12,lg:6}},[e("div",{staticClass:"card-panel",on:{click:function(a){return t.handleSetLineChartData("purchases")}}},[e("div",{staticClass:"card-panel-icon-wrapper icon-money"},[e("svg-icon",{attrs:{"icon-class":"money","class-name":"card-panel-icon"}})],1),t._v(" "),e("div",{staticClass:"card-panel-description"},[e("div",{staticClass:"card-panel-text"},[t._v("Purchases")]),t._v(" "),e("count-to",{staticClass:"card-panel-num",attrs:{"start-val":0,"end-val":9280,duration:3200}})],1)])]),t._v(" "),e("el-col",{staticClass:"card-panel-col",attrs:{xs:12,sm:12,lg:6}},[e("div",{staticClass:"card-panel",on:{click:function(a){return t.handleSetLineChartData("shoppings")}}},[e("div",{staticClass:"card-panel-icon-wrapper icon-shopping"},[e("svg-icon",{attrs:{"icon-class":"shopping","class-name":"card-panel-icon"}})],1),t._v(" "),e("div",{staticClass:"card-panel-description"},[e("div",{staticClass:"card-panel-text"},[t._v("Shoppings")]),t._v(" "),e("count-to",{staticClass:"card-panel-num",attrs:{"start-val":0,"end-val":13600,duration:3600}})],1)])])],1)},o=[],l=e("ec1b"),d=e.n(l),h={components:{CountTo:d.a},methods:{handleSetLineChartData:function(t){this.$emit("handleSetLineChartData",t)}}},u=h,p=(e("71d1"),e("2877")),m=Object(p["a"])(u,c,o,!1,null,"b0c16404",null),g=m.exports,f=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{directives:[{name:"resize",rawName:"v-resize",value:t.resize,expression:"resize"}],class:t.className,staticStyle:{padding:"0 16px",background:"#fff"},style:{height:t.height,width:t.width}})},v=[],x=e("313e"),y=e.n(x);e("817d");var C={props:{className:{type:String,default:"chart"},width:{type:String,default:"100%"},height:{type:String,default:"350px"},autoResize:{type:Boolean,default:!0},chartData:{type:Object,required:!0}},data:function(){return{chart:null}},watch:{chartData:{deep:!0,handler:function(t){this.setOptions(t)}}},mounted:function(){var t=this;this.$nextTick((function(){t.initChart()}))},beforeDestroy:function(){this.chart&&(this.chart.dispose(),this.chart=null)},methods:{resize:function(){this.chart&&this.chart.resize()},initChart:function(){this.chart=y.a.init(this.$el,"macarons"),this.setOptions(this.chartData)},testOptios:function(){var t={normal:{show:!0,position:"insideBottom",distance:15,align:"left",verticalAlign:"middle",rotate:90,formatter:"{c}  {name|{a}}",fontSize:16,rich:{name:{textBorderColor:"#fff"}}}};return{tooltip:{trigger:"axis",axisPointer:{type:"shadow"}},legend:{data:["Forest","Steppe","Desert","Wetland"]},grid:{left:10,right:10,bottom:20,top:30,containLabel:!0},xAxis:[{type:"category",axisTick:{show:!1},data:["2012","2013","2014","2015","2016","2017","2018","2019"]}],yAxis:[{type:"value"}],series:[{name:"Forest",type:"bar",barGap:0,label:t,data:[320,332,301,334,390,332,301,334]},{name:"Steppe",type:"bar",label:t,data:[220,182,191,234,290,182,191,234]},{name:"Desert",type:"bar",label:t,data:[150,232,201,154,190,232,201,154]},{name:"Wetland",type:"bar",label:t,data:[98,77,101,99,40,77,101,99]}]}},getOptions:function(t,a){return{xAxis:{data:["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],boundaryGap:!1,axisTick:{show:!1}},grid:{left:10,right:10,bottom:20,top:30,containLabel:!0},tooltip:{trigger:"axis",axisPointer:{type:"cross"},padding:[5,10]},yAxis:{axisTick:{show:!1}},legend:{data:["expected","actual"]},series:[{name:"expected",itemStyle:{normal:{color:"#FF005A",lineStyle:{color:"#FF005A",width:2}}},smooth:!0,type:"line",data:t,animationDuration:2800,animationEasing:"cubicInOut"},{name:"actual",smooth:!0,type:"line",itemStyle:{normal:{color:"#3888fa",lineStyle:{color:"#3888fa",width:2},areaStyle:{color:"#f3f8ff"}}},data:a,animationDuration:2800,animationEasing:"quadraticOut"}]}},setOptions:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},a=t.expectedData,e=t.actualData;this.chart.setOption(this.getOptions(a,e))}}},b=C,w=Object(p["a"])(b,f,v,!1,null,null,null),S=w.exports,D=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{directives:[{name:"resize",rawName:"v-resize",value:t.resize,expression:"resize"}],class:t.className,style:{height:t.height,width:t.width}})},_=[];e("817d");var z=3e3,O={props:{className:{type:String,default:"chart"},width:{type:String,default:"100%"},height:{type:String,default:"300px"}},data:function(){return{chart:null}},mounted:function(){var t=this;this.$nextTick((function(){t.initChart()}))},beforeDestroy:function(){this.chart&&(this.chart.dispose(),this.chart=null)},methods:{resize:function(){this.chart&&this.chart.resize()},initChart:function(){this.chart=y.a.init(this.$el,"macarons"),this.chart.setOption({tooltip:{trigger:"axis",axisPointer:{type:"shadow"}},radar:{radius:"66%",center:["50%","42%"],splitNumber:8,splitArea:{areaStyle:{color:"rgba(127,95,132,.3)",opacity:1,shadowBlur:45,shadowColor:"rgba(0,0,0,.5)",shadowOffsetX:0,shadowOffsetY:15}},indicator:[{name:"Sales",max:1e4},{name:"Administration",max:2e4},{name:"Information Techology",max:2e4},{name:"Customer Support",max:2e4},{name:"Development",max:2e4},{name:"Marketing",max:2e4}]},legend:{left:"center",bottom:"10",data:["Allocated Budget","Expected Spending","Actual Spending"]},series:[{type:"radar",symbolSize:0,areaStyle:{normal:{shadowBlur:13,shadowColor:"rgba(0,0,0,.2)",shadowOffsetX:0,shadowOffsetY:10,opacity:1}},data:[{value:[5e3,7e3,12e3,11e3,15e3,14e3],name:"Allocated Budget"},{value:[4e3,9e3,15e3,15e3,13e3,11e3],name:"Expected Spending"},{value:[5500,11e3,12e3,15e3,12e3,12e3],name:"Actual Spending"}],animationDuration:z}]})}}},k=O,T=Object(p["a"])(k,D,_,!1,null,null,null),A=T.exports,E=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{directives:[{name:"resize",rawName:"v-resize",value:t.resize,expression:"resize"}],class:t.className,style:{height:t.height,width:t.width}})},L=[];e("817d");var $={props:{className:{type:String,default:"chart"},width:{type:String,default:"100%"},height:{type:String,default:"300px"}},data:function(){return{chart:null}},mounted:function(){var t=this;this.$nextTick((function(){t.initChart()}))},beforeDestroy:function(){this.chart&&(this.chart.dispose(),this.chart=null)},methods:{resize:function(){this.chart&&this.chart.resize()},initChart:function(){this.chart=y.a.init(this.$el,"macarons"),this.chart.setOption({tooltip:{trigger:"item",formatter:"{a} <br/>{b} : {c} ({d}%)"},legend:{left:"center",bottom:"10",data:["Industries","Technology","Forex","Gold","Forecasts"]},series:[{name:"WEEKLY WRITE ARTICLES",type:"pie",roseType:"radius",radius:[15,95],center:["50%","38%"],data:[{value:320,name:"Industries"},{value:240,name:"Technology"},{value:149,name:"Forex"},{value:100,name:"Gold"},{value:59,name:"Forecasts"}],animationEasing:"cubicInOut",animationDuration:2600}]})}}},N=$,B=Object(p["a"])(N,E,L,!1,null,null,null),F=B.exports,W=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{directives:[{name:"resize",rawName:"v-resize",value:t.resize,expression:"resize"}],class:t.className,style:{height:t.height,width:t.width}})},j=[];e("817d");var I=6e3,M={props:{className:{type:String,default:"chart"},width:{type:String,default:"100%"},height:{type:String,default:"300px"}},data:function(){return{chart:null}},mounted:function(){var t=this;this.$nextTick((function(){t.initChart()}))},beforeDestroy:function(){this.chart&&(this.chart.dispose(),this.chart=null)},methods:{resize:function(){this.chart&&this.chart.resize()},initChart:function(){this.chart=y.a.init(this.$el,"macarons"),this.chart.setOption({tooltip:{trigger:"axis",axisPointer:{type:"shadow"}},grid:{top:10,left:"2%",right:"2%",bottom:"3%",containLabel:!0},xAxis:[{type:"category",data:["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],axisTick:{alignWithLabel:!0}}],yAxis:[{type:"value",axisTick:{show:!1}}],series:[{name:"pageA",type:"bar",stack:"vistors",barWidth:"60%",data:[79,52,200,334,390,330,220],animationDuration:I},{name:"pageB",type:"bar",stack:"vistors",barWidth:"60%",data:[80,52,200,334,390,330,220],animationDuration:I},{name:"pageC",type:"bar",stack:"vistors",barWidth:"60%",data:[30,52,200,334,390,330,220],animationDuration:I}]})}}},P=M,G=Object(p["a"])(P,W,j,!1,null,null,null),R=G.exports,V={newVisitis:{expectedData:[100,120,161,134,105,160,165],actualData:[120,82,91,154,162,140,145]},messages:{expectedData:[200,192,120,144,160,130,140],actualData:[180,160,151,106,145,150,130]},purchases:{expectedData:[80,100,121,104,105,90,100],actualData:[120,90,100,138,142,130,130]},shoppings:{expectedData:[130,140,141,142,145,150,160],actualData:[120,82,91,154,162,140,130]}},q={name:"DashboardAdmin",components:{PanelGroup:g,LineChart:S,RaddarChart:A,PieChart:F,BarChart:R},data:function(){return{lineChartData:V.newVisitis}},methods:{handleSetLineChartData:function(t){this.lineChartData=V[t]}}},Y=q,J=(e("8398"),Object(p["a"])(Y,s,r,!1,null,"c6afc984",null)),X=J.exports,K={name:"Dashboard",components:{editorDashboard:X},data:function(){return{initMainBgColor:""}},mounted:function(){""===this.initMainBgColor&&(this.initMainBgColor=this.getStyle(document.querySelector(".main-container"),"background-color"))},destroyed:function(){},activated:function(){},deactivated:function(){}},H=K,Q=Object(p["a"])(H,i,n,!1,null,"1c43189e",null);a["default"]=Q.exports},b5ed:function(t,a,e){},e89a:function(t,a,e){}}]);