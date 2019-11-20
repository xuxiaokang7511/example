<template>
  <div :class="classes">
    <a
      v-if="to"
      :href="linkUrl"
      :target="target"
      class="wb-cell-link"
      @click.exact="handleClickItem($event, false)"
      @click.ctrl="handleClickItem($event, true)"
      @click.meta="handleClickItem($event, true)"
    >
      <cell-item :title="title" :label="label" :extra="extra">
        <slot slot="icon" name="icon"></slot>
        <slot slot="default"></slot>
        <slot slot="extra" name="extra"></slot>
        <slot slot="label" name="label"></slot>
      </cell-item>
    </a>
    <div v-else class="wb-cell-link" @click="handleClickItem">
      <cell-item :title="title" :label="label" :extra="extra">
        <slot slot="icon" name="icon"></slot>
        <slot slot="default"></slot>
        <slot slot="extra" name="extra"></slot>
        <slot slot="label" name="label"></slot>
      </cell-item>
    </div>
    <div v-if="to" class="wb-cell-arrow">
      <slot name="arrow">
        <i class="el-icon-arrow-right" style="padding-right:3px;"></i>
      </slot>
    </div>
  </div>
</template>
<script>
import CellItem from './cell-item.vue'
import mixinsLink from './link'
const prefixCls = 'wb-cell'
export default {
  name: 'Cell',
  inject: ['cellGroup'],
  components: { CellItem },
  mixins: [mixinsLink],
  props: {
    name: {
      type: [String, Number],
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: ''
    },
    extra: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    selected: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      prefixCls: prefixCls
    }
  },
  computed: {
    classes() {
      return [
        `${prefixCls}`,
        {
          [`${prefixCls}-disabled`]: this.disabled,
          [`${prefixCls}-selected`]: this.selected,
          [`${prefixCls}-with-link`]: this.to
        }
      ]
    }
  },
  methods: {
    handleClickItem(event, new_window) {
      this.cellGroup.handleClick(this.name)
      this.handleCheckClick(event, new_window)
    }
  }
}
</script>
<style lang="css">
.wb-cell {
  position: relative;
  overflow: hidden;
}
.wb-cell-link,
.wb-cell-link:hover,
.wb-cell-link:active {
  color: inherit;
}
.wb-cell-icon {
  display: inline-block;
  margin-right: 4px;
  font-size: 14px;
  vertical-align: middle;
}
.wb-cell-icon:empty {
  display: none;
}
.wb-cell-main {
  display: inline-block;
  vertical-align: middle;
}
.wb-cell-title {
  line-height: 24px;
  font-size: 14px;
}
.wb-cell-label {
  line-height: 1.2;
  font-size: 12px;
  color: #808695;
}
.wb-cell-selected .wb-cell-label {
  color: inherit;
}
.wb-cell-selected,
.wb-cell.wb-cell-selected:hover {
  background: #f0faff;
}
.wb-cell-footer {
  display: inline-block;
  position: absolute;
  -webkit-transform: translateY(-50%);
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
  top: 50%;
  right: 16px;
  color: #515a6e;
}
.wb-cell-with-link .wb-cell-footer {
  right: 32px;
}
.wb-cell-selected .wb-cell-footer {
  color: inherit;
}
.wb-cell-arrow {
  display: inline-block;
  position: absolute;
  -webkit-transform: translateY(-50%);
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
  top: 50%;
  right: 16px;
  font-size: 14px;
}
.wb-cell:focus {
  background: #f3f3f3;
  outline: none;
}
.wb-cell-selected:focus {
  background: rgba(40, 123, 211, 0.91);
}
.wb-cell {
  margin: 0;
  line-height: normal;
  padding: 7px 16px;
  clear: both;
  color: #515a6e;
  font-size: 14px !important;
  white-space: nowrap;
  list-style: none;
  cursor: pointer;
  -webkit-transition: background 0.2s ease-in-out;
  transition: background 0.2s ease-in-out;
}
.wb-cell:hover {
  background: #f3f3f3;
}
.wb-cell-focus {
  background: #f3f3f3;
}
.wb-cell-disabled {
  color: #c5c8ce;
  cursor: not-allowed;
}
.wb-cell-disabled:hover {
  color: #c5c8ce;
  background-color: #fff;
  cursor: not-allowed;
}
.wb-cell-selected,
.wb-cell-selected:hover {
  color: #2d8cf0;
}
.wb-cell-divided {
  margin-top: 5px;
  border-top: 1px solid #e8eaec;
}
.wb-cell-divided:before {
  content: '';
  height: 5px;
  display: block;
  margin: 0 -16px;
  background-color: #fff;
  position: relative;
  top: -7px;
}
.wb-cell-enter {
  color: #2d8cf0;
  font-weight: bold;
  float: right;
}
.wb-cell-large .wb-cell {
  padding: 7px 16px 8px;
  font-size: 14px !important;
}
@-moz-document url-prefix() {
  .wb-cell {
    white-space: normal;
  }
}
</style>
<style lang="scss" scoped>
/deep/ sup {
  top: 0 !important;
}
</style>
