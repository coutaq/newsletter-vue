<template>
    <div class="noselect flex flex-col mt-8">
        <div class="py-2 -my-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
            <div class="grid grid-cols-1 gap-6">
                <label class="block">
                    <span class="text-gray-700">ФИО</span>
                    <input
                        v-model="user.name"
                        type="text"
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                    <span
                        v-if="!user.name && checked"
                        class="flex items-center font-medium tracking-wide text-red-500 mt-1 ml-1"
                    >Поле не может быть пустым!</span>
                </label>
                <label class="block">
                    <span class="text-gray-700">Логин</span>
                    <input
                        v-model="user.login"
                        type="text"
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                    <span
                        v-if="!user.login && checked"
                        class="flex items-center font-medium tracking-wide text-red-500 mt-1 ml-1"
                    >Поле не может быть пустым!</span>
                </label>
                <label class="block">
                    <span class="text-gray-700">Почта</span>
                    <input
                        v-model="user.email"
                        type="text"
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                    <span
                        v-if="!user.email && checked"
                        class="flex items-center font-medium tracking-wide text-red-500 mt-1 mb-1 ml-1"
                    >Поле не может быть пустым!</span>
                    <!-- <span
                        v-if="!(user.email.includes('@') && user.email.includes('.')) && checked"
                        class="flex items-center font-medium tracking-wide text-red-500 ml-1"
                    >Некорректный электронный адрес!</span>-->
                </label>

                <label class="block">
                    <span class="text-gray-700">Пароль</span>
                    <input
                        v-model="user.password"
                        type="password"
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                    <!--<span
                        v-if="user.password.length < 8 && checked"
                        class="flex items-center font-medium tracking-wide text-red-500 mt-1 ml-1"
                    >Пароль слишком короткий!</span>-->
                </label>
                <label class="block">
                    <div class="p-3">
                        <div class="mb-2">
                            <span>Изображение</span>
                            <div
                                class="relative h-40 rounded-lg border-dashed border-2 border-gray-200 bg-white flex justify-center items-center hover:cursor-pointer"
                            >
                                <div class="absolute">
                                    <div v-if="!user.image" class="flex flex-col items-center">
                                        <i class="fa fa-cloud-upload fa-3x text-gray-200"></i>
                                        <span
                                            class="block text-gray-400 font-normal"
                                        >Перетяните сюда изображение</span>
                                        <span class="block text-gray-400 font-normal">или</span>
                                        <span class="block text-blue-400 font-normal">Выбрать файл</span>
                                    </div>
                                    <div v-else>
                                        <img class="object-contain h-36 w-full" :src="image.path" />
                                    </div>
                                </div>
                                <input
                                    type="file"
                                    class="h-full w-full opacity-0"
                                    id="file"
                                    @change="addFile"
                                    accept="image/*"
                                />
                            </div>
                        </div>
                        <div class="mt-3 text-center pb-3">
                            <button
                                @click="createUser"
                                class="w-full h-12 text-lg w-32 bg-blue-600 rounded text-white hover:bg-blue-700"
                            >Сохранить</button>
                        </div>
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
            user: {},
            image: {},
            fileLoaded: false
        }
    },
    components: {
        RouterLink

    },
    methods: {
        addFile(event) {
            this.image = event.target.files[0]
            this.user.image = 'http://109.254.85.64/newsletter/assets/' + event.target.files[0].name
        },
        createUser() {

            this.checked = true
            if (!this.user.login) return
            if (!this.user.email) return
            if (!this.user.name) return
            if (!(this.user.email.includes('@') || this.user.email.includes('.'))) return
            axios.put('http://109.254.85.64/newsletter/api/db/users/' + this.id, this.user).then((resp) => {
                console.log(resp)
            }).catch((e) => {
                alert("Произошла ошибка сервера!")
            })
            if (this.fileLoaded) {
                this.uploadImage()
            }
            window.ipcRenderer.send('reload', '')
        },
        uploadImage() {
            const formData = new FormData()
            formData.append('file', this.renameFile(image, this.user.login + ".png"))
            axios.post('http://109.254.85.64/newsletter/api/upload-file', formData).then((resp) => {
                console.log(resp)

            }).catch((e) => {
                console.log(e)
            })
        },
        renameFile(originalFile, newName) {
            return new File([originalFile], newName, {
                type: originalFile.type,
                lastModified: originalFile.lastModified,
            });
        }
    },
    created() {
        var self = this
        axios.get('http://109.254.85.64/newsletter/api/db/users/' + this.id).then((res) => {
            console.log(res)
            self.user = res.data
            delete self.user.password
            self.image.path = self.user.image
            delete self.user.image
        })
    }
};
</script>

<style>
</style>