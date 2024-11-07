<template>
	<div>
	  <HeaderComponent />
	  <section class="profile">
		 <img src="@/assets/images/profile-avatar.png" alt="profile image" class="profile__avatar" />
		 
		 <div class="profile__data" v-if="userStore.profile">
			<h1>User Profile</h1>
 
			<!-- Данные пользователя в виде карточек -->
			<div class="profile__info">
			  <div v-for="(value, key) in userStore.profile" :key="key">
				 <p class="label">{{ formatLabel(key) }}</p>
				 <p class="value">{{ value || 'Not available' }}</p>
			  </div>
			</div>
 

			
 
			<!-- График активности пользователя -->
			<div class="activity-graph">
			  <h1>Activity</h1>
			  <canvas id="activityChart"></canvas>
			</div>
 
			<!-- Социальные сети -->
			<h1>Connect with me</h1>
			<div class="social-links">
			  <a href="https://facebook.com" target="_blank" class="social-icon">Facebook</a>
			  <a href="https://twitter.com" target="_blank" class="social-icon">Twitter</a>
			  <a href="https://linkedin.com" target="_blank" class="social-icon">LinkedIn</a>
			</div>
 
			<button class="btn" @click="goToMain">On Main</button>
		 </div>

		 <!-- Индикатор загрузки -->
		 <div v-else class="loading">Loading...</div>
	  </section>

	  <!-- Футер -->
	  <footer class="footer">
		<div class="footer-content">
		  <p><span>&copy; CryptoTracker Inc.</span> All rights reserved.</p>
		  <p><span>Contact us:</span> support@cryptotracker.com</p>
		  <p>Follow us on social media</p>
		</div>
	  </footer>
	</div>
 </template>
 
 <script lang="ts">
 import { defineComponent, onMounted } from 'vue';
 import { useUserStore } from '../stores/userStore';
 import HeaderComponent from '../components/HeaderComponent.vue';
 import { useRouter } from 'vue-router';
 import { Chart } from 'chart.js'; // Для графика активности
 
 export default defineComponent({
	components: { HeaderComponent },
	setup() {
	  const userStore = useUserStore();
	  const router = useRouter();
 
	  onMounted(() => {
		 if (!userStore.profile?.second_name) {
			userStore.fetchUserData();
		 }
 
		 new Chart("activityChart", {
			type: "line",
			data: {
			  labels: ["January", "February", "March", "April", "May", "June", "July"],
			  datasets: [{
				 label: "User Activity",
				 data: [65, 59, 80, 81, 56, 55, 40],
				 fill: false,
				 borderColor: "rgba(153, 24, 170, 1)",
				 tension: 0.1
			  }]
			},
		 });
	  });
 
	  const goToEditProfile = () => {
		 router.push({ name: 'EditProfile' });
	  };
 
	  const goToMain = () => {
		 router.push({ name: 'Main' });
	  };
 
	  const formatLabel = (key: string) => {
		 const labels: Record<string, string> = {
			first_name: 'First name',
			second_name: 'Second name',
			middle_name: 'Middle name',
			phone: 'Phone number'
		 };
		 return labels[key] || key;
	  };
 
	  return { userStore, goToMain, goToEditProfile, formatLabel };
	}
 });
 </script>
 
 <style scoped>
 .profile {
	margin: 110px auto;
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 30px;
	justify-content: center;
 }

 .profile__avatar {
	width: 150px;
	height: 150px;
	border-radius: 50%;
	object-fit: cover;
	margin-bottom: 20px;
 }

 .profile__data h1 {
	text-align: center;
	font-size: 36px;
	color: #fff;
	margin-bottom: 20px;
 }

 .profile__info {
	display: flex;
	flex-direction: column;
	width: 640px;
	background-color: #1e1e2e;
	padding: 40px;
	border-radius: 10px;
	box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
	text-align: center;
	justify-self: center;
	
 }



 .label {
	font-size: 16px;
	font-weight: bold;
	color: #fff;
 }

 .value {
	font-size: 16px;
	color: #ccc;
 }

  .btn {
	
	max-width: 250px;
	margin: 50px 230px;

 }

 .edit-profile button, .btn {
	font-size: 18px;
	width: 100%;
	padding: 15px;
	border-radius: 8px;
	background-color: #9918aa;
	border: none;
	color: #fff;
	cursor: pointer;
	transition: background-color 0.3s;
	
 }

 .edit-profile button:hover, .btn:hover {
	background-color: #9018a0;
 }

 .activity-graph {
	width: 680px;
	margin-top: 20px;
	background-color: #1e1e2e;
	padding: 20px;
	border-radius: 10px;
	box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
 }

 .social-links {
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	gap: 15px;
	margin-top: 20px;
 }

 .social-icon {
	font-size: 18px;
	font-weight: 700;
	color: #ffffff;
	text-decoration: none;
	padding: 12px 18px;
	background-color: #63E2B7;
	border-radius: 8px;
	transition: background-color 0.3s;
	min-width: 140px;
	text-align: center;
 }

 .social-icon:hover {
	background-color: #5bcfa9;
 }

 .loading {
	font-size: 24px;
	color: #fff;
	margin-top: 20px;
 }

 .footer {
	background-color: #111;
	padding: 20px;
	color: #ccc;
	text-align: center;
	margin-top: 40px;
	font-size: 18px;
 }

 .footer-content p {
	margin: 5px 0;
 }

 .footer p span {
	color: #63E2B7;
 }

	@media (max-width: 600px) {
 

  .profile__avatar {
    width: 120px;
    height: 120px;
  }

  .profile__data h1 {
    font-size: 28px;
  }

  .profile__info {
    width: 250px;
	 margin: 0 auto;
  }


  .label, .value {
    font-size: 14px;
  }

  .activity-graph{
	margin: 40px auto;
	width: 300px;
  }
 
  .social-icon {
    font-size: 14px;
    padding: 10px 14px;
    min-width: 90px;
  }

  .btn{
	
	margin: 50px 70px 0;

  }

  .footer {
    font-size: 16px;
  }}
 
</style>
