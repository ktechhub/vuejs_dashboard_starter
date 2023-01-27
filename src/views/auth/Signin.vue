<template>
  <div class="container top-0 position-sticky z-index-sticky">
    <div class="row">
      <div class="col-12">
        <navbar isBtn="bg-gradient-light" />
      </div>
    </div>
  </div>
  <main class="main-content mt-0">
    <div class="page-header align-items-start min-vh-50 pt-5 pb-11 m-3 border-radius-lg"
      style="background-image: url('https://raw.githubusercontent.com/creativetimofficial/public-assets/master/argon-dashboard-pro/assets/img/signup-cover.jpg'); background-position: top;">
      <span class="mask bg-gradient-dark opacity-6"></span>
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-5 text-center mx-auto">
            <h1 class="text-white mb-2 mt-5">Welcome back!</h1>
            <p class="text-lead text-white">Use these awesome forms to login or create new account in your project for
              free.</p>
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="row mt-lg-n10 mt-md-n11 mt-n10 justify-content-center">
        <div class="col-xl-4 col-lg-5 col-md-7 mx-auto">
          <div class="card z-index-0">
            <div class="card-header text-center pt-4">
              <h5>Login with</h5>
            </div>
            <div class="row px-xl-5 px-sm-4 px-3">
              <div class="d-flex justify-content-center">
                <GoogleLogin :callback="callback" prompt />
              </div>
              <div class="mt-2 position-relative text-center">
                <p class="text-sm font-weight-bold mb-2 text-secondary text-border d-inline z-index-2 bg-white px-3">or
                </p>
              </div>
            </div>
            <div class="card-body">
              <form role="form" @submit="login">
                <div class="form-group">
                  <input id="email" v-model="form.email" type="email" class="form-control" name="email" required
                    placeholder="Email" aria-label="Email" />
                </div>
                <div class="form-group">
                  <input id="password" v-model="form.password" type="password" class="form-control" name="password"
                    required placeholder="Password" aria-label="Password" />
                </div>
                <p class="text-sm mt-1">
                  <router-link to="/forget-password" class="text-dark font-weight-bolder">Forget Password?</router-link>
                </p>
                <div class="text-center">
                  <argon-button fullWidth color="dark" variant="gradient" class="my-4 mb-2" type="submit" :isLoading="isLoading">Sign
                    In</argon-button>
                </div>
                <p class="text-sm mt-3 mb-0">
                  Don't have an account?
                  <router-link to="/signup" class="text-dark font-weight-bolder">Sign Up</router-link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
  <app-footer />
</template>

<script>
import Navbar from "@/examples/PageLayout/Navbar.vue";
import AppFooter from "@/examples/PageLayout/Footer.vue";
import ArgonButton from "@/components/ArgonButton.vue";
import Toast from "../../helpers/Toast";
// import apiService from '../../services/api.service'
import axios from 'axios';
const body = document.getElementsByTagName("body")[0];

export default {
  name: "signin",
  data() {
    return {
      isLoading: false,
      form: {
        email: "",
        password: "",
      },
      notVerified: false
    };
  },
  components: {
    Navbar,
    AppFooter,
    ArgonButton,
  },
  created() {
    this.$store.state.hideConfigButton = true;
    this.$store.state.showNavbar = false;
    this.$store.state.showSidenav = false;
    this.$store.state.showFooter = false;
    body.classList.remove("bg-gray-100");
  },
  beforeUnmount() {
    this.$store.state.hideConfigButton = false;
    this.$store.state.showNavbar = true;
    this.$store.state.showSidenav = true;
    this.$store.state.showFooter = true;
    body.classList.add("bg-gray-100");
  },
  methods: {
    async login(e) {
      e.preventDefault();
      //Show progress indicator
      this.isLoading = true;
      const base_url = await this.$store.state.base_url;
      axios.post(base_url + "/auth/login/", this.form)
        .then((response) => {
          localStorage.setItem("isLoggedIn", true);
          localStorage.setItem("aut", this.encodeToken(response.data["access_token"]));
          localStorage.setItem("rut", this.encodeToken(response.data["refresh_token"]));
          this.$store.state.userProfile = response.data["data"];
          // Stop progress indicator
          this.isLoading = false;
          // Alert
          Toast.makeToast("success", "Login successful");
          this.$router.push("/dashboard");
        })
        .catch((error) => {
          this.isLoading = false;
          Toast.makeToast("danger", error.response.data["message"]);
          if (error.response.data["status"] === 401) {
            Toast.makeToast("danger", error.response.data["message"]);
            this.$router.push("/verify-email?email=" + `${this.form.email}`);
            this.notVerified = true;
          }
        });
    },
    encodeToken(token) {
      return window.btoa(this.$store.state.randString + token + this.$store.state.randString);
    },
    async callback(response) {
      this.googleAuthStatus = true;
      let socialForm = {
        "auth_token": response.credential,
        "is_author": false
      }
      this.isLoading = true;
      const base_url = await this.$store.state.base_url;
      const config = {
        headers: { "Content-Type": "application/json", "accept": "application/json" },
      };
      axios
        .post(base_url + "/auth/google/", socialForm, config)
        .then((response) => {
          localStorage.setItem("isLoggedIn", true);
          localStorage.setItem("aut", this.encodeToken(response.data.tokens["access_token"]));
          localStorage.setItem("rut", this.encodeToken(response.data.tokens["refresh_token"]));
          this.$store.state.userProfile = response.data.data;
          // Stop progress indicator
          this.isLoading = false;
          this.$router.push("/dashboard");
          Toast.makeToast("success", "Login Successful");
        })
        .catch(() => {
          this.isLoading = false;
          Toast.makeToast("danger", `Oops... Error`);
        });
    },
  }
};
</script>
