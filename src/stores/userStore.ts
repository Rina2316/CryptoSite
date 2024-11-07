import { defineStore } from 'pinia';



// Моковые данные, которые вы хотите использовать
const mockUserData = {
  success: true,
  profile: {
    second_name: 'Wake',
    first_name: 'Alan',
    middle_name: 'Van',
    phone: '+91030988354'
  }
};

export const useUserStore = defineStore('user', {
  state: () => ({
    profile: {
      second_name: '',
      first_name: '',
      middle_name: '',
      phone: ''
    },
  }),
  actions: {
    // Вместо реального запроса используем моковые данные
    async fetchUserData() {
      try {
        // Симулируем успешный ответ с моковыми данными
        const response = mockUserData;

        if (response.success) {
          this.profile = response.profile;
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }
  }
});
