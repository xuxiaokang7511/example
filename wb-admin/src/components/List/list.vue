<template>
  <div :class="classes">
    <div v-if="header || $slots.header" class="wb-list-header">
      <slot name="header">{{ header }}</slot>
    </div>
    <div class="wb-list-container">
      <ul class="wb-list-items">
        <slot></slot>
      </ul>
    </div>
    <div v-if="footer || $slots.footer" class="wb-list-footer">
      <slot name="footer">{{ footer }}</slot>
    </div>
  </div>
</template>
<script>
export default {
  name: 'List',
  provide() {
    return {
      ListInstance: this
    }
  },
  props: {
    border: {
      type: Boolean,
      default: false
    },
    itemLayout: {
      validator(value) {
        return ['horizontal', 'vertical'].findIndex(item => item === value) > -1
      },
      default: 'horizontal'
    },
    // 或 slot
    header: {
      type: String,
      default: ''
    },
    // 或 slot
    footer: {
      type: String,
      default: ''
    },
    size: {
      validator(value) {
        return (
          ['small', 'large', 'default'].findIndex(item => item === value) > -1
        )
      },
      default: 'default'
    },
    split: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      prefixCls: 'wb-list'
    }
  },
  computed: {
    classes() {
      return [
        `${this.prefixCls}`,
        `${this.prefixCls}-${this.size}`,
        `${this.prefixCls}-${this.itemLayout}`,
        {
          [`${this.prefixCls}-bordered`]: this.border,
          [`${this.prefixCls}-split`]: this.split
        }
      ]
    }
  },
  methods: {}
}
</script>

<style lang="css">
.wb-list {
  position: relative;
}
.wb-list-items {
  margin: 0;
  padding: 0;
  list-style: none;
}
.wb-list-item {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  padding: 12px 0;
}
.wb-list-item-content {
  color: #515a6e;
}
.wb-list-item-meta {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
  -webkit-box-align: start;
  -ms-flex-align: start;
  align-items: flex-start;
  font-size: 0;
}
.wb-list-item-meta-avatar {
  margin-right: 16px;
}
.wb-list-item-meta-content {
  -webkit-box-flex: 1;
  -ms-flex: 1 0;
  flex: 1 0;
}
.wb-list-item-meta-title {
  font-weight: 500;
  margin-bottom: 4px;
  color: #515a6e;
  font-size: 14px;
  line-height: 22px;
}
.wb-list-item-meta-title > a {
  color: #515a6e;
  -webkit-transition: all 0.2s;
  transition: all 0.2s;
}
.wb-list-item-meta-title > a:hover {
  color: #2d8cf0;
}
.wb-list-item-meta-description {
  color: rgba(0, 0, 0, 0.45);
  font-size: 14px;
  line-height: 22px;
}
.wb-list-item-action {
  -webkit-box-flex: 0;
  -ms-flex: 0 0 auto;
  flex: 0 0 auto;
  margin-left: 48px;
  padding: 0;
  font-size: 0;
  list-style: none;
}
.wb-list-item-action > li {
  position: relative;
  display: inline-block;
  padding: 0 8px;
  color: rgba(0, 0, 0, 0.45);
  font-size: 14px;
  line-height: 22px;
  text-align: center;
  cursor: pointer;
}
.wb-list-item-action > li:after {
  content: '';
  position: absolute;
  top: 50%;
  right: 0;
  width: 1px;
  height: 14px;
  margin-top: -7px;
  background-color: #e8eaec;
}
.wb-list-item-action > li:first-child {
  padding-left: 0;
}
.wb-list-item-action > li:last-child:after {
  display: none;
}
.wb-list-header {
  background: transparent;
}
.wb-list-footer {
  background: transparent;
}
.wb-list-header,
.wb-list-footer {
  padding-top: 12px;
  padding-bottom: 12px;
}
.wb-list-split .wb-list-item {
  border-bottom: 1px solid #e8eaec;
}
.wb-list-split .wb-list-item:last-child {
  border-bottom: none;
}
.wb-list-split .wb-list-header {
  border-bottom: 1px solid #e8eaec;
}
.wb-list-split .wb-list-footer {
  border-top: 1px solid #e8eaec;
}
.wb-list-large .wb-list-item {
  padding-top: 16px;
  padding-bottom: 16px;
}
.wb-list-small .wb-list-item {
  padding-top: 8px;
  padding-bottom: 8px;
}
.wb-list-vertical .wb-list-item {
  -webkit-box-align: initial;
  -ms-flex-align: initial;
  align-items: initial;
}
.wb-list-vertical .wb-list-item-main {
  display: block;
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
}
.wb-list-vertical .wb-list-item-extra {
  margin-left: 40px;
}
.wb-list-vertical .wb-list-item-meta {
  margin-bottom: 16px;
}
.wb-list-vertical .wb-list-item-meta-title {
  margin-bottom: 12px;
  color: rgba(0, 0, 0, 0.85);
  font-size: 16px;
  line-height: 24px;
}
.wb-list-vertical .wb-list-item-action {
  margin-top: 16px;
  margin-left: auto;
}
.wb-list-vertical .wb-list-item-action > li {
  padding: 0 16px;
}
.wb-list-vertical .wb-list-item-action > li:first-child {
  padding-left: 0;
}
.wb-list-item-no-flex {
  display: block;
}
.wb-list:not(.wb-list-vertical) .wb-list-item-no-flex .wb-list-item-action {
  float: right;
}
.wb-list-bordered {
  border: 1px solid #dcdee2;
  border-radius: 6px;
}
.wb-list-bordered .wb-list-header {
  padding-right: 24px;
  padding-left: 24px;
}
.wb-list-bordered .wb-list-footer {
  padding-right: 24px;
  padding-left: 24px;
}
.wb-list-bordered .wb-list-item {
  padding-right: 24px;
  padding-left: 24px;
  border-bottom: 1px solid #e8eaec;
}
.wb-list-bordered .wb-list-pagination {
  margin: 16px 24px;
}
.wb-list-bordered.wb-list-small .wb-list-item {
  padding-right: 16px;
  padding-left: 16px;
}
.wb-list-bordered.wb-list-small .wb-list-header,
.wb-list-bordered.wb-list-small .wb-list-footer {
  padding: 8px 16px;
}
.wb-list-bordered.wb-list-large .wb-list-header,
.wb-list-bordered.wb-list-large .wb-list-footer {
  padding: 16px 24px;
}
@media screen and (max-width: 768px) {
  .wb-list-item-action {
    margin-left: 24px;
  }
  .wb-list-vertical .wb-list-item-extra {
    margin-left: 24px;
  }
}
@media screen and (max-width: 576px) {
  .wb-list-item {
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
  }
  .wb-list-item-action {
    margin-left: 12px;
  }
  .wb-list-vertical .wb-list-item {
    -ms-flex-wrap: wrap-reverse;
    flex-wrap: wrap-reverse;
  }
  .wb-list-vertical .wb-list-item-main {
    min-width: 220px;
  }
  .wb-list-vertical .wb-list-item-extra {
    margin: auto auto 16px;
  }
}
</style>

