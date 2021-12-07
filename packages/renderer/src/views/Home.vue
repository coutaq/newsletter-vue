<template>
    <div>
        <div class="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md flex items-center space-x-4">
            <h1>Welcome Home!</h1>
        </div>
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