<template>
  <div>
    <HeaderComponent />
    <section class="wrapper">
      <!-- Блоки с биржами -->
      <div class="blockBIRJ">
        <div class="block" @click="navigateToExchange('https://www.binance.com/')">
          <div class="block__header">
            <img src="@/assets/images/binance.png" alt="Binance" />
            <h3>Binance</h3>
          </div>
          <p>Search for profitable P2P <span>exchange</span> ads.</p>
        </div>

        <div class="block" @click="navigateToExchange('https://www.huobi.com/')">
          <div class="block__header">
            <img src="@/assets/images/huobi.png" alt="Huobi" />
            <h3>Huobi</h3>
          </div>
          <p>Search for profitable P2P <span>exchange</span> ads.</p>
        </div>

        <div class="block" @click="navigateToExchange('https://www.bybit.com/')">
          <div class="block__header">
            <img src="@/assets/images/bybit.png" alt="ByBit" />
            <h3>ByBit</h3>
          </div>
          <p>Search for profitable P2P <span>exchange</span> ads.</p>
        </div>
      </div>

      <!-- Блоки с криптокошельками -->
      <div class="blockBIRJ">
        <div class="block" @click="navigateToWalletSite('https://metamask.io/')" >
          <div class="block__header">
            <img src="@/assets/images/meta.jpg" alt="MetaMask" />
            <h3>MetaMask</h3>
          </div>
          <p>A popular <span>Ethereum-based</span> wallet for secure transactions.</p>
        </div>

        <div class="block" @click="navigateToWalletSite('https://www.coinbase.com/wallet')" >
          <div class="block__header">
            <img src="@/assets/images/coinbase.png" alt="Coinbase Wallet" />
            <h3>Coinbase Wallet</h3>
          </div>
          <p>Widely used for holding a variety of <span>cryptocurrencies</span>.</p>
        </div>

        <div class="block" @click="navigateToWalletSite('https://trustwallet.com/')" >
          <div class="block__header">
            <img src="@/assets/images/trust.jpg" alt="Trust Wallet" />
            <h3>Trust Wallet</h3>
          </div>
          <p>Supports a wide range of cryptocurrencies and <span>NFTs</span>.</p>
        </div>
      </div>

      <!-- График состояния рынка -->
      <div class="block chart">
        <h3>Market Overview</h3>
        <canvas id="marketChart"></canvas>
      </div>

      <!-- Часто задаваемые вопросы -->
      <div class="faq">
        <h3>Top FAQs about Cryptocurrency</h3>
        <ul>
          <li @click="toggleAnswer('faq1')">What is a cryptocurrency wallet? ↓</li>
          <div v-if="faqAnswers.faq1" class="answer">
            <p>A cryptocurrency wallet is a digital wallet used to store, send, and receive digital currencies like Bitcoin, Ethereum, and others.</p>
          </div>

          <li @click="toggleAnswer('faq2')">How to secure my crypto assets?↓ </li>
          <div v-if="faqAnswers.faq2" class="answer">
            <p>To secure your crypto assets, use strong passwords, enable two-factor authentication, and store your private keys offline in a safe place.</p>
          </div>

          <li @click="toggleAnswer('faq3')">What are the best wallets for beginners? ↓ </li>
          <div v-if="faqAnswers.faq3" class="answer">
            <p>Some of the best wallets for beginners include MetaMask, Coinbase Wallet, and Trust Wallet due to their user-friendly interfaces.</p>
          </div>

          <li @click="toggleAnswer('faq4')">How to connect a wallet to a trading platform? ↓ </li>
          <div v-if="faqAnswers.faq4" class="answer">
            <p>To connect your wallet to a trading platform, you typically need to log in to the platform, go to the wallet section, and follow the prompts to link your wallet.</p>
          </div>
        </ul>
      </div>

      <!-- Кнопка для подключения кошелька -->
      <div class="connect-wallet">
        <button class="action-button" @click="showModal = true">
          Connect Existing Crypto Wallet
        </button>
        <p>You can connect an existing cryptocurrency wallet here.</p>
      </div>
    </section>

    <!-- Модальное окно для ввода данных криптокошелька -->
    <div v-if="showModal" class="modal">
      <div class="modal-content">
        <span class="close" @click="showModal = false">&times;</span>
        <h3>Connect Your Crypto Wallet</h3>
        <input type="text" placeholder="Enter wallet address" class="textarea"/>
        <button class="action-button" @click="connectWallet">Connect Wallet</button>
      </div>
    </div>

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
import { defineComponent, onMounted, ref } from 'vue';
import { useUserStore } from '../stores/userStore';
import HeaderComponent from '../components/HeaderComponent.vue';
import { useRouter } from 'vue-router';
import Chart from 'chart.js/auto';

