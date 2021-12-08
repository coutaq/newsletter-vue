<template>
    <div
        v-bind:class="{ 'bg-gray-300 dark:bg-gray-700': this.$route.path.includes(route.href) }"
        @click="this.$router.push({ 'name': route.href })"
        @mouseover="showDropdown = true"
        @mouseleave="showDropdown = false"
        class="w-1/6 h-full align-text-bottom hover:bg-gray-300 dark:hover:bg-gray-700"
    >
        <h1 class="pt-5 text-lg">{{ route.title }}</h1>
        <div class="bg-gray-300 dark:bg-gray-700" v-show="showDropdown">
            <ol>
                <li
                    v-for="link in links"
                    @click="this.$router.push({ 'name': link.href })"
                >{{ link.title }}</li>
            </ol>
        </div>
    </div>
</template>
<script lang= "ts">
export default {
    props: ["route", "links"],
    data() {
        return {
            showDropdown: false
        }
    },
};
</script>

<style>
</style>