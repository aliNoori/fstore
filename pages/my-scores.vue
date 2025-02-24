<template>
  <SideBar/>
  <div class="scores-container">
    <div v-for="score in scores" :key="score.id" class="score-card">
      <div class="score-header">
        <div class="score-title">{{ $toPersian($formatPrice(score.score)) }} امتیاز</div>
        <div class="score-date"> تاریخ ایجاد: {{ $toPersian($toPersianDate(score.created_at))}}</div>
      </div>
      <div class="score-body">
        <p>بابت: {{ score.reason }}</p>
        <p>توضیحات : {{ score.description }}</p>
      </div>
<!--      <div class="score-footer">
        <div class="score-reason">{{ score.reason }}</div>
        <div class="score-actions">
          <a href="#">View Details</a>
        </div>
      </div>-->
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useNuxtApp } from '#app';

const scores = ref([]);
const { $axios,$formatPrice,$toPersian,$toPersianDate } = useNuxtApp(); // Inject Axios from the Nuxt context

const fetchScores = async () => {
  try {
    const response = await $axios.get('user/my/scores'); // Make sure the API URL is correct
    scores.value = response.data.scores;
  } catch (error) {
    console.error('Failed to fetch scores data:', error);
  }
};

onMounted(() => {
  fetchScores();
});
</script>



<style scoped>
body {
  font-family: 'Roboto', sans-serif;
  background-color: #f4f7f6;
  margin: 0;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}
.scores-container {
  margin-top: 80px;
  padding: 20Px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  max-width: 1200px;
  width: 100%;
}
.score-card {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: box-shadow 0.3s ease, transform 0.3s ease;
  position: relative;
}
.score-card:hover {
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
  transform: translateY(-5px);
}
.score-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 6px;
  background: linear-gradient(135deg, #007bff, #00c6ff);
}
.score-header {
  padding: 20px;
  color: #333;
}
.score-title {
  font-size: 20px;
  font-weight: 600;
  margin: 0;
}
.score-date {
  font-size: 14px;
  color: #888;
}
.score-body {
  padding: 20px;
  border-top: 1px solid #eee;
}
.score-body p {
  margin: 5px 0;
  font-size: 16px;
  color: #555;
}
.score-footer {
  padding: 20px;
  border-top: 1px solid #eee;
  background: #f9f9f9;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.score-reason {
  font-size: 14px;
  padding: 5px 10px;
  border-radius: 12px;
  background: #e0e0e0;
  color: #333;
}
.score-actions a {
  text-decoration: none;
  color: #fff;
  background: #28a745;
  padding: 10px 20px;
  border-radius: 30px;
  font-weight: bold;
  transition: background-color 0.3s ease;
}
.score-actions a:hover {
  background: #218838;
}
</style>
