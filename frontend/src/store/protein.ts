import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import axios from 'axios'
import type { Conformation, SamplingResult, ProteinParams } from '@/types'

const REGION_VALUES = ['all', 'alpha-helix', 'beta-sheet', 'left-helix', 'disallowed'] as const

export const useProteinStore = defineStore('protein', () => {
  const loading = ref(false)
  const result = ref<SamplingResult | null>(null)
  const error = ref('')
  const selectedConformation = ref<Conformation | null>(null)
  const selectedRegion = ref<string>('all')

  // 当前区域筛选下实际可见的构象，表格与图都以此为准，避免三处各算各的
  const visibleConformations = computed<Conformation[]>(() => {
    const confs = result.value?.conformations ?? []
    return selectedRegion.value === 'all'
      ? confs
      : confs.filter(c => c.region === selectedRegion.value)
  })

  function isVisible(conf: Conformation | null): conf is Conformation {
    return !!conf && visibleConformations.value.some(c => c.id === conf.id)
  }

  // 选中项若已不在可见集合中（被区域筛选排除），同步取消选中
  function pruneSelection() {
    const current = selectedConformation.value
    if (current && !visibleConformations.value.some(c => c.id === current.id)) {
      selectedConformation.value = null
    }
  }

  async function runSampling(params: ProteinParams) {
    loading.value = true
    error.value = ''
    // 发起新批次前立即清掉旧批次的结果、选中项与筛选，
    // 避免加载期间或失败后把上一批的记录/高亮残留下来
    result.value = null
    selectedConformation.value = null
    selectedRegion.value = 'all'
    try {
      const { data } = await axios.post<SamplingResult>('/api/sample', params)
      if (!data || !Array.isArray(data.conformations)) {
        throw new Error('返回数据缺少构象记录')
      }
      result.value = data
      pruneSelection()
    } catch (e: unknown) {
      result.value = null
      selectedConformation.value = null
      error.value = axios.isAxiosError(e)
        ? `构象数据读取失败：${e.response?.statusText || e.message || '网络错误'}，请确认后端服务可用后重试。`
        : '构象数据读取失败，请调整参数后重试。'
    } finally {
      loading.value = false
    }
  }

  // 再次点击同一条记录即取消选中
  function selectConformation(conf: Conformation) {
    selectedConformation.value = selectedConformation.value?.id === conf.id ? null : conf
  }

  function clearSelection() {
    selectedConformation.value = null
  }

  function filterByRegion(region: string) {
    selectedRegion.value = (REGION_VALUES as readonly string[]).includes(region) ? region : 'all'
    pruneSelection()
  }

  return {
    loading,
    result,
    error,
    selectedConformation,
    selectedRegion,
    visibleConformations,
    isVisible,
    runSampling,
    selectConformation,
    clearSelection,
    filterByRegion,
  }
})
