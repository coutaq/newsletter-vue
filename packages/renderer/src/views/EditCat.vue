<template>
    <div class="noselect flex flex-col mt-8">
        <div class="py-2 -my-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
            <div class="grid grid-cols-1 gap-6">
                <label class="block">
                    <span class="text-gray-700">Наименование категории</span>
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
                <label>
                    <div class="mt-3 text-center pb-3">
                        <button
                            @click="createUser"
                            class="w-full h-12 text-lg w-32 bg-blue-600 rounded text-white hover:bg-blue-700"
                        >Редактировать</button>
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
    props: ['id'],
    data() {
        return {
            checked: false,
            cat: {},
        }
    },
    components: {
        RouterLink

    },
    methods: {

        createUser() {

            this.checked = true
            if (!this.cat.title) return
            console.log('tett')
            axios.put('http://109.254.85.64/newsletter/api/db/categories/' + this.id, this.cat).then((resp) => {
                console.log(resp)
            }).catch((e) => {
                alert("Произошла ошибка сервера!")
            })

            window.ipcRenderer.send('reload', '')
        },
    },
    created() {
        var self = this
        axios.get('http://109.254.85.64/newsletter/api/db/categories/' + this.id).then((res) => {
            console.log(res)
            self.cat = res.data
        })
    }
};
</script>

<style>
</style>