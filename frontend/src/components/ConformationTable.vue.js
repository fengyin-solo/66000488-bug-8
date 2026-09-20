/// <reference types="../../node_modules/.vue-global-types/vue_3.5_0_0_0.d.ts" />
import { computed, ref, watch } from 'vue';
import { useProteinStore } from '../store/protein';
const store = useProteinStore();
// 与图共用同一份"筛选后可见"的记录，保证表里看不到的记录也不会在别处残留高亮
const confs = computed(() => store.visibleConformations);
const tableRef = ref();
function onRowClick(row) { store.selectConformation(row); }
// 选中项被筛选排除、手动取消或数据替换时，同步取消表格当前行高亮
watch(() => store.selectedConformation, (row) => {
    tableRef.value?.setCurrentRow(store.isVisible(row) ? row : null);
});
function tagType(r) {
    const m = { 'alpha-helix': 'success', 'beta-sheet': 'danger', 'left-helix': 'warning' };
    return m[r] || 'info';
}
function regionLabel(r) {
    const m = { 'alpha-helix': 'α-螺旋', 'beta-sheet': 'β-折叠', 'left-helix': '左手螺旋', 'disallowed': '禁阻区' };
    return m[r] || r;
}
function exportCSV() {
    const header = 'id,phi,psi,energy,region,cluster\n';
    const rows = confs.value.map(c => `${c.id},${c.phi},${c.psi},${c.energy},${c.region},${c.cluster}`).join('\n');
    const blob = new Blob([header + rows], { type: 'text/csv' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'conformations.csv';
    a.click();
}
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['table-header']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "panel" },
    ...{ style: {} },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "table-header" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
(__VLS_ctx.confs.length);
const __VLS_0 = {}.ElButton;
/** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    ...{ 'onClick': {} },
    size: "small",
    disabled: (__VLS_ctx.confs.length === 0),
}));
const __VLS_2 = __VLS_1({
    ...{ 'onClick': {} },
    size: "small",
    disabled: (__VLS_ctx.confs.length === 0),
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
let __VLS_4;
let __VLS_5;
let __VLS_6;
const __VLS_7 = {
    onClick: (__VLS_ctx.exportCSV)
};
__VLS_3.slots.default;
var __VLS_3;
const __VLS_8 = {}.ElTable;
/** @type {[typeof __VLS_components.ElTable, typeof __VLS_components.elTable, typeof __VLS_components.ElTable, typeof __VLS_components.elTable, ]} */ ;
// @ts-ignore
const __VLS_9 = __VLS_asFunctionalComponent(__VLS_8, new __VLS_8({
    ...{ 'onRowClick': {} },
    ref: "tableRef",
    data: (__VLS_ctx.confs),
    stripe: true,
    rowKey: "id",
    maxHeight: "360",
    highlightCurrentRow: true,
    emptyText: "当前区域下没有构象记录，请切换上方的区域筛选或重新生成采样。",
    size: "small",
}));
const __VLS_10 = __VLS_9({
    ...{ 'onRowClick': {} },
    ref: "tableRef",
    data: (__VLS_ctx.confs),
    stripe: true,
    rowKey: "id",
    maxHeight: "360",
    highlightCurrentRow: true,
    emptyText: "当前区域下没有构象记录，请切换上方的区域筛选或重新生成采样。",
    size: "small",
}, ...__VLS_functionalComponentArgsRest(__VLS_9));
let __VLS_12;
let __VLS_13;
let __VLS_14;
const __VLS_15 = {
    onRowClick: (__VLS_ctx.onRowClick)
};
/** @type {typeof __VLS_ctx.tableRef} */ ;
var __VLS_16 = {};
__VLS_11.slots.default;
const __VLS_18 = {}.ElTableColumn;
/** @type {[typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, ]} */ ;
// @ts-ignore
const __VLS_19 = __VLS_asFunctionalComponent(__VLS_18, new __VLS_18({
    prop: "id",
    label: "ID",
    width: "60",
}));
const __VLS_20 = __VLS_19({
    prop: "id",
    label: "ID",
    width: "60",
}, ...__VLS_functionalComponentArgsRest(__VLS_19));
const __VLS_22 = {}.ElTableColumn;
/** @type {[typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, ]} */ ;
// @ts-ignore
const __VLS_23 = __VLS_asFunctionalComponent(__VLS_22, new __VLS_22({
    prop: "phi",
    label: "φ (°)",
    width: "100",
}));
const __VLS_24 = __VLS_23({
    prop: "phi",
    label: "φ (°)",
    width: "100",
}, ...__VLS_functionalComponentArgsRest(__VLS_23));
__VLS_25.slots.default;
{
    const { default: __VLS_thisSlot } = __VLS_25.slots;
    const [{ row }] = __VLS_getSlotParams(__VLS_thisSlot);
    (row.phi.toFixed(2));
}
var __VLS_25;
const __VLS_26 = {}.ElTableColumn;
/** @type {[typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, ]} */ ;
// @ts-ignore
const __VLS_27 = __VLS_asFunctionalComponent(__VLS_26, new __VLS_26({
    prop: "psi",
    label: "ψ (°)",
    width: "100",
}));
const __VLS_28 = __VLS_27({
    prop: "psi",
    label: "ψ (°)",
    width: "100",
}, ...__VLS_functionalComponentArgsRest(__VLS_27));
__VLS_29.slots.default;
{
    const { default: __VLS_thisSlot } = __VLS_29.slots;
    const [{ row }] = __VLS_getSlotParams(__VLS_thisSlot);
    (row.psi.toFixed(2));
}
var __VLS_29;
const __VLS_30 = {}.ElTableColumn;
/** @type {[typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, ]} */ ;
// @ts-ignore
const __VLS_31 = __VLS_asFunctionalComponent(__VLS_30, new __VLS_30({
    prop: "energy",
    label: "LJ能量 (kcal/mol)",
    width: "150",
}));
const __VLS_32 = __VLS_31({
    prop: "energy",
    label: "LJ能量 (kcal/mol)",
    width: "150",
}, ...__VLS_functionalComponentArgsRest(__VLS_31));
__VLS_33.slots.default;
{
    const { default: __VLS_thisSlot } = __VLS_33.slots;
    const [{ row }] = __VLS_getSlotParams(__VLS_thisSlot);
    (row.energy.toFixed(3));
}
var __VLS_33;
const __VLS_34 = {}.ElTableColumn;
/** @type {[typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, ]} */ ;
// @ts-ignore
const __VLS_35 = __VLS_asFunctionalComponent(__VLS_34, new __VLS_34({
    prop: "region",
    label: "构象区域",
    width: "120",
}));
const __VLS_36 = __VLS_35({
    prop: "region",
    label: "构象区域",
    width: "120",
}, ...__VLS_functionalComponentArgsRest(__VLS_35));
__VLS_37.slots.default;
{
    const { default: __VLS_thisSlot } = __VLS_37.slots;
    const [{ row }] = __VLS_getSlotParams(__VLS_thisSlot);
    const __VLS_38 = {}.ElTag;
    /** @type {[typeof __VLS_components.ElTag, typeof __VLS_components.elTag, typeof __VLS_components.ElTag, typeof __VLS_components.elTag, ]} */ ;
    // @ts-ignore
    const __VLS_39 = __VLS_asFunctionalComponent(__VLS_38, new __VLS_38({
        type: (__VLS_ctx.tagType(row.region)),
        size: "small",
    }));
    const __VLS_40 = __VLS_39({
        type: (__VLS_ctx.tagType(row.region)),
        size: "small",
    }, ...__VLS_functionalComponentArgsRest(__VLS_39));
    __VLS_41.slots.default;
    (__VLS_ctx.regionLabel(row.region));
    var __VLS_41;
}
var __VLS_37;
const __VLS_42 = {}.ElTableColumn;
/** @type {[typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, ]} */ ;
// @ts-ignore
const __VLS_43 = __VLS_asFunctionalComponent(__VLS_42, new __VLS_42({
    prop: "cluster",
    label: "聚类",
}));
const __VLS_44 = __VLS_43({
    prop: "cluster",
    label: "聚类",
}, ...__VLS_functionalComponentArgsRest(__VLS_43));
var __VLS_11;
/** @type {__VLS_StyleScopedClasses['panel']} */ ;
/** @type {__VLS_StyleScopedClasses['table-header']} */ ;
// @ts-ignore
var __VLS_17 = __VLS_16;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            confs: confs,
            tableRef: tableRef,
            onRowClick: onRowClick,
            tagType: tagType,
            regionLabel: regionLabel,
            exportCSV: exportCSV,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
