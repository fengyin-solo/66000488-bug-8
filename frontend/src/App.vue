<template>
  <div class="app-container">
    <header class="app-header">
      <h1>🧬 蛋白质折叠构象采样与分析平台</h1>
      <p class="subtitle">Ramachandran图 · LJ势能计算 · 3D骨架可视化</p>
    </header>
    <main class="app-main">
      <ControlPanel @sample="handleSample" />

      <el-alert
        v-if="store.errorMessage"
        type="error"
        show-icon
        :closable="false"
        title="构象数据读取失败"
        :description="store.errorMessage"
      />

      <template v-if="store.result">
        <el-alert
          v-if="store.result.conformations.length === 0"
          type="info"
          show-icon
          :closable="false"
          title="没有构象记录"
          description="本次采样未返回任何构象，请重新生成。"
          style="margin-top: 16px"
        />
        <div v-else class="main-grid">
          <div class="plot-area"><RamachandranPlot /></div>
          <div class="viewer-area"><ProteinViewer3D /></div>
        </div>
        <ConformationTable v-if="store.result.conformations.length > 0" />
      </template>

      <el-empty
        v-else-if="!store.loading && !store.errorMessage"
        description="暂无构象数据，请先生成构象采样"
        style="margin-top: 40px"
      />
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
</style>
