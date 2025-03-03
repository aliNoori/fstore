<template>
  <SideBar/>
  <div class="container">
    <h1 class="header">لیست کاربران</h1>
    <div class="user-list">
      <div
          v-for="user in usersList"
          :key="user.id"
          class="user-card"
      >
        <!-- User Image -->
        <img
            :src="user.image ? `${config.public.API_BASE_URL}${user.image.path}` : '/default-avatar.png'"
            :alt="user.name"
            class="user-avatar-admin"
        />
        <!-- User Info -->
        <div class="user-info-admin">
          <h2 class="user-name">{{ user.name }}</h2>
          <p class="user-email">{{ user.email }}</p>
          <div class="roles-container">
            <button
                v-for="(role,index) in user.roles"
                :key="index"
                :class="['role-button', role.active ? 'role-active' : 'role-inactive']"
                @click="toggleRole(user.email, index)"
                :disabled="role.loading"
            >
              <span v-if="!role.loading">{{ role.name }}</span>
              <span v-else>در حال بارگزاری ...</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useNuxtApp, useRuntimeConfig } from "#app";

const { $axios } = useNuxtApp();
const usersList = ref([]);
const config = useRuntimeConfig();
// تبدیل داده به فرمت مناسب
function transformRoles(roles) {
  return roles.map((role) => ({
    name: role,
    active: true,
    loading: false,
  }));
}
async function fetchUsersList() {
  try {
    const response = await $axios.get("user/users/list");
    usersList.value = response.data.users_list.map((user) => ({
      ...user,
      roles:transformRoles(user.roles),
    }));
  } catch (error) {
    console.error(
        "Fetch users list error:",
        error.response ? error.response.data : error
    );
  }
}
// تغییر وضعیت نقش
async function toggleRole(email, roleIndex) {
  const user = usersList.value.find((u) => u.email === email);
  if (user) {
    const role = user.roles[roleIndex];
    if (role) {
      role.loading = true;
      try {
        const response = await $axios.post(`permissionRoleSetting/toggleRoles/${email}`, {
          role: role.name,
        });
        if (response.data.success) {
          role.active = !role.active;
        } else {
          console.error("Error toggling role:", response.data.message);
        }
      } catch (error) {
        console.error(
            "Toggle role error:",
            error.response ? error.response.data : error
        );
      } finally {
        role.loading = false;
      }
    }
  }
}

onMounted(() => {
  if (process.client) {
    fetchUsersList();
  }
});
</script>

<style scoped>
/* General Styles */
.container {
  min-height: 100vh;
  margin-top: 100px;
  /*background-color: #f7f7f7;*/
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.header {
  font-size: 24px;
  font-weight: bold;
  color: #333;
  margin-bottom: 20px;
}

.user-list {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 5px;
  margin-top: 0;
}

/* User Card */
.user-card {
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: space-between;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 15px;
  gap: 20px;
}

.user-card:nth-child(even) {
  background-color: #fff;
}

.user-card:nth-child(odd) {
  background-color: #00ffc31f;
}

.user-avatar-admin {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 5px;
  border: 2px solid #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
  font-size: .5rem;
}

.user-info-admin {
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 10px;

}
.user-name {
  font-size: 10px;
  font-weight: bold;
  color: #444;
  margin-bottom: 0;
}
.user-email {
  font-size: 10px;
  color: #777;
}

/* Roles Section */
.roles-container {
  display: flex;
  gap: 10px;
  margin-top: 0;
}

.role-button {
  padding: 5px;
  border-radius: 4px;
  font-size: 10px;
  cursor: pointer;
  transition: all 0.3s;
}

.role-active {
  background-color: #3182ce;
  color: #fff;
  border: none;
}

.role-inactive {
  background-color: #eee;
  color: #555;
  border: 1px solid #ddd;
}

.role-button:disabled {
  cursor: not-allowed;
  opacity: 0.6;
}
</style>
