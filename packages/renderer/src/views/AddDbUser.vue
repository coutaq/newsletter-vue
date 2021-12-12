<template>
    <div class="noselect flex flex-col mt-8">
        <div class="py-2 -my-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
            <div class="grid grid-cols-1 gap-6">
                <label class="block">
                    <span class="text-gray-700">ФИО</span>
                    <input
                        v-model="cat.name"
                        type="text"
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                    <span
                        v-if="!cat.name && checked"
                        class="flex items-center font-medium tracking-wide text-red-500 mt-1 ml-1"
                    >Поле не может быть пустым!</span>
                </label>
                <label class="block">
                    <span class="text-gray-700">Пол</span>
                    <select
                        v-model="cat.gender"
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    >
                        <option value="М">М</option>
                        <option value="Ж">Ж</option>
                        <option value="-">-</option>
                    </select>
                </label>
                <label class="block">
                    <span class="text-gray-700">Возраст</span>
                    <input
                        v-model="cat.age"
                        type="text"
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                    <span
                        v-if="!cat.age && checked"
                        class="flex items-center font-medium tracking-wide text-red-500 mt-1 ml-1"
                    >Поле не может быть пустым!</span>
                </label>
                <label class="block">
                    <div class="m t-3 text-center pb-3">
                        <button
                            @click="createCat"
                            class="w-full h-12 text-lg w-32 bg-blue-600 rounded text-white hover:bg-blue-700"
                        >Добавить</button>
                    </div>
                </label>
            </div>
        </div>
    </div>
</template>
<script lang= "ts">
import { RouterLink } from "vue-router";
import axios from "axios";
export default {
    data() {
        return {
            checked: false,
            cat: {},
            image: null,
            fileLoaded: false
        }
    },
    components: {
        RouterLink

    },
    methods: {

        createCat() {

            this.checked = true
            if (!this.cat.name) return
            if (!this.cat.age) return
            if (!this.cat.gender) return


            axios.post('http://109.254.85.64/newsletter/api/db/dbusers', this.cat).then((resp) => {
                console.log(resp)
            }).catch((e) => {
                alert("Такая категория уже существует!")
            })
            window.ipcRenderer.send('reload', '')
        }
    },
    mounted() {
    }
};
</script>

<style>
</style>