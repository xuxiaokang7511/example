(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d212fd8"],{ab89:function(t,e,i){"use strict";i.r(e);var s=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[i("wb-page-header",{scopedSlots:t._u([{key:"content",fn:function(){return[i("div",[t._v("\u57fa\u7840\u7684\u5355\u56fe\u7247\u4e0a\u4f20")])]},proxy:!0}])},[t._v("\n    \u56fe\u7247\u4e0a\u4f20\n    ")]),t._v(" "),i("div",{staticClass:"components-container"},[i("el-row",{attrs:{gutter:20}},[i("el-col",{attrs:{span:12}},[i("h3",[t._v("\u9ed8\u8ba4\u4e0a\u4f20")]),t._v(" "),i("el-upload",{attrs:{accept:t.accept,action:t.action,"show-file-list":!1,multiple:!1,"before-upload":t.imgeBeforeUpload,"on-success":t.imgUploadSuccess,"on-error":t.imgUploadError}},[i("el-button",{attrs:{size:"small",type:"primary"}},[t._v("\u70b9\u51fb\u4e0a\u4f20")]),t._v(" "),i("div",{staticClass:"el-upload__tip",attrs:{slot:"tip"},slot:"tip"},[t._v("\u53ea\u80fd\u4e0a\u4f20jpg/png\u6587\u4ef6\uff0c\u4e14\u4e0d\u8d85\u8fc72M")])],1)],1),t._v(" "),i("el-col",{attrs:{span:12}},[i("h3",[t._v("\u81ea\u5b9a\u4e49\u4e0a\u4f20")]),t._v(" "),i("el-upload",{attrs:{accept:t.accept,action:t.action2,"show-file-list":!1,multiple:!1,limit:1,"before-upload":t.imgeBeforeUpload,"http-request":t.uploadSectionFile,"on-success":t.imgUploadSuccess,"on-error":t.imgUploadError}},[i("el-button",{attrs:{size:"small",type:"primary"}},[t._v("\u70b9\u51fb\u4e0a\u4f20")]),t._v(" "),i("div",{staticClass:"el-upload__tip",attrs:{slot:"tip"},slot:"tip"},[t._v("\u53ea\u80fd\u4e0a\u4f20jpg/png\u6587\u4ef6\uff0c\u4e14\u4e0d\u8d85\u8fc72M")])],1)],1)],1),t._v(" "),i("transition",{attrs:{name:"el-zoom-in-center"}},[t.imgUrl?i("el-image",{staticStyle:{width:"200px",height:"200px","margin-top":"20px"},attrs:{src:t.imgUrl,fit:"scale-down","preview-src-list":t.imgUrls,lazy:""}}):t._e()],1)],1)],1)},o=[],a="http://127.0.0.1:9527/mock",r={name:"UploadDemo",data:function(){return{action:a+"/file/imgUpload",action2:"",accept:"image/jpeg,image/png",imgUrl:"",imgUrls:[]}},methods:{imgeBeforeUpload:function(t){var e=t.type,i=-1!==this.accept.split(",").indexOf(e),s=t.size/1024/1024<=2;return i?s?void 0:(this.$message.error("\u53ea\u80fd\u4e0a\u4f20\u56fe\u7247\u5927\u5c0f\u5c0f\u4e8e2M"),!1):(this.$message.error("\u53ea\u80fd\u4e0a\u4f20\u56fe\u7247\u683c\u5f0fpng\u3001jpg!"),!1)},imgUploadSuccess:function(t,e,i){var s=this;2e4===t.code?(this.$message({message:t.msg,type:"success"}),this.imgUrls=[],this.imgUrl="",this.$nextTick((function(){s.imgUrls=[t.data],s.imgUrl=t.data}))):this.imgUploadError(t,e,i)},imgUploadError:function(t,e,i){this.$message.error(t.msg)},uploadSectionFile:function(t){var e=t.file;this.$store.dispatch("common/imgUpload",e).then((function(e){t.onSuccess(e)})).catch((function(e){t.onError(e)}))},clearFiles:function(t){}}},l=r,n=i("2877"),c=Object(n["a"])(l,s,o,!1,null,null,null);e["default"]=c.exports}}]);