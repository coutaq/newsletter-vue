<template>
    <div
        style="cursor:default;"
        class="noselect absolute w-full h-16 flex text-lg bg-gray-200 dark:bg-gray-800 dark:text-white"
    >
        <header-link :route="{ 'title': 'Категории', 'href': 'categories' }"></header-link>
        <header-link :route="{ 'title': 'Интересы', 'href': 'interests' }"></header-link>
        <header-link :route="{ 'title': 'Посты', 'href': 'posts' }"></header-link>
        <header-link :route="{ 'title': 'Просмотры', 'href': 'seen' }"></header-link>
        <header-link :route="{ 'title': 'Пользователи', 'href': 'user_db' }"></header-link>
        <header-link :route="{ 'title': 'Администраторы', 'href': 'users' }"></header-link>
        <header-link :route="{ 'title': 'Отчет', 'href': 'reports' }"></header-link>
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