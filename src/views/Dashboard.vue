<template>
  <div class="w-full h-screen overflow-hidden flex bg-red-100">
    <div class="w-56 shrink-0 bg-white px-2 py-10">
      <div class="uppercase font-bold mb-6 px-4">Academy Portal</div>
      <MenuContainer>
        <MenuItem :is_active="route.name == 'dashboard'">Dashboard</MenuItem>
        <MenuItem :is_active="route.name == 'course'">Courses</MenuItem>
        <MenuItem :is_active="route.name == 'settings'">Settings</MenuItem>
      </MenuContainer>
    </div>

    <div class="h-screen overflow-y-auto px-6 py-10">
      <section class="w-full">
        <div>
          <h1>Dashboard</h1>
          You are welcome
          {{ user_account.email }}

          <div class="grid grid-cols-3 gap-6">
            <div v-for="(course, index) in getAvailableCourses" :key="index">
              {{ course.title }}
              <p>{{ course.price }}</p>
              <button class="bg-red-400 px-4 py-2 text-white rounded-xl">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { onMounted, ref } from "vue";
import MenuContainer from "../components/Menus/Container.vue";
import MenuItem from "../components/Menus/Item.vue";
import { useRoute } from "vue-router";

const user_account = ref({});
const getAvailableCourses = ref({});
const route = useRoute();

onMounted(() => {
  axios.defaults.headers.common = {
    Authorization: `Bearer ${localStorage.getItem("user_token")}`,
  };

  axios
    .get("https://aa.apis.micakin.com/api/students/account")
    .then((response) => {
      user_account.value = response.data.data;
    });
  axios
    .get("https://aa.apis.micakin.com/api/students/courses")
    .then((response) => {
      getAvailableCourses.value = response.data.data;
    });
});
</script>
