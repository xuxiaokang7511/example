<template>
  <div>
    <wb-page-header>
      富文本
      <template #content>
        富文本是管理后台一个核心的功能，但同时又是一个有很多坑的地方。在选择富文本的过程中我也走了不少的弯路，市面上常见的富文本都基本用过了，最终权衡了一下选择了Tinymce。更详细的富文本比较和介绍见
        <a
          target="_blank"
          class="link-type"
          href="http://tinymce.ax-z.cn/quick-start.php"
        >文档</a>
      </template>
    </wb-page-header>

    <div class="components-container">
      <div>
        <tinymce
          v-model="content"
          :height="500"
          :disabled="disabled"
          :statusbar="true"
          mode="basic"
          @onChange="onChange"
        />
      </div>
      <div class="editor-content" v-html="content" />
    </div>
  </div>
</template>

<script>
import Tinymce from '@/components/Tinymce5'

export default {
  name: 'TinymceDemo5',
  components: { Tinymce },
  data() {
    return {
      disabled: false,
      content: `<h1 style="text-align: center;">Welcome to the TinyMCE demo!</h1><p style="text-align: center; font-size: 15px;"><img title="TinyMCE Logo" src="https://www.tinymce.com/images/glyph-tinymce@2x.png" alt="TinyMCE Logo" width="110" height="97" /><ul>
        <li>Our <a href="https://www.tinymce.com/docs/">documentation</a> is a great resource for learning how to configure TinyMCE.</li><li>Have a specific question? Visit the <a href="https://community.tinymce.com/forum/">Community Forum</a>.</li><li>We also offer enterprise grade support as part of <a href="https://tinymce.com/pricing">TinyMCE premium subscriptions</a>.</li>
      </ul>`
    }
  },
  methods: {
    onChange(e, tinymce) {
      const wordcount = tinymce.activeEditor.plugins.wordcount
      console.log(wordcount.body.getWordCount())
    }
  }
}
</script>

<style scoped>
.editor-content {
  margin-top: 20px;
}
</style>

