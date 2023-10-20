<script setup>
import { handleError } from "vue";
import { toast } from "vue3-toastify";
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

const router = useRouter();

const showEmail = () => {
  toast(
    error.response.data.errors[Object.keys(error.response.data.errors)[0]][0],
    {
      autoClose: 1000,
      position: toast.POSITION.BOTTOM_RIGHT,
    }
  );
};

const formIsLoading = ref(false);

const handleLogin = () => {
  formIsLoading.value = true;
  axios
    .post("https://aa.apis.micakin.com/api/students/auth/register", {
      email: email.value,
      username: username.value,
      password: password.value,
    })
    .then((success) => {
      formIsLoading.value = false;
      localStorage.setItem("user_token", success.data.data.token);

      router.push({ name: "dashboard" });
    })
    .catch((error) => {
      formIsLoading.value = false;

      toast(
        error.response.data.errors[
          Object.keys(error.response.data.errors)[0]
        ][0],
        {
          autoClose: 6000,
          position: toast.POSITION.BOTTOM_RIGHT,
        }
      );
    });
};

const email = ref("");
const username = ref("");
const password = ref("");
</script>

<template>
  <main>
    <section
      class="bg-blue-100 w-full min-h-screen flex items-center justify-center"
    >
      <div class="w-full">
        <div class="max-w-md bg-white mx-auto py-12 px-6 rounded-xl">
          <div>
            <h1 class="text-2xl font-bold my-6 text-center">User Register</h1>
          </div>
          <form
            @submit.prevent="handleLogin"
            class="max-w-xs mx-auto flex flex-col gap-4"
          >
            <div>
              <label class="text-xs uppercase text-black text-opacity-60"
                >Email</label
              >
              <input
                v-model="email"
                class="border border-black outline-none w-full px-4 py-3 rounded-xl"
              />
            </div>

            <div>
              <label class="text-xs uppercase text-black text-opacity-60"
                >Username</label
              >
              <input
                v-model="username"
                class="border border-black outline-none w-full px-4 py-3 rounded-xl"
              />
            </div>
            <div>
              <label class="text-xs uppercase text-black text-opacity-60"
                >Password</label
              >
              <input
                v-model="password"
                class="border border-black outline-none w-full px-4 py-3 rounded-xl"
              />
            </div>

            <div>
              <button
                type="submit"
                class="bg-blue-600 text-white text-sm uppercase text-center p-4 w-full rounded-xl flex justify-center items-center"
              >
                <div class="w-6" v-if="formIsLoading">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    width="100%"
                    height="100%"
                    viewBox="0 0 100 100"
                    preserveAspectRatio="xMidYMid"
                  >
                    <circle
                      cx="50"
                      cy="50"
                      fill="none"
                      stroke="white"
                      stroke-width="10"
                      r="35"
                      stroke-dasharray="164.93361431346415 56.97787143782138"
                    >
                      <animateTransform
                        attributeName="transform"
                        type="rotate"
                        repeatCount="indefinite"
                        dur="1s"
                        values="0 50 50;360 50 50"
                        keyTimes="0;1"
                      ></animateTransform>
                    </circle>
                  </svg>
                </div>

                <div>SignUp</div>
              </button>
            </div>
            {{ email }} {{ username }} {{ password }}
          </form>
        </div>
      </div>
    </section>
  </main>
</template>
