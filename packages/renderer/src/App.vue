<template>
  <main class="flex flex-col items-center bg-gray-100 dark:bg-gray-900">
    <router-view v-slot="{ Component, route }">
      <transition :name="route.meta.transitionName" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "App",
  mounted() {
    window.ipcRenderer.receive('change-theme', () => {
      const html = document?.querySelector("html")
      if (html?.classList.contains("dark")) {
        html?.classList.remove("dark");
      } else {
        html?.classList.add("dark");
      }
    })
  }
});
</script>
<style>
:root {
  --top: 60px;
}
#app {
  font-family: Avenir Next Cyr Medium, Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: calc(80vh-var(--top));
}
main {
  height: 100vh;
}
</style>
