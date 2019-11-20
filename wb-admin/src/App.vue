<template>
  <div id="app">
    <transition :name="transName">
      <router-view class="app-router-view" />
    </transition>
  </div>
</template>

<script>
/**
 * ---------move---------
 * move-bottom-to-top
 * move-top-to-bottom
 * move-left-to-right
 * move-right-to-left
 * ---------move-fade---------
 * move-fade-bottom-to-top
 * move-fade-top-to-bottom
 * move-fade-left-to-right
 * move-fade-right-to-left
 * ---------move-different---------
 * move-different-bottom-to-top
 * move-different-top-to-bottom
 * move-different-left-to-right
 * move-different-right-to-left
 * ---------scale---------
 * scale-down-to-down
 * scale-up-to-up
 * scale-down-to-up
 * ---------rotate-glue---------
 * rotate-glue-bottom-to-top
 * rotate-glue-top-to-bottom
 * rotate-glue-left-to-right
 * rotate-glue-right-to-left
 * ---------rotate-flip---------
 * rotate-flip-top
 * rotate-flip-bottom
 * rotate-flip-left
 * rotate-flip-right
 * ---------rotate-fall---------
 * rotate-fall
 * ---------rotate-sides---------
 * rotate-sides
 * ---------rotate-push---------
 * rotate-push-right-to-left
 * rotate-push-left-to-right
 * rotate-push-top-to-bottom
 * rotate-push-bottom-to-top
 * ---------rotate-fold---------
 * rotate-fold-bottom-to-top
 * rotate-fold-top-to-bottom
 * rotate-fold-left-to-right
 * rotate-fold-right-to-left
 * ---------rotate-carousel---------
 * rotate-carousel-top
 * rotate-carousel-bottom
 * rotate-carousel-left
 * rotate-carousel-right
 */
import 'vue-transition.css'
import { mapState } from 'vuex'

export default {
  name: 'App',
  computed: {
    ...mapState({
      transName: state => state.app.appTrans
    }),
    style: function() {
      return this.getThemeStyle()
    },
    color: function() {
      return this.getThemeColor()
    }
  },
  created() {
    document.documentElement.setAttribute('data-color', this.color)
    document.documentElement.setAttribute('data-style', this.style)

    var ua = navigator.userAgent.toLowerCase()
    var isIE = ua.indexOf('msie') > -1
    if (isIE) {
      alert(ua.match(/msie ([\d.]+)/)[1])
    }
  }
}
</script>
<style>
.app .app-router-view {
  transform: translate3d(0, 0, 0);
  transform-style: preserve-3d;
}
</style>
