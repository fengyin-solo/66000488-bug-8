<template>
  <div class="app-container">
    <header class="app-header">
      <h1>🧬 蛋白质折叠构象采样与分析平台</h1>
      <p class="subtitle">Ramachandran图 · LJ势能计算 · 3D骨架可视化</p>
    </header>
    <main class="app-main">
      <ControlPanel @sample="handleSample" />
      <el-alert
        v-if="store.error"
        :title="store.error"
        type="error"
        show-icon
        :closable="false"
        class="state-alert"
      />
      <el-empty
        v-else-if="!store.result && store.loading"
        description="正在生成构象采样，请稍候…"
      />
      <el-empty
        v-else-if="!store.result"
        description="暂无构象记录：请在上方设置残基数与构象数量，点击「生成构象采样」获取数据。"
      />
      <template v-else-if="store.result">
        <div class="main-grid">
          <div class="plot-area"><RamachandranPlot /></div>
          <div class="viewer-area"><ProteinViewer3D /></div>
        </div>
        <ConformationTable />
      </template>
    </main>
  </div>
</template>

<script setup lang="ts">
import ControlPanel from "./components/ControlPanel.vue"
import RamachandranPlot from "./components/RamachandranPlot.vue"
import ProteinViewer3D from "./components/ProteinViewer3D.vue"
import ConformationTable from "./components/ConformationTable.vue"
import { useProteinStore } from "./store/protein"
import type { ProteinParams } from "./types"

const store = useProteinStore()
function handleSample(params: ProteinParams) { store.runSampling(params) }
</script>

<style>
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:system-ui,sans-serif;background:#f0f2f5}
.app-container{min-height:100vh}
.app-header{background:linear-gradient(135deg,#667eea,#764ba2);color:#fff;padding:24px 40px}
.app-header h1{font-size:1.8rem}
.subtitle{opacity:.85;margin-top:4px;font-size:.9rem}
.app-main{padding:20px 40px}
.main-grid{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-top:20px}
.state-alert{margin-top:16px}
</style>
