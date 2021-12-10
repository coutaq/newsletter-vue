<template>
    <div>
        <div
            class="inline-block min-w-full overflow-hidden align-middle mt-3 border-b border-gray-200 dark:border-gray-900 shadow sm:rounded-lg"
        >
            <h1
                class="py-2 text-xl dark:text-white dark:bg-gray-800"
            >Самые популярные посты за все время</h1>
            <table class="min-w-full">
                <thead>
                    <tr>
                        <th
                            class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 dark:text-gray-100 uppercase border-b border-gray-200 dark:border-gray-900 bg-gray-50 dark:bg-gray-800"
                        >№</th>
                        <th
                            class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 dark:text-gray-100 uppercase border-b border-gray-200 dark:border-gray-900 bg-gray-50 dark:bg-gray-800"
                        >Наименование</th>
                        <th
                            class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 dark:text-gray-100 uppercase border-b border-gray-200 dark:border-gray-900 bg-gray-50 dark:bg-gray-800"
                        >Ссылка</th>
                        <th
                            class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 dark:text-gray-100 uppercase border-b border-gray-200 dark:border-gray-900 bg-gray-50 dark:bg-gray-800"
                        >Просмотры</th>
                    </tr>
                </thead>
                <tbody class="bg-white dark:bg-gray-700">
                    <tr
                        v-for="post in posts"
                        :key="post.id"
                        class="border hover:bg-gray-200 dark:hover:bg-gray-800 dark:border-gray-900"
                    >
                        <td
                            class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 dark:border-gray-900"
                        >
                            <div
                                class="text-sm leading-5 text-gray-500 dark:text-gray-200"
                            >{{ post.id }}</div>
                        </td>
                        <td
                            class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 dark:border-gray-900"
                        >
                            <div class="ml-4">
                                <div
                                    class="text-sm font-medium leading-5 text-gray-900 dark:text-gray-100"
                                >{{ post.title }}</div>
                            </div>
                        </td>

                        <td
                            class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 dark:border-gray-900"
                        >
                            <div
                                class="text-sm leading-5 text-gray-500 dark:text-gray-200"
                            >{{ post.link }}</div>
                        </td>

                        <td
                            class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 dark:border-gray-900"
                        >
                            <div
                                class="text-sm leading-5 text-gray-500 dark:text-gray-200 dark:border-gray-900"
                            >{{ post.seen }}</div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div
            class="inline-block min-w-full overflow-hidden align-middle mt-3 border-b border-gray-200 dark:border-gray-900 shadow sm:rounded-lg"
        >
            <h1 class="py-2 text-xl dark:text-white dark:bg-gray-800">Матрица пользователей</h1>
            <table class="min-w-full">
                <thead>
                    <tr>
                        <th
                            class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 dark:text-gray-100 uppercase border-b border-gray-200 dark:border-gray-900 bg-gray-50 dark:bg-gray-800"
                        >Пользователь</th>
                        <th
                            v-for="field in users.fields"
                            class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 dark:text-gray-100 uppercase border-b border-gray-200 dark:border-gray-900 bg-gray-50 dark:bg-gray-800"
                        >Пост #{{ field }}</th>
                    </tr>
                </thead>
                <transition-group name="list" tag="tbody" class="bg-white dark:bg-gray-700">
                    <tr
                        v-for="entry in users.matrix"
                        :key="entry.user_id"
                        class="border hover:bg-gray-200 dark:hover:bg-gray-800 dark:border-gray-900"
                    >
                        <td
                            class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 dark:border-gray-900"
                        >
                            <div
                                class="text-sm leading-5 text-gray-500 dark:text-gray-200"
                            >{{ entry.user_id }}</div>
                        </td>
                        <td
                            v-for="cell in users.fields"
                            class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 dark:border-gray-900"
                        >
                            <div
                                class="text-sm leading-5 text-gray-500 dark:text-gray-200"
                            >{{ entry[cell] }}</div>
                        </td>
                    </tr>
                </transition-group>
            </table>
        </div>
    </div>
</template>
<script lang= "ts">
import { RouterLink } from "vue-router";
import HeaderComponent from "/@/components/Header.vue"
import axios from "axios";
export default {
    data() {
        return {
            posts: [],
            users: {}
        }
    },
    components: {
        RouterLink, HeaderComponent

    }, mounted() {
        var self = this
        axios.get("http://109.254.85.64/newsletter/api/getReport").then((res) => {
            console.log(res)
            var users = res.data.users
            var fields = Object.keys(users[0])
            console.log(users)
            self.posts = res.data.top_posts
            self.users = { 'fields': fields.splice(0, fields.length - 1), 'matrix': users }
        })
    }
};
</script>

<style>
</style>