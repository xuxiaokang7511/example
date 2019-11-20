// Any plugins you want to use has to be imported
// Detail plugins list see https://www.tiny.cloud/docs/plugins/
// http://tinymce.ax-z.cn/plugins/advlist.php
// Custom builds see https://www.tinymce.com/download/custom-builds/

// eslint-disable-next-line
import tinymce from 'tinymce/tinymce'

import 'tinymce/plugins/print' // 打印插件
import 'tinymce/plugins/preview' // 预览插件
import './plugins/powerpaste' // 复制内容清理插件
import 'tinymce/plugins/searchreplace' // 查找替换插件
import 'tinymce/plugins/autolink' // 自动链接插件
import './plugins/formatpainter' // 格式刷插件
import 'tinymce/plugins/code' // 编辑html源码插件
import 'tinymce/plugins/visualblocks' // 显示块元素范围
import 'tinymce/plugins/fullscreen' // 全屏
import 'tinymce/plugins/link' // 链接插件
import 'tinymce/plugins/image' // 插入上传图片插件
import 'tinymce/plugins/template' // 内容模板插件
import 'tinymce/plugins/codesample' // 代码示例插件 http://tinymce.ax-z.cn/plugins/codesample.php
import 'tinymce/plugins/table' // 插入表格插件
import 'tinymce/plugins/lists' // 列表插件
import 'tinymce/plugins/charmap' // 特殊字符插件
import 'tinymce/plugins/hr' // 水平分割线
import 'tinymce/plugins/pagebreak' // 水平分割线
import 'tinymce/plugins/toc' // 目录生成器
import 'tinymce/plugins/insertdatetime' // 插入当前日期时间
import 'tinymce/plugins/advlist' // 高级列表插件
import 'tinymce/plugins/wordcount' // 字数统计插件
import 'tinymce/plugins/imagetools' // 图片工具
import 'tinymce/plugins/textpattern' // 快速排版（类似markdown）
import './plugins/pageembed' // iframe

// const plugins =
//   'print preview powerpaste searchreplace autolink formatpainter code visualblocks fullscreen link image template codesample table lists charmap hr pagebreak toc insertdatetime advlist wordcount imagetools textpattern pageembed'

const plugins = {
  mini:
    'print powerpaste fullscreen link image table lists advlist textpattern',
  basic:
    'print preview powerpaste searchreplace autolink visualblocks fullscreen link image codesample table lists charmap hr pagebreak toc advlist wordcount imagetools textpattern',
  full:
    'print preview powerpaste searchreplace autolink formatpainter code visualblocks fullscreen link image template codesample table lists charmap hr pagebreak toc insertdatetime advlist wordcount imagetools textpattern pageembed'
}

export default plugins
