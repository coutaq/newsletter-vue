<template>
    <header-component></header-component>
    <router-view name="admin" v-slot="{ Component, route }">
        <transition :name="route.meta.transitionName" mode="out-in">
            <component :is="Component" />
        </transition>
    </router-view>
</template>
<script lang= "ts">
import { RouterLink } from "vue-router";
import HeaderComponent from "/@/components/Header.vue"
export default {
    components: {
        RouterLink, HeaderComponent

    }
};
</script>

<style>
</style>