<script setup lang="ts">
import { computed, ref } from 'vue'
import { CheckOutlined, SkinOutlined } from '@ant-design/icons-vue'
import { useThemeStore } from '@/stores/theme'
import { COLOR_THEMES, type ColorThemeName } from '@/styles/theme'

/**
 * 打开风格弹窗，用缩略图选择系统配色。
 */
const props = withDefaults(
  defineProps<{
    /** 浅色底上的触发按钮（登录卡片）。 */
    light?: boolean
    /** 仅保留弹窗，由外层菜单打开。 */
    hideTrigger?: boolean
  }>(),
  { light: false, hideTrigger: false }
)

const themeStore = useThemeStore()
const current = computed(() => themeStore.name)
const open = ref(false)

/**
 * 打开风格选择弹窗。
 */
function openPicker() {
  open.value = true
}

defineExpose({ openPicker })

/**
 * 选中风格并写入本地存储。
 * @param name 主题键
 */
function pick(name: ColorThemeName) {
  themeStore.setTheme(name)
}
</script>

<template>
  <div class="theme-switch" :class="{ 'on-light': props.light, 'hidden-host': props.hideTrigger }">
    <a-button v-if="!props.hideTrigger" class="theme-switch-btn" :ghost="!props.light" @click="open = true">
      <template #icon><SkinOutlined /></template>
      切换风格
    </a-button>
    <a-modal
      v-model:open="open"
      centered
      :footer="null"
      :width="900"
      wrap-class-name="theme-picker-modal"
    >
      <template #title>
        <div class="om-title-mark picker-title">选择系统风格</div>
      </template>
      <p class="picker-lead">点缩略图即可切换，选择会保存在本机。</p>
      <div class="theme-grid">
        <button
          v-for="item in COLOR_THEMES"
          :key="item.name"
          type="button"
          class="theme-card"
          :class="{ selected: current === item.name }"
          @click="pick(item.name)"
        >
          <span v-if="current === item.name" class="theme-check" aria-hidden="true">
            <CheckOutlined />
          </span>
          <div class="theme-thumb" :class="'thumb-' + item.name">
            <div class="thumb-sider">
              <span class="thumb-logo">OM</span>
              <span class="thumb-nav" />
            </div>
            <div class="thumb-main">
              <div class="thumb-header">
                <span class="thumb-htitle" />
                <span class="thumb-user" />
              </div>
              <div class="thumb-body">
                <div class="thumb-rail" />
                <div class="thumb-table">
                  <div class="thumb-th" />
                  <div class="thumb-row" />
                  <div class="thumb-row" />
                  <div class="thumb-row" />
                </div>
                <div class="thumb-btn" />
              </div>
            </div>
          </div>
          <div class="theme-meta">
            <p class="theme-name">{{ item.label }}</p>
            <p class="theme-desc">{{ item.desc }}</p>
          </div>
        </button>
      </div>
    </a-modal>
  </div>
</template>

<style scoped>
.picker-title {
  font-family: var(--display);
  font-size: 20px;
  font-weight: 600;
}

.picker-lead {
  margin: 0 0 24px;
  font-size: 14px;
  color: var(--mute);
}

.theme-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 20px;
}

@media (max-width: 720px) {
  .theme-grid {
    grid-template-columns: 1fr;
  }
}

.theme-card {
  position: relative;
  padding: 16px 16px 18px;
  border: 1px solid var(--line);
  border-radius: 14px;
  background: var(--panel);
  box-shadow: var(--shadow);
  cursor: pointer;
  text-align: left;
}

.theme-card:hover {
  border-color: var(--accent);
}

.theme-card.selected {
  border-color: var(--accent);
  box-shadow: 0 12px 28px var(--input-ring);
}

.theme-check {
  position: absolute;
  top: 12px;
  right: 12px;
  z-index: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: var(--accent);
  color: #fff;
  font-size: 15px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.18);
}

.theme-thumb {
  display: flex;
  height: 176px;
  overflow: hidden;
  border-radius: 10px;
  border: 1px solid var(--line);
}

