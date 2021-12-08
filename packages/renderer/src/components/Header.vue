<template>
    <div
        style="cursor:default;"
        class="noselect relative w-full h-16 flex text-lg bg-gray-200 dark:bg-gray-800 dark:text-white"
    >
        <header-link :route="{ 'title': 'Категории', 'href': 'categories' }" :links="[]"></header-link>
        <header-link :route="{ 'title': 'Интересы', 'href': 'interests' }" :links="[]"></header-link>
        <header-link
            :route="{ 'title': 'Пользователи', 'href': 'user-list' }"
            :links="[{
                'title': 'Список', 'href': 'user-list'
            }, { 'title': 'Добавить', 'href': 'user-new' }]"
        ></header-link>
    </div>
</template>
<script lang= "ts">
import HeaderLink from "/@/components/HeaderLink.vue";
export default {
    components: {
        HeaderLink,
    },
};
</script>

<style>
</style>