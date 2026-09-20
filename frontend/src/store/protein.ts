import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import axios from 'axios'
import type { Conformation, ProteinParams, SamplingResult } from '@/types'

export const useProteinStore = defineStore('protein', () => {
  const loading = ref(false)
  const result = ref<SamplingResult | null>(null)
  const selectedConformation = ref<Conformation | null>(null)
  const selectedRegion = ref('all')
  const errorMessage = ref('')
  let requestSerial = 0

  const visibleConformations = computed(() => {
    const conformations = result.value?.conformations ?? []
    if (selectedRegion.value === 'all') return conformations
    return conformations.filter(c => c.region === selectedRegion.value)
  })

  function isVisible(conformation: Conformation | null | undefined): boolean {
    return !!conformation && visibleConformations.value.some(c => c.id === conformation.id)
  }

  function clearSelection() {
    selectedConformation.value = null
  }

  function selectConformation(conformation: Conformation) {
    if (!result.value || !isVisible(conformation)) {
      clearSelection()
      return
    }

    selectedConformation.value =
      selectedConformation.value?.id === conformation.id ? null : conformation
  }

  function filterByRegion(region: string) {
    selectedRegion.value = region
    if (selectedConformation.value && !isVisible(selectedConformation.value)) {
      clearSelection()
    }
  }

  async function runSampling(params: ProteinParams) {
    const serial = ++requestSerial
    loading.value = true
    errorMessage.value = ''
    result.value = null
    selectedConformation.value = null
    selectedRegion.value = 'all'

    try {
      const { data } = await axios.post<SamplingResult>('/api/sample', params)
      if (serial !== requestSerial) return

      result.value = data
      selectedConformation.value = null
      selectedRegion.value = 'all'
    } catch (error) {
      if (serial !== requestSerial) return

      result.value = null
      selectedConformation.value = null
      selectedRegion.value = 'all'
      errorMessage.value = error instanceof Error ? error.message : '未知错误'
    } finally {
      if (serial === requestSerial) loading.value = false
    }
  }

  return {
    loading,
    result,
    selectedConformation,
    selectedRegion,
    errorMessage,
    visibleConformations,
    runSampling,
    selectConformation,
    filterByRegion,
    clearSelection
  }
})
