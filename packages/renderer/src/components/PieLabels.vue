<template>
    <g class="layer-labels">
        <g v-for="(p, i) in dataKeys" :key="i">
            <circle
                :fill="colors[dataKeys.indexOf(p)]"
                :cx="100 - 10"
                :cy="(dataKeys.length * 22 - dataKeys.indexOf(p) * 22) - 7"
                r="5"
            ></circle>
            <text
                :x="100"
                :y="dataKeys.length * 22 - dataKeys.indexOf(p) * 22"
                text-anchor="left"
                font-size="12"
            >{{ p.interest }} - {{ dataKeys.reduce((previousValue: Number = 0, currentValue) => previousValue + parseInt(currentValue)) }}</text>
        </g>
    </g>
</template>

<script lang="ts">
import { defineComponent, toRefs, ref } from 'vue'
export default defineComponent({
    name: 'Labels',
    props: {
        dataKeys: {
            type: Object as () => [string, string],
            required: true
        }, colors: []
    },
    setup(props) {
        const { dataKeys } = toRefs(props)
        var sum = 0
        const data = Object.assign({}, props.dataKeys);
        console.log("pr:", data)
        for (var key in data.entries) {
            console.log('key:', key)
            sum += parseInt(key.views)
        }
        console.log('sum', sum)
        var keysWithId = ref()
        return { dataKeys }
    }
})
</script>

<style scoped>
text {
    font-size: 1.25rem;
}
</style>
