<template>
    <div
        v-bind:class="{ 'bg-gray-300 dark:bg-gray-700': this.$route.path == route.href }"
        @click="this.$router.push(route.href)"
        class="w-1/6 h-full align-text-bottom hover:bg-gray-300 dark:hover:bg-gray-700"
    >
        <h1 class="pt-5 text-lg">{{ route.title }}</h1>
    </div>
</template>
<script lang= "ts">
export default {
    props: ["route"]
};
</script>

<style>
</style>