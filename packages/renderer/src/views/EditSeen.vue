<template>
    <div class="noselect flex flex-col mt-8">
        <div class="py-2 -my-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
            <div class="grid grid-cols-1 gap-6">
                <label class="block">
                    <span class="text-gray-700">Пользователь</span>
                    <select
                        v-model="cat.user_id"
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    >
                        <option
                            v-for="user in users"
                            :value="user.id"
                            :selected="cat.user == user.name"
                        >{{ user.name }}</option>
                    </select>
                </label>
                <label class="block">
                    <span class="text-gray-700">Пост</span>
                    <select
                        v-model="cat.post_id"
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    >
                        <option
                            v-for="post in posts"
                            :value="post.id"
                            :selected="post.title == cat.post"
                        >{{ post.title }}</option>
                    </select>
                </label>
                <label class="block">
                    <span class="text-gray-700">Открыто?</span>
                    <select
                        v-model="cat.opened"
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    >
                        <option value="0" :selected="cat.opened = 0">Нет</option>
                        <option value="1" :selected="cat.opened = 1">Да</option>
                    </select>
                </label>
                <label class="block">
                    <div class="m t-3 text-center pb-3">
                        <button
                            @click="createCat"
                            class="w-full h-12 text-lg w-32 bg-blue-600 rounded text-white hover:bg-blue-700"
                        >Сохранить</button>
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
            users: [],
            posts: [],
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

            delete this.cat.user
            delete this.cat.post
            axios.put('http://109.254.85.64/newsletter/api/db/seen/' + this.id, this.cat).then((resp) => {
                console.log(resp)
            }).catch((e) => {
                alert("Такая категория уже существует!")
            })
            window.ipcRenderer.send('reload', '')
        }
    },
    async mounted() {
        this.cat = (await axios.get('http://109.254.85.64/newsletter/api/db/seen/' + this.id)).data
        this.users = (await axios.get('http://109.254.85.64/newsletter/api/db/dbusers')).data
        this.posts = (await axios.get('http://109.254.85.64/newsletter/api/db/posts')).data
        console.log(this.cat)
    }
};
</script>

<style>
</style>