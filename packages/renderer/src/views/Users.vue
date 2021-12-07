<template>
    <div class="noselect flex flex-col mt-8">
        <div class="py-2 -my-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
            <div
                class="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg"
            >
                <table class="min-w-full">
                    <thead>
                        <tr>
                            <th
                                class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50"
                            >№</th>
                            <th
                                class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50"
                            >ФИО</th>
                            <th
                                class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50"
                            >Логин</th>
                            <th
                                class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50"
                            >Почта</th>
                            <th
                                class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50"
                            >Действия</th>
                        </tr>
                    </thead>
                    <transition-group name="list" tag="tbody" class="bg-white">
                        <tr
                            @click="selected == user.id ? selected = -1 : selected = user.id"
                            v-for="user in users"
                            :key="user.id"
                            v-bind:class="{ 'bg-gray-300 hover:bg-gray-300': selected == user.id }"
                            class="border hover:bg-gray-200"
                        >
                            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                <div class="text-sm leading-5 text-gray-500">{{ user.id }}</div>
                            </td>
                            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
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
                                            class="text-sm font-medium leading-5 text-gray-900"
                                        >{{ user.name }}</div>
                                    </div>
                                </div>
                            </td>

                            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                <div class="text-sm leading-5 text-gray-500">{{ user.login }}</div>
                            </td>

                            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                <div class="text-sm leading-5 text-gray-500">{{ user.email }}</div>
                            </td>
                            <td>
                                <div class="flex items-center justify-center">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        class="h-5 w-5"
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
                                        xmlns="http://www.w3.org/2000/svg"
                                        class="h-5 w-5"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"
                                        />
                                    </svg>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        class="h-5 w-5"
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
                    </transition-group>
                </table>
            </div>
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
            users: [],
            selected: -1
        }
    },
    components: {
        RouterLink, HeaderComponent

    },
    methods: {
        handleInput(e) {
            if (e.key === "Backspace" || e.key === "Delete") {
                return e.preventDefault(); // Don't do anything to the input
            }
            const value = e.target.value;
            console.log(value);
            // do something with value
        },
        loadData() {
            var self = this;
            axios
                .get('http://localhost:5000/db/users').then(resp => {
                    self.users = resp.data
                })
        },
        deleteSelected(id) {
            console.log(id)
            // var self = this;
            // axios
            //     .delete('http://localhost:5000/db/users/' + self.selected).then(resp => {
            //         self.loadData()
            //     })
        }, handleDelete() {
            console.log("Backspace / Del pressed");
        }
    },
    mounted() {
        this.loadData()
    }
};
</script>

<style>
</style>