(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-74c4da2f"],{c57a:function(t,e,s){},d63e:function(t,e,s){"use strict";s.r(e);var a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"app-container"},[s("div",{staticClass:"block"},[s("h3",{staticStyle:{"padding-bottom":"20px","margin-top":"10px"}},[t._v("\u4e3b\u9898\u8bbe\u7f6e")]),t._v(" "),s("div",{staticClass:"box-item"},[s("span",{staticClass:"field-label"},[t._v("\u9876\u90e8\u680f")]),t._v(" "),s("el-radio-group",{on:{change:t.changeColor},model:{value:t.color,callback:function(e){t.color=e},expression:"color"}},[s("el-radio-button",{attrs:{label:"dark"}},[t._v("\u6697\u8272")]),t._v(" "),s("el-radio-button",{attrs:{label:"light"}},[t._v("\u4eae\u8272")]),t._v(" "),s("el-radio-button",{attrs:{label:"color"}},[t._v("\u4e3b\u8272")])],1)],1),t._v(" "),s("div",{staticClass:"box-item",staticStyle:{"padding-top":"20px"}},[s("span",{staticClass:"field-label"},[t._v("\u4fa7\u8fb9\u680f")]),t._v(" "),s("el-radio-group",{on:{change:t.changeStyle},model:{value:t.style,callback:function(e){t.style=e},expression:"style"}},[s("el-radio-button",{attrs:{label:"dark"}},[t._v("\u6697")]),t._v(" "),s("el-radio-button",{attrs:{label:"light"}},[t._v("\u4eae")])],1)],1)]),t._v(" "),s("div",{staticClass:"block drawer-container"},[s("h3",[t._v("\u5e03\u5c40\u8bbe\u7f6e")]),t._v(" "),s("el-row",{attrs:{gutter:20}},[s("el-col",{attrs:{span:6}},[s("el-card",{staticClass:"box-card",attrs:{header:"\u4fa7\u8fb9\u680f"}},[s("div",{staticClass:"drawer-item"},[s("span",[t._v("\u4fa7\u8fb9\u680fLogo")]),t._v(" "),s("el-switch",{staticClass:"drawer-switch",model:{value:t.sidebarLogo,callback:function(e){t.sidebarLogo=e},expression:"sidebarLogo"}})],1),t._v(" "),s("div",{staticClass:"drawer-item"},[s("span",[t._v("\u5355\u4e2a\u83dc\u5355")]),t._v(" "),s("el-tooltip",{attrs:{effect:"dark",content:"\u5355\u4e2a\u83dc\u5355\u662f\u5426\u5f00\u542f\u4fa7\u8fb9\u680f",placement:"top"}},[s("i",{staticClass:"el-icon-question",staticStyle:{color:"#bbb"}})]),t._v(" "),s("el-switch",{staticClass:"drawer-switch",model:{value:t.oneChild,callback:function(e){t.oneChild=e},expression:"oneChild"}})],1),t._v(" "),s("div",{staticClass:"drawer-item"},[t._v("\xa0")])])],1),t._v(" "),s("el-col",{attrs:{span:6}},[s("el-card",{staticClass:"box-card",attrs:{header:"\u9876\u90e8\u680f"}},[s("div",{staticClass:"drawer-item"},[s("span",[t._v("\u56fa\u5b9a\u9876\u680f")]),t._v(" "),s("el-switch",{staticClass:"drawer-switch",model:{value:t.fixedHeader,callback:function(e){t.fixedHeader=e},expression:"fixedHeader"}})],1),t._v(" "),s("div",{staticClass:"drawer-item"},[s("span",[t._v("\u7f6e\u9876\u9876\u680f")]),t._v(" "),s("el-tooltip",{attrs:{effect:"dark",content:"\u9700\u5f00\u542f\u56fa\u5b9a\u9876\u680f",placement:"top"}},[s("i",{staticClass:"el-icon-question",staticStyle:{color:"#bbb"}})]),t._v(" "),s("el-switch",{staticClass:"drawer-switch",attrs:{disabled:!t.fixedHeader},model:{value:t.fullHeader,callback:function(e){t.fullHeader=e},expression:"fullHeader"}})],1),t._v(" "),s("div",{staticClass:"drawer-item"},[s("span",[t._v("\u9876\u90e8\u5bfc\u822a")]),t._v(" "),s("el-switch",{staticClass:"drawer-switch",model:{value:t.topMenu,callback:function(e){t.topMenu=e},expression:"topMenu"}})],1)])],1),t._v(" "),s("el-col",{attrs:{span:6}},[s("el-card",{staticClass:"box-card",attrs:{header:"\u5e95\u90e8\u680f"}},[s("div",{staticClass:"drawer-item"},[s("span",[t._v("\u5f00\u542f\u5e95\u680f")]),t._v(" "),s("el-switch",{staticClass:"drawer-switch",model:{value:t.footer,callback:function(e){t.footer=e},expression:"footer"}})],1),t._v(" "),s("div",{staticClass:"drawer-item"},[s("span",[t._v("\u56fa\u5b9a\u5e95\u680f")]),t._v(" "),s("el-tooltip",{attrs:{effect:"dark",content:"\u9700\u5f00\u542f\u5e95\u680f",placement:"top"}},[s("i",{staticClass:"el-icon-question",staticStyle:{color:"#bbb"}})]),t._v(" "),s("el-switch",{staticClass:"drawer-switch",attrs:{disabled:!t.footer},model:{value:t.fixedFooter,callback:function(e){t.fixedFooter=e},expression:"fixedFooter"}})],1),t._v(" "),s("div",{staticClass:"drawer-item"},[t._v("\xa0")])])],1),t._v(" "),s("el-col",{attrs:{span:6}},[s("el-card",{staticClass:"box-card",attrs:{header:"\u6807\u7b7e & \u9762\u5305\u5c51"}},[s("div",{staticClass:"drawer-item"},[s("span",[t._v("\u5f00\u542f\u6807\u7b7e\u680f")]),t._v(" "),s("el-switch",{staticClass:"drawer-switch",model:{value:t.tagsView,callback:function(e){t.tagsView=e},expression:"tagsView"}})],1),t._v(" "),s("div",{staticClass:"drawer-item"},[s("span",[t._v("\u6807\u7b7e\u56fe\u6807")]),t._v(" "),s("el-tooltip",{attrs:{effect:"dark",content:"\u9700\u5f00\u542f\u6807\u7b7e\u680f",placement:"top"}},[s("i",{staticClass:"el-icon-question",staticStyle:{color:"#bbb"}})]),t._v(" "),s("el-switch",{staticClass:"drawer-switch",attrs:{disabled:!t.tagsView},model:{value:t.tagsIcon,callback:function(e){t.tagsIcon=e},expression:"tagsIcon"}})],1),t._v(" "),s("div",{staticClass:"drawer-item"},[s("span",[t._v("\u9762\u5305\u5c51\u56fe\u6807")]),t._v(" "),s("el-switch",{staticClass:"drawer-switch",model:{value:t.breadcrumbIcon,callback:function(e){t.breadcrumbIcon=e},expression:"breadcrumbIcon"}})],1)])],1)],1)],1)])},i=[],o={name:"Theme",data:function(){return{color:"",style:""}},computed:{fixedHeader:{get:function(){return this.$store.state.settings.fixedHeader},set:function(t){this.$store.dispatch("settings/changeSetting",{key:"fixedHeader",value:t})}},fullHeader:{get:function(){return this.$store.state.settings.fullHeader},set:function(t){this.$store.dispatch("settings/changeSetting",{key:"fullHeader",value:t})}},topMenu:{get:function(){return this.$store.state.settings.topMenu},set:function(t){this.$store.dispatch("settings/changeSetting",{key:"topMenu",value:t})}},tagsView:{get:function(){return this.$store.state.settings.tagsView},set:function(t){this.$store.dispatch("settings/changeSetting",{key:"tagsView",value:t})}},tagsIcon:{get:function(){return this.$store.state.settings.tagsIcon},set:function(t){this.$store.dispatch("settings/changeSetting",{key:"tagsIcon",value:t})}},breadcrumbIcon:{get:function(){return this.$store.state.settings.breadcrumbIcon},set:function(t){this.$store.dispatch("settings/changeSetting",{key:"breadcrumbIcon",value:t})}},footer:{get:function(){return this.$store.state.settings.footer},set:function(t){this.$store.dispatch("settings/changeSetting",{key:"footer",value:t})}},fixedFooter:{get:function(){return this.$store.state.settings.fixedFooter},set:function(t){this.$store.dispatch("settings/changeSetting",{key:"fixedFooter",value:t})}},sidebarLogo:{get:function(){return this.$store.state.settings.sidebarLogo},set:function(t){this.$store.dispatch("settings/changeSetting",{key:"sidebarLogo",value:t})}},oneChild:{get:function(){return this.$store.state.settings.oneChild},set:function(t){this.$store.dispatch("settings/changeSetting",{key:"oneChild",value:t})}}},created:function(){this.color=this.getThemeColor(),this.style=this.getThemeStyle()},methods:{changeColor:function(t){document.documentElement.setAttribute("data-color",t),this.$store.dispatch("settings/setTheme",{key:"color",value:t})},changeStyle:function(t){document.documentElement.setAttribute("data-style",t),this.$store.dispatch("settings/setTheme",{key:"style",value:t})}}},n=o,c=(s("dd4f"),s("2877")),r=Object(c["a"])(n,a,i,!1,null,"32e03b12",null);e["default"]=r.exports},dd4f:function(t,e,s){"use strict";var a=s("c57a"),i=s.n(a);i.a}}]);