export default defineComponent({
  components: { HeaderComponent },
  setup() {
    const userStore = useUserStore();
    const router = useRouter();
    const showModal = ref(false);
    
    // Уточнение типа faqAnswers
    const faqAnswers = ref({
      faq1: false,
      faq2: false,
      faq3: false,
      faq4: false
    } as Record<'faq1' | 'faq2' | 'faq3' | 'faq4', boolean>);

    onMounted(() => {
      userStore.fetchUserData();
      setupChart();
    });

    const toggleAnswer = (faq: 'faq1' | 'faq2' | 'faq3' | 'faq4') => {
      faqAnswers.value[faq] = !faqAnswers.value[faq];
    };

    const navigateToExchange = (url: string) => {
      window.open(url, '_blank');
    };

    const navigateToWalletSite = (url: string) => {
      window.open(url, '_blank');
    };

    const connectWallet = () => {
      showModal.value = false;
      alert("Wallet connected!");
    };
    
    const setupChart = () => {
      const ctx = (document.getElementById('marketChart') as HTMLCanvasElement)?.getContext('2d');
      if (ctx) {
        new Chart(ctx, {
          type: 'line',
          data: {
            labels: ['BTC', 'ETH', 'ADA', 'XRP', 'DOT'],
            datasets: [{
              label: 'Price in USD',
              data: [450, 300, 1.5, 0.75, 20],
              borderColor: '#9918aa',
              backgroundColor: 'rgba(153, 24, 170, 0.3)',
              fill: true
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                display: true,
                position: 'top',
                labels: { color: '#fff' }
              }
            },
            scales: {
              x: {
                ticks: {
                  color: '#fff',
                },
                min: 0,
                max: 500,
                beginAtZero: true,
              },
              y: {
                ticks: {
                  color: '#fff',
                  callback: function(tickValue: string | number) {
                    const value = typeof tickValue === 'number' ? tickValue : parseFloat(tickValue);
                    return value % 50 === 0 ? value : '';
                  }
                },
                min: 0,
                max: 500,
                beginAtZero: true,
              }
            }
          }
        });
      }
    };

    return { showModal, connectWallet, toggleAnswer, faqAnswers, navigateToExchange, navigateToWalletSite };
  }
});
</script>


<style scoped>
.wrapper {
  display: flex;
  margin: 60px auto;
  gap: 20px;
  flex-direction: column;
  max-width: 1200px;
}

.blockBIRJ{
  display: flex;
  gap: 100px;
}

.block, .chart, .faq, .connect-wallet {
  background-color: #1e1e2e;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.3);
  color: #e4e4e4;
  text-align: center;
  font-size: 20px;
}

.block__header {
  display: flex;
  column-gap: 40px;
  align-items: center;
}

.block__header img {
  width: 92px;
  height: 92px;
  object-fit: cover;
  border-radius: 26%;
}

.block__header h3 {
  font-size: 23px;
  line-height: 1.26;
  font-weight: 600;
  color: #fff;
}

.block p {
  font-size: 28px;
  line-height: 1.32;
  font-weight: 700;
  color: #fff;
}

.block p span {
  color: #63E2B7;
}
.chart {
  background-color: #1e1e2e;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.3);
  color: #e4e4e4;
  text-align: center;
  height: 550px;
  overflow: hidden;
}

.chart canvas {
  width: 100%;
  height: 100%;
}

.action-button {
  background-color: #9918aa;
  border: none;
  padding: 10px 16px;
  color: white;
  font-size: 18px;
  border-radius: 6px;
  cursor: pointer;
  transition: 0.3s ease;
}

.action-button:hover {
  background-color: #9018a0;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
}

.modal-content {
  background-color: #333;
  padding: 25px;
  width: 320px;
  border-radius: 8px;
  position: relative;
  color: #e4e4e4;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap:20px;
}

.textarea{
height: 30px;
width: 250px;
border-radius: 10px;
border: none;
padding: 5px 10px;
}



.modal-content .close {
  position: absolute;
  top: 10px;
  right: 15px;
  font-size: 24px;
  cursor: pointer;
  color: #9918aa;
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

.faq {
  background-color: #1e1e2e;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.3);
  font-size: 20px;
}

.faq ul {
  list-style-type: none;
  padding: 0;
}

.faq ul li {
  color: #e4e4e4;
  margin: 10px 0;
}

@media (max-width: 768px) {
  .wrapper {
    padding: 20px;
  }

  .blockBIRJ {
    flex-direction: column;
    gap: 10px; 
  }

  .block {
    margin-bottom: 20px;
  }

  .chart {
    height: 400px; 
  }

  .modal-content {
    max-width: 300px;
  }

  .footer {
    font-size: 16px; 
  }

  .faq ul li {
    font-size: 18px; 
  }

  .action-button {
    font-size: 16px; 
  }

  .block__header {
    flex-direction: column;
    text-align: center; 
  }

  .block__header img {
    margin-bottom: 10px; 
  }

  .faq ul li {
    font-size: 16px;
  }
}


</style>
