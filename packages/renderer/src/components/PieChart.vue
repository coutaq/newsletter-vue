<template >
    <Chart
        class="pie"
        direction="circular"
        :size="{ width: 650, height: 400 }"
        :data="data"
        :margin="{
            left: Math.round((650 - 360) / 2) + 20,
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
        var d = props.data
        const { data, dataKeys } = toRefs(props)
        console.log("data", d)
        var colors = ['#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6',
            '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
            '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A',
            '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
            '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC',
            '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
            '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680',
            '#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933',
            '#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3',
            '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF'];
        // d.forEach(el => {
        //     colors.push("#" + Math.floor(Math.random() * 16777215).toString(16));
        // })

        return { data, dataKeys, colors }
    }
})
</script>

<style>
.pie > svg > .axis {
    display: none !important;
}
</style>