.thumb-sider {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 42px;
  padding-top: 10px;
  flex-shrink: 0;
}

.thumb-logo {
  display: block;
  width: 22px;
  height: 22px;
  margin-bottom: 12px;
  border-radius: 4px;
  background: #fff;
  color: transparent;
  font-size: 0;
}

.thumb-nav {
  display: block;
  width: 26px;
  height: 18px;
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.28);
}

.thumb-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.thumb-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 28px;
  padding: 0 10px;
  flex-shrink: 0;
}

.thumb-htitle {
  width: 48px;
  height: 8px;
  border-radius: 2px;
  background: rgba(255, 255, 255, 0.55);
}

.thumb-user {
  width: 36px;
  height: 8px;
  border-radius: 2px;
  background: rgba(255, 255, 255, 0.35);
}

.thumb-body {
  flex: 1;
  padding: 12px;
}

.thumb-rail {
  height: 16px;
  margin-bottom: 10px;
  border-radius: 3px;
}

.thumb-table {
  padding: 6px;
  border-radius: 4px;
  background: #fff;
}

.thumb-th {
  height: 8px;
  margin-bottom: 8px;
  border-radius: 2px;
  opacity: 0.85;
}

.thumb-row {
  height: 7px;
  margin-bottom: 6px;
  border-radius: 2px;
  background: rgba(0, 0, 0, 0.07);
}

.thumb-row:last-child {
  margin-bottom: 0;
}

.thumb-btn {
  width: 48px;
  height: 12px;
  margin-top: 10px;
  border-radius: 4px;
}

.thumb-blue {
  background: #eef3f9;
}

.thumb-blue .thumb-sider,
.thumb-blue .thumb-header {
  background: #0f2744;
}

.thumb-blue .thumb-logo {
  background: #1f6feb;
}

.thumb-blue .thumb-rail {
  background: #e8f1fb;
  border-left: 4px solid #1f6feb;
}

.thumb-blue .thumb-th {
  background: #e8f1fb;
}

.thumb-blue .thumb-btn {
  background: #1f6feb;
}

.thumb-wine {
  background: #f7f1f2;
}

.thumb-wine .thumb-sider,
.thumb-wine .thumb-header {
  background: #4a1520;
}

.thumb-wine .thumb-logo {
  background: #94243a;
}

.thumb-wine .thumb-rail {
  background: #f3e6e9;
  border-left: 4px solid #94243a;
}

.thumb-wine .thumb-th {
  background: #f3e6e9;
}

.thumb-wine .thumb-btn {
  background: #94243a;
}

.thumb-night {
  background: #0c0b0a;
}

.thumb-night .thumb-sider,
.thumb-night .thumb-header {
  background: #080706;
}

.thumb-night .thumb-logo {
  background: #e08b4d;
}

.thumb-night .thumb-rail {
  background: #1c1916;
  border-left: 4px solid #e08b4d;
}

.thumb-night .thumb-table {
  background: #141210;
}

.thumb-night .thumb-th {
  background: #1c1916;
}

.thumb-night .thumb-row {
  background: rgba(240, 230, 216, 0.12);
}

.thumb-night .thumb-btn {
  background: #e08b4d;
}

.thumb-oz {
  background: #eaf3e4;
}

.thumb-oz .thumb-sider,
.thumb-oz .thumb-header {
  background: #0a3d2a;
}

.thumb-oz .thumb-logo {
  background: #147a4e;
}

.thumb-oz .thumb-rail {
  background: #e3eed8;
  border-left: 4px solid #d4a017;
}

.thumb-oz .thumb-th {
  background: #e3eed8;
}

.thumb-oz .thumb-btn {
  background: #147a4e;
}

.theme-meta {
  margin-top: 14px;
  text-align: center;
}

.theme-name {
  margin: 0;
  font-family: var(--display);
  font-size: 18px;
  font-weight: 600;
  color: var(--ink);
}

.theme-desc {
  margin: 6px 0 0;
  font-size: 13px;
  color: var(--mute);
}
</style>
