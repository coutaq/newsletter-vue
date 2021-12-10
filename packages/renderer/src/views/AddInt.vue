<template>
    <div class="noselect flex flex-col mt-8">
        <div class="py-2 -my-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
            <div class="grid grid-cols-1 gap-6">
                <label class="block">
                    <span class="text-gray-700">Наименование</span>
                    <input
                        v-model="cat.title"
                        type="text"
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                    <span
                        v-if="!cat.title && checked"
                        class="flex items-center font-medium tracking-wide text-red-500 mt-1 ml-1"
                    >Поле не может быть пустым!</span>
                </label>
                <label class="block">
                    <span class="text-gray-700">Категория</span>
                    <select
                        v-model="cat.category_id"
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    >
                        <option v-for="categ in categs" :value="categ.id">{{ categ.title }}</option>
                    </select>
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
            categs: [],
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
            if (!this.cat.title) return


            axios.post('http://109.254.85.64/newsletter/api/db/interests', this.cat).then((resp) => {
                console.log(resp)
            }).catch((e) => {
                alert("Такая категория уже существует!")
            })
            window.ipcRenderer.send('reload', '')
        }
    },
    async mounted() {
        this.categs = await (await axios.get('http://109.254.85.64/newsletter/api/db/categories')).data
        console.log(this.categs)
    }
};
</script>

<style>
</style>