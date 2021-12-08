<template>
    <div>
        v-bind:class="{ 'bg-gray-300 dark:bg-gray-700': this.$route.path == (route.href) }"
        @click="this.$router.push({ 'name': route.href })">
    </div>
</template>
<script lang= "ts">
export default {
    props: ["route"],
};
</script>

<style>
</style>