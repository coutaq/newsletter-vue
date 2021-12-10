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
                        >Id</th>
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
        <div
            class="inline-flex flex-row overflow-hidden mt-3 border-b border-gray-200 dark:border-gray-900 shadow sm:rounded-lg"
        >
            <div class="w-3/6">
                <h1 class="py-2 text-xl dark:text-white dark:bg-gray-800">График просмотров</h1>
                <line-chart :data="views" :data-keys="['date', 'views']"></line-chart>
            </div>
            <div class="w-3/6">
                <h1
                    class="py-2 text-xl dark:text-white dark:bg-gray-800"
                >Процент просмотров по интересам</h1>
                <pie-chart :data="views_by_interest" :data-keys="['interest', 'views']"></pie-chart>
            </div>
        </div>
    </div>
</template>
<script lang= "ts">
import { RouterLink } from "vue-router";
import HeaderComponent from "/@/components/Header.vue"
import axios from "axios";
import LineChart from "/@/components/LineChart.vue";
import PieChart from "/@/components/PieChart.vue";
export default {
    data() {
        return {
            posts: [],
            users: {},
            views: [],
            views_by_interest: []
        }
    },
    components: {
        RouterLink, HeaderComponent, LineChart, PieChart

    }, created() {
        console.log("loading data")
        var self = this
        axios.get("http://109.254.85.64/newsletter/api/getReport").then((res) => {
            console.log("loading data")
            console.log("test", res)
            var usersd = res.data.users
            if (Array.isArray(usersd)) {
                var fields = Object.keys(usersd[0])
            } else {
                var fields = Object.keys(usersd)
            }
            console.log('users: ', usersd)

            if (Array.isArray(res.data.top_posts)) {
                self.posts = res.data.top_posts
            } else {
                self.posts = [res.data.top_posts]
            }

            self.users = { 'fields': fields.splice(0, fields.length - 1), 'matrix': Array.isArray(usersd) ? usersd : [usersd] }
            if (Array.isArray(res.data.views)) {
                self.views = res.data.views
            } else {
                self.views = [res.data.views]
            }
            if (Array.isArray(res.data.views_by_interest)) {
                self.views_by_interest = res.data.views_by_interest
            } else {
                self.views_by_interest = [res.data.views_by_interest]
            }
        }).catch(e => {
            console.error("WTF: ", e)
        })
    }
};
</script>

<style>
</style>