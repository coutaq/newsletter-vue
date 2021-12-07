<template>
    <div style="width:50ch" class="m-auto">
        <div>This is the home page</div>
        <router-link to="/">Log out</router-link>
    </div>
</template>
<script lang= "ts">
import { RouterLink } from "vue-router";
export default {
    components: {
        RouterLink
    }
};
</script>

<style>
</style>