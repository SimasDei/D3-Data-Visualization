<template>
  <div class="content">
    <div class="container">
      <div class="Search__container">
        <input
          class="Search__input"
          @keyup.enter="requestData"
          placeholder="npm package name"
          type="search"
          name="search"
          v-model="pack"
        />
        <datepicker placeholder="Start Date" v-model="periodStart" name="start-date"></datepicker>
        <datepicker placeholder="End Date" v-model="periodEnd" name="end-date"></datepicker>
        <button class="Search__button" @click="requestData">Find</button>
      </div>
      <div class="error-message" v-if="showError">
        {{ errorMessage }}
      </div>
      <hr />
      <h1 class="title" v-if="loaded">{{ packageName }}</h1>
      <div class="Chart__container" v-if="loaded">
        <div class="Chart__title">
          Downloads per Day <span>{{ period }}</span>
          <hr />
        </div>
        <div class="Chart__content">
          <line-chart v-if="loaded" :chart-data="downloads" :chart-labels="labels"></line-chart>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios';
import Datepicker from 'vuejs-datepicker';
import { dateToDay, dateBeautify } from '@/utils/dateFormatter';

import LineChart from '@/components/LineChart.vue';

export default {
  name: 'Start',
  components: {
    LineChart,
    Datepicker,
  },
  data() {
    return {
      pack: null,
      packageName: '',
      loaded: false,
      rawData: null,
      downloads: [],
      downloadYear: [],
      labels: [],
      labelsYear: [],
      showError: false,
      errorMessage: 'Please enter a package name',
      periodStart: '',
      periodEnd: new Date(),
    };
  },
  mounted() {
    if (this.$route.params.package) {
      this.pack = this.$route.params.package;
      this.requestData();
    }
  },
  computed: {
    startDate() {
      return dateToDay(this.periodStart);
    },
    endDate() {
      return dateToDay(this.periodEnd);
    },
    period() {
      return this.periodStart ? `${this.startDate}:${this.endDate}` : 'last-month';
    },
    formattedPeriod() {
      return this.periodStart
        ? `${dateBeautify(this.startDate)} - ${dateBeautify(this.endDate)}`
        : 'last-month';
    },
  },
  methods: {
    requestData() {
      if (this.pack === null || this.pack === '' || this.pack === 'undefined') {
        this.showError = true;
        this.loading = false;
        return;
      }
      this.resetState();
      axios
        .get(`https://api.npmjs.org/downloads/range/${this.period}/${this.pack}`)
        .then((res) => {
          this.rawData = res.data.downloads;
          this.downloads = res.data.downloads.map(download => download.downloads);
          this.labels = res.data.downloads.map(download => download.day);
          this.packageName = res.data.package;
          this.formatYear();
          this.setUrl();
          this.loaded = true;
        })
        .catch((err) => {
          this.errorMessage = err.response.data.error;
          this.showError = true;
        });
    },
    resetState() {
      this.loaded = false;
      this.showError = false;
    },
    setUrl() {
      this.$router.push({
        name: 'Package',
        params: {
          package: this.pack,
        },
      });
    },
  },
};
</script>
<style lang="scss" scoped>
@import '../assets/styles/_variables.scss';
hr {
  display: block;
  height: 1px;
  border: 0;
  border-top: 1px solid color(solitude);
  margin: 1em 0;
  padding: 0;
}
.content {
  background: color(ghost-white);
  min-height: calc(100vh - 207px);
}
.title {
  text-align: center;
  color: color(fjord);
}
.container {
  @include container();
}
.loading {
  text-align: center;
  color: color(fjord);
  font-size: rem(18);
}
.error-message {
  text-align: center;
  color: color(robin-egg-blue);
}
.Search {
  @include has(container) {
    max-width: rem(640);
    padding: rem(100) 0 rem(20) 0;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    @include media($sm-up) {
      flex-direction: row;
    }
  }
  @include has(input) {
    padding: rem(20);
    background-color: #fff;
    border: 1px solid color(solitude);
    font-size: rem(16);
    flex: 1;
  }
  @include has(button) {
    appearance: none;
    padding: rem(18) rem(45);
    margin-left: rem(20);
    border: 0;
    border-radius: 0;
    cursor: pointer;
    text-align: center;
    font-size: rem(21);
    font-weight: 600;
    color: #fff;
    background: color(robin-egg-blue);
    @include hover-active-states {
      background: darken(color(robin-egg-blue), 10%);
    }
  }
  @include has(icon) {
    width: rem(40);
    height: rem(40);
    margin-left: rem(15);
    cursor: pointer;
    color: color(fjord);
    @include hover-active-states {
      color: color(robin-egg-blue);
    }
    > svg {
      fill: currentColor;
    }
  }
  @include has(settings) {
    max-width: rem(640);
    margin: 0 auto;
    padding: rem(20) 0;
    display: flex;
    flex-direction: row;
    justify-content: center;
    .vdp-datepicker + .vdp-datepicker {
      margin-left: 1.25rem;
      flex: 1;
    }
  }
}
.Chart__container {
  border-radius: $base-border-radius;
  background-color: #fff;
  box-shadow: 0 15px 30px 0 rgba(0, 0, 0, 0.11), 0 5px 15px 0 rgba(0, 0, 0, 0.08);
  padding: rem(20) rem(40);
  margin: rem(50) 0;
}
.Chart__title {
  display: flex;
  flex-direction: row;
  margin-bottom: rem(20);
  justify-content: space-between;
  h2 {
    display: flex;
    align-items: center;
    color: color(fjord);
    margin: 0;
    font-weight: 600;
    font-size: rem(16);
    > span {
      font-weight: 400;
      color: color(robin-egg-blue);
      font-size: rem(16);
      margin-left: rem(25);
    }
  }
}
.sk-cube-grid {
  width: 40px;
  height: 40px;
  margin: 100px auto;
}
.sk-cube-grid .sk-cube {
  width: 33%;
  height: 33%;
  background-color: color(robin-egg-blue);
  float: left;
  -webkit-animation: sk-cubeGridScaleDelay 1.3s infinite ease-in-out;
  animation: sk-cubeGridScaleDelay 1.3s infinite ease-in-out;
}
.sk-cube-grid .sk-cube1 {
  -webkit-animation-delay: 0.2s;
  animation-delay: 0.2s;
}
.sk-cube-grid .sk-cube2 {
  -webkit-animation-delay: 0.3s;
  animation-delay: 0.3s;
}
.sk-cube-grid .sk-cube3 {
  -webkit-animation-delay: 0.4s;
  animation-delay: 0.4s;
}
.sk-cube-grid .sk-cube4 {
  -webkit-animation-delay: 0.1s;
  animation-delay: 0.1s;
}
.sk-cube-grid .sk-cube5 {
  -webkit-animation-delay: 0.2s;
  animation-delay: 0.2s;
}
.sk-cube-grid .sk-cube6 {
  -webkit-animation-delay: 0.3s;
  animation-delay: 0.3s;
}
.sk-cube-grid .sk-cube7 {
  -webkit-animation-delay: 0s;
  animation-delay: 0s;
}
.sk-cube-grid .sk-cube8 {
  -webkit-animation-delay: 0.1s;
  animation-delay: 0.1s;
}
.sk-cube-grid .sk-cube9 {
  -webkit-animation-delay: 0.2s;
  animation-delay: 0.2s;
}
@-webkit-keyframes sk-cubeGridScaleDelay {
  0%,
  70%,
  100% {
    -webkit-transform: scale3D(1, 1, 1);
    transform: scale3D(1, 1, 1);
  }
  35% {
    -webkit-transform: scale3D(0, 0, 1);
    transform: scale3D(0, 0, 1);
  }
}
@keyframes sk-cubeGridScaleDelay {
  0%,
  70%,
  100% {
    -webkit-transform: scale3D(1, 1, 1);
    transform: scale3D(1, 1, 1);
  }
  35% {
    -webkit-transform: scale3D(0, 0, 1);
    transform: scale3D(0, 0, 1);
  }
}
</style>
