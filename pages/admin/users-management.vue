<template>
  <div class="container">
    <h1 class="header">Users List</h1>
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
            class="user-avatar"
        />
        <!-- User Info -->
        <div class="user-info">
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
              <span v-else>Loading...</span>
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
  background-color: #f7f7f7;
  padding: 20px;
}

.header {
  font-size: 24px;
  font-weight: bold;
  color: #333;
  margin-bottom: 20px;
}

.user-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

/* User Card */
.user-card {
  display: flex;
  align-items: center;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 15px;
}

.user-avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 15px;
  border: 2px solid #ccc;
}

.user-info {
  flex: 1;
}

.user-name {
  font-size: 18px;
  font-weight: bold;
  color: #444;
  margin-bottom: 5px;
}

.user-email {
  font-size: 14px;
  color: #777;
}

/* Roles Section */
.roles-container {
  display: flex;
  gap: 10px;
  margin-top: 10px;
}

.role-button {
  padding: 8px 12px;
  border-radius: 5px;
  font-size: 14px;
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
