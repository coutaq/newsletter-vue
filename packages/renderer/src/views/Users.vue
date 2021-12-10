<template>
    <div class="noselect flex flex-col mt-8">
        <div class="py-2 -my-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
            <div class="pb-2">
                <button
                    @click="toggleAdd()"
                    class="bg-blue-500 w-full dark:bg-blue-800 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                >Добавить</button>
            </div>
            <div
                class="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 dark:border-gray-900 shadow sm:rounded-lg"
            >
                <table class="min-w-full">
                    <thead>
                        <tr>
                            <th
                                class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 dark:text-gray-100 uppercase border-b border-gray-200 dark:border-gray-900 bg-gray-50 dark:bg-gray-800"
                            >Id</th>
                            <th
                                class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 dark:text-gray-100 uppercase border-b border-gray-200 dark:border-gray-900 bg-gray-50 dark:bg-gray-800"
                            >ФИО</th>
                            <th
                                class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 dark:text-gray-100 uppercase border-b border-gray-200 dark:border-gray-900 bg-gray-50 dark:bg-gray-800"
                            >Логин</th>
                            <th
                                class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 dark:text-gray-100 uppercase border-b border-gray-200 dark:border-gray-900 bg-gray-50 dark:bg-gray-800"
                            >Почта</th>
                            <th
                                class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 dark:text-gray-100 uppercase border-b border-gray-200 dark:border-gray-900 bg-gray-50 dark:bg-gray-800"
                            >Действия</th>
                        </tr>
                    </thead>
                    <tbody class="bg-white dark:bg-gray-700">
                        <tr
                            @click="selected == user.id ? selected = -1 : selected = user.id"
                            v-for="user in users"
                            :key="user.id"
                            v-bind:class="{ 'bg-gray-300 dark:bg-gray-800 hover:bg-gray-300 hover:dark:bg-gray-800': selected == user.id }"
                            class="border hover:bg-gray-200 dark:hover:bg-gray-800"
                        >
                            <td
                                class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 dark:border-gray-900"
                            >
                                <div
                                    class="text-sm leading-5 text-gray-500 dark:text-gray-200"
                                >{{ user.id }}</div>
                            </td>
                            <td
                                class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 dark:border-gray-900"
                            >
                                <div class="flex items-center">
                                    <div class="flex-shrink-0 w-10 h-10">
                                        <img
                                            class="w-10 h-10 rounded-full"
                                            :src="user.image"
                                            alt="изображение пользователя"
                                        />
                                    </div>

                                    <div class="ml-4">
                                        <div
                                            class="text-sm font-medium leading-5 text-gray-900 dark:text-gray-100"
                                        >{{ user.name }}</div>
                                    </div>
                                </div>
                            </td>

                            <td
                                class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 dark:border-gray-900"
                            >
                                <div
                                    class="text-sm leading-5 text-gray-500 dark:text-gray-200"
                                >{{ user.login }}</div>
                            </td>

                            <td
                                class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 dark:border-gray-900"
                            >
                                <div
                                    class="text-sm leading-5 text-gray-500 dark:text-gray-200 dark:border-gray-900"
                                >{{ user.email }}</div>
                            </td>
                            <td class="whitespace-no-wrap border-b dark:border-gray-900">
                                <div
                                    class="flex items-center justify-center text-gray-800 dark:text-gray-200 dark:border-gray-900"
                                >
                                    <svg
                                        @click="saveToFile(user)"
                                        xmlns="http://www.w3.org/2000/svg"
                                        class="h-5 w-5 hover:text-purple-700"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fill-rule="evenodd"
                                            d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                                            clip-rule="evenodd"
                                        />
                                    </svg>
                                    <svg
                                        @click="toggleEdit(user.id)"
                                        xmlns="http://www.w3.org/2000/svg"
                                        class="h-5 w-5 hover:text-yellow-600"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"
                                        />
                                    </svg>
                                    <svg
                                        @click="deleteSelected(user)"
                                        xmlns="http://www.w3.org/2000/svg"
                                        class="h-5 w-5 hover:text-red-700"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fill-rule="evenodd"
                                            d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                            clip-rule="evenodd"
                                        />
                                    </svg>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>
<script lang= "ts">
import { RouterLink } from "vue-router";
import HeaderComponent from "/@/components/Header.vue"
import axios from "axios";
import { useSSRContext } from "@vue/runtime-core";
export default {
    data() {
        return {
            users: [],
            selected: -1
        }
    },
    components: {
        RouterLink, HeaderComponent

    },
    methods: {
        loadData() {
            var self = this;
            axios
                .get('http://109.254.85.64/newsletter/api/db/users').then(resp => {
                    console.log(resp)
                    self.users = resp.data
                })
        },
        deleteSelected(user) {
            if (confirm("Вы уверены что хотите удалить пользователя " + user.name + "?")) {
                var self = this;
                console.log("de;")
                var url = 'http://109.254.85.64/newsletter/api/db/users/' + user.id
                axios
                    .delete(url).then(resp => {
                        console.log(resp)
                        self.loadData()
                    })
            }
        },
        saveToFile(user) {
            window.ipcRenderer.send('save-model', JSON.stringify(user))
        },
        toggleAdd() {
            window.ipcRenderer.send('open-window', { route: "new-user", width: 400, height: 800 })
        },
        toggleEdit(id) {
            window.ipcRenderer.send('open-window', {
                route: 'edit-user/' + id, width: 400, height: 800
            })

        }
    },
    mounted() {
        window.ipcRenderer.receive('reload', () => {
            this.loadData()
        })
        this.loadData()
    }
};
</script>

<style>
</style>