<template>
    <div class="noselect flex flex-col mt-8">
        <div class="py-2 -my-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
            <form></form>
        </div>
    </div>
</template>
<script lang= "ts">
import { RouterLink } from "vue-router";
import axios from "axios";
export default {
    data() {
        return {
            user: {},
        }
    },
    components: {
        RouterLink

    },
    methods: {
    }
};
</script>

<style>
</style>