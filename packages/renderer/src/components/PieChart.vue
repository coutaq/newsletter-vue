<template >
    <Chart
        class="pie"
        direction="circular"
        :size="{ width: 650, height: 400 }"
        :data="data"
        :margin="{
            left: Math.round((650 - 360) / 2),
            top: 20,
            right: 0,
            bottom: 20
        }"
        :config="{ controlHover: false }"
    >
        <template #layers>
            <PieLabels :dataKeys="data" :colors="colors" />
            <Pie
                :dataKeys="dataKeys"
                :pie-style="{
                    innerRadius: 100, padAngle: 0.05, colors
                }"
            />
        </template>
        <template #widgets>
            <Tooltip
                :config="{
                    name: {},
                    views: { label: 'Просмотры' },
                    interest: { label: 'Интерес' },
                }"
                hideLine
            />
        </template>
    </Chart>
</template>

<script lang="ts">
import { defineComponent, ref, toRefs } from 'vue'
import { Chart, Pie, Tooltip } from 'vue3-charts'
import PieLabels from './PieLabels.vue'

export default defineComponent({
    props: ['data', 'dataKeys'],
    name: 'PieChart',
    components: { Chart, Pie, Tooltip, PieLabels },
    setup(props) {
        var d = props.dataKeys
        const { data, dataKeys } = toRefs(props)
        console.log("data", d)
        var colors = []
        d.forEach(el => {
            colors.push("#" + Math.floor(Math.random() * 16777215).toString(16));
        })

        return { data, dataKeys, colors }
    }
})
</script>

<style>
.pie > svg > .axis {
    display: none !important;
}
</style>