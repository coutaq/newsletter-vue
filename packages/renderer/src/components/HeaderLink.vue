<template>
    <div
        v-bind:class="{ 'bg-gray-300 dark:bg-gray-700': this.$route.path.includes(route.href) }"
        @click="this.$router.push({ 'name': route.href })"
        class="w-1/6 h-full align-text-bottom hover:bg-gray-300 dark:hover:bg-gray-700"
    >
        <h1 class="pt-5 text">{{ route.title }}</h1>
    </div>
</template>
<script lang= "ts">
export default {
    props: ["route"],

};
</script>

<style>
</style>