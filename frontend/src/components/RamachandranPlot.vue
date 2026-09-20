<template>
  <div class="panel">
    <h3>📊 Ramachandran图 (φ-ψ 二面角空间)</h3>
    <canvas
      ref="cvs"
      width="500"
      height="500"
      class="plot-canvas"
      :class="{ clickable: confs.length > 0 }"
      @click="onPlotClick"
    ></canvas>
    <p v-if="confs.length === 0" class="empty-tip">当前筛选条件下没有可绘制的构象记录</p>
    <p v-else class="plot-tip">点击图中的点可选中或取消选中构象</p>
    <div class="legend">
      <span class="dot a"></span> α-螺旋 <span class="dot b"></span> β-折叠
      <span class="dot l"></span> 左手螺旋 <span class="dot d"></span> 禁阻区
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue"
import { useProteinStore } from "../store/protein"
import type { Conformation } from "../types"

const store = useProteinStore()
const cvs = ref<HTMLCanvasElement>()

const colors: Record<string,string> = {"alpha-helix":"#4ecdc4","beta-sheet":"#ff6b6b","left-helix":"#45b7d1","disallowed":"#ddd"}
const confs = computed(() => store.visibleConformations)
const selectedId = computed(() => store.selectedConformation?.id)

function pointPosition(cf: Pick<Conformation, 'phi' | 'psi'>, width: number, height: number) {
  return {
    x: ((cf.phi + 180) / 360) * width,
    y: height - ((cf.psi + 180) / 360) * height
  }
}

function draw() {
  const c = cvs.value
  if (!c) return
  const ctx = c.getContext("2d")!
  const W = c.width, H = c.height
  ctx.clearRect(0, 0, W, H)
  ctx.strokeStyle = "#e8e8e8"
  ctx.lineWidth = 1
  for (let a = -180; a <= 180; a += 30) {
    const x = ((a + 180) / 360) * W
    ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke()
    const y = ((a + 180) / 360) * H
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke()
  }
  ctx.fillStyle = "rgba(78,205,196,.08)"
  ctx.fillRect(((20) / 360) * W, ((120) / 360) * H, (70 / 360) * W, (70 / 360) * H)
  ctx.fillStyle = "rgba(255,107,107,.08)"
  ctx.fillRect(((225) / 360) * W, 0, (120 / 360) * W, (70 / 360) * H)
  ctx.strokeStyle = "#999"
  ctx.lineWidth = 2
  ctx.beginPath(); ctx.moveTo(0, H / 2); ctx.lineTo(W, H / 2); ctx.stroke()
  ctx.beginPath(); ctx.moveTo(W / 2, 0); ctx.lineTo(W / 2, H); ctx.stroke()
  ctx.fillStyle = "#666"
  ctx.font = "12px sans-serif"
  ctx.fillText("φ →", W - 30, H / 2 - 6)
  ctx.fillText("ψ ↑", W / 2 + 6, 16)

  if (confs.value.length === 0) {
    ctx.fillStyle = "#909399"
    ctx.font = "14px sans-serif"
    ctx.textAlign = "center"
    ctx.fillText("当前筛选条件下没有可绘制的构象记录", W / 2, H / 2)
    ctx.textAlign = "left"
    return
  }

  const energies = confs.value.map(c => c.energy)
  const eMin = Math.min(...energies)
  const eMax = Math.max(...energies)
  for (const cf of confs.value) {
    const { x, y } = pointPosition(cf, W, H)
    const t = (cf.energy - eMin) / (eMax - eMin || 1)
    const r = 3 + t * 3
    ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2)
    ctx.fillStyle = colors[cf.region] || "#999"
    ctx.fill()
    ctx.strokeStyle = "rgba(0,0,0,.1)"; ctx.stroke()
  }

  const selected = confs.value.find(cf => cf.id === selectedId.value)
  if (selected) {
    const { x, y } = pointPosition(selected, W, H)
    ctx.beginPath(); ctx.arc(x, y, 8, 0, Math.PI * 2)
    ctx.strokeStyle = "#333"; ctx.lineWidth = 3; ctx.stroke()
  }
}

function onPlotClick(event: MouseEvent) {
  const canvas = cvs.value
  if (!canvas || confs.value.length === 0) return

  const rect = canvas.getBoundingClientRect()
  const x = (event.clientX - rect.left) * canvas.width / rect.width
  const y = (event.clientY - rect.top) * canvas.height / rect.height
  let nearest: Conformation | null = null
  let nearestDistance = 12

  for (const cf of confs.value) {
    const point = pointPosition(cf, canvas.width, canvas.height)
    const distance = Math.hypot(point.x - x, point.y - y)
    if (distance < nearestDistance) {
      nearest = cf
      nearestDistance = distance
    }
  }

  if (nearest) {
    store.selectConformation(nearest)
  } else {
    store.clearSelection()
  }
}

onMounted(draw)
watch(() => [store.result, store.selectedConformation, store.selectedRegion], draw, { deep: true })
</script>

<style scoped>
.panel{background:#fff;border-radius:8px;padding:16px;box-shadow:0 2px 8px rgba(0,0,0,.08)}
.panel h3{margin-bottom:12px;color:#333}
.plot-canvas{display:block;margin:0 auto;border:1px solid #eee;border-radius:8px}
.plot-canvas.clickable{cursor:pointer}
.plot-tip,.empty-tip{text-align:center;margin:8px 0 0;font-size:13px;color:#909399}
.legend{display:flex;gap:16px;justify-content:center;margin-top:12px;font-size:13px}
.legend .dot{display:inline-block;width:12px;height:12px;border-radius:50%;margin-right:4px;vertical-align:middle}
.dot.a{background:#4ecdc4}.dot.b{background:#ff6b6b}.dot.l{background:#45b7d1}.dot.d{background:#ddd}
</style>
