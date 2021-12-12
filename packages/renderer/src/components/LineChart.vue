<template >
    <Chart :axis="axis" :size="{ width: 600, height: 350 }" :margin="margin" :data="data">
        <template #layers>
            <Grid strokeDasharray="2,2" />
            <Area :dataKeys="dataKeys" type="monotone" :areaStyle="{ fill: 'url(#grad)' }" />
            <LabelsLayer :dataKeys="dataKeys" />
            <Line :dataKeys="dataKeys" />
        </template>
    </Chart>
    <defs>
        <linearGradient id="grad" gradientTransform="rotate(90)">
            <stop offset="0%" stop-color="#be90ff" stop-opacity="1" />
            <stop offset="100%" stop-color="white" stop-opacity="0.4" />
        </linearGradient>
    </defs>
</template>

<script lang="ts">
import { defineComponent, ref, toRefs } from 'vue'
import { Responsive, Chart, Line, Tooltip, Area, Grid, Marker } from 'vue3-charts'
import LabelsLayer from './LabelsLayer.vue'
export default defineComponent({
    props: ['data', 'dataKeys'],
    name: 'LineChart',
    components: { Responsive, Chart, Line, Tooltip, Area, Grid, Marker, LabelsLayer },
    setup(props) {
        const { data, dataKeys } = toRefs(props)
        const direction = ref('horizontal')
        const margin = ref({
            left: 100,
            top: 20,
            right: 100,
            bottom: 10
        })

        const axis = ref({
            primary: {
                type: 'band'
            },
            secondary: {
                domain: ['dataMin', 'dataMax + max(dataMax/10, 5)'],
                type: 'linear',
                ticks: 8
            }
        })

        return { data, direction, margin, dataKeys, axis }
    }
})
</script>

<style>
.axis > g {
    font-size: 1.25rem !important;
}
</style>