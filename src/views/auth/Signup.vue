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
      <div class="container"  v-if="!googleAuthStatus">
        <div class="row justify-content-center">
          <div class="col-lg-5 text-center mx-auto">
            <h1 class="text-white mb-2 mt-5">Welcome!</h1>
            <p class="text-lead text-white">Kindly choose a method to register for free.</p>
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="row mt-lg-n10 mt-md-n11 mt-n10 justify-content-center">
        <div class="col-xl-4 col-lg-5 col-md-7 mx-auto">
          <div class="card z-index-0">
            <div class="row px-xl-5 px-sm-4 px-3 pt-4"  v-if="!googleAuthStatus">
              <div class="d-flex justify-content-center">
                <GoogleLogin :callback="callback" prompt />
              </div>
              <div class="mt-2 position-relative text-center">
                <p class="text-sm font-weight-bold mb-2 text-secondary text-border d-inline z-index-2 bg-white px-3">or
                </p>
              </div>
            </div>
            <div class="card-header text-center"  v-if="!googleAuthStatus">
              <h5>Register with</h5>
            </div>
            <div class="card-body" v-if="!googleAuthStatus">
              <form @submit="signup">
                <div class="row">
                  <div class="form-group col-6">
                    <label for="frist_name">First Name</label>
                    <input id="frist_name" type="text" class="form-control" name="frist_name" v-model="form.first_name"
                      required />
                  </div>
                  <div class="form-group col-6">
                    <label for="last_name">Last Name</label>
                    <input id="last_name" type="text" class="form-control" name="last_name" v-model="form.last_name"
                      required />
                  </div>
                </div>
                <div class="form-group">
                  <label for="email">Email</label>
                  <input id="email" type="email" class="form-control" name="email" v-model="form.email" required />
                  <div class="invalid-feedback"></div>
                </div>
                <div class="row">
                  <div class="form-group col-6">
                    <label for="password" class="d-block">Password</label>
                    <input id="password" type="password" class="form-control pwstrength" data-indicator="pwindicator"
                      name="password" v-model="form.password1" required />
                    <div id="pwindicator" class="pwindicator">
                      <div class="bar"></div>
                      <div class="label"></div>
                    </div>
                  </div>
                  <div class="form-group col-6">
                    <label for="password2" class="d-block">Password Confirmation</label>
                    <input id="password2" type="password" class="form-control" name="password-confirm"
                      v-model="form.password2" required />
                  </div>
                </div>
                <div class="form-group">
                  <label for="country" class="form-label">Your
                    Country</label>
                  <select v-model="form.country" name="country" id="country" class="form-control" required="">
                    <option value="">Select Country</option>
                    <option :value="country.id" v-for="country in countries" :key="country.id">{{ country.name }}
                    </option>
                  </select>
                </div>
                <div class="form-group">
                  <div class="custom-control custom-checkbox">
                    <input type="checkbox" name="is_auth" class="" id="is_auth" :checked="form.is_author"
                      v-model="form.is_author" />
                    <label class="form-check-label" for="is_auth">Do you want to be an author?</label>
                  </div>
                </div>
                <div class="form-group">
                  <div class="custom-control custom-checkbox">
                    <input type="checkbox" name="agree" class="custom-control-input" id="agree" required />
                    <label class="custom-control-label" for="agree">I agree with the terms and conditions</label>
                  </div>
                </div>
                <div class="form-group">
                  <div class="text-center">
                    <argon-button fullWidth color="dark" variant="gradient" class="my-4 mb-2" type="submit"
                      :isLoading="isLoading">Sign
                      Up</argon-button>
                  </div>
                </div>

                <p class="text-sm mt-3 mb-0">
                  Already have an account?
                  <router-link to="/login" class="text-dark font-weight-bolder">Sign In</router-link>
                </p>
              </form>
            </div>
            <div class="card-body" v-if="googleAuthStatus">
              <form @submit="googleSignUp">
                <div class="form-group">
                  <div class="custom-control custom-checkbox">
                    <input type="checkbox" name="is_auth" class="" id="is_auth" :checked="socialForm.is_author"
                      v-model="socialForm.is_author" />
                    <label class="form-check-label" for="is_auth">Do you want to be an author?</label>
                  </div>
                </div>
                <div class="form-group">
                  <div class="custom-control custom-checkbox">
                    <input type="checkbox" name="agree" class="custom-control-input" id="agree" required />
                    <label class="custom-control-label" for="agree">I agree with the terms and conditions</label>
                  </div>
                </div>
                <div class="form-group">
                  <div class="text-center">
                    <argon-button fullWidth color="dark" variant="gradient" class="my-4 mb-2" type="submit"
                      :isLoading="isLoading">Sign
                      Up</argon-button>
                  </div>
                </div>
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
import axios from "axios";
// import apiService from '../../services/api.service'

const body = document.getElementsByTagName("body")[0];

export default {
  name: "signup",
  data() {
    return {
      countries: [],
      isLoading: false,
      googleAuthStatus: false,
      form: {
        email: "",
        password1: "",
        password2: "",
        first_name: "",
        last_name: "",
        is_author: false,
        country: ""
      },
      socialForm: {
        is_author: false,
        auth_token: ""
      }
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
  mounted() {
    this.getCountries();
  },
  methods: {
    async getCountries() {
      const base_url = await this.$store.state.base_url;
      axios
        .get(base_url + "/general/countries/").then((response) => {
          this.countries.push(...response.data.results);
          console.log(this.countries);
        }, (error) => {
          this.countries =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
        });
    },
    async signup(e) {
      e.preventDefault();
      //Show progress indicator
      this.isLoading = true;
      const base_url = await this.$store.state.base_url;
      axios
        .post(base_url + "/auth/register/", this.form)
        .then(() => {
          // Stop progress indicator
          this.isLoading = false;
          // Alert
          Toast.makeToast("success", "Registration successful");
          this.$router.push("/verify-email?email=" + `${this.form.email}`);
        })
        .catch((err) => {
          this.isLoading = false;
          // Alert
          if (err.response.status === 500) {
            Toast.makeToast("danger", "Oops! An error occured. Please try again");
          } else {
            Toast.makeToast("danger", "Oops! An error occured...");
            Toast.makeToast("info", err.response.data.message);
          }
        });
    },
    callback(response) {
      this.googleAuthStatus = true;
      this.socialForm.auth_token = response.credential;
    },
    async googleSignUp(e) {
      e.preventDefault();
      //Show progress indicator
      console.log("Auth Token");
      console.log(this.socialForm.auth_token);
      this.isLoading = true;
      const base_url = await this.$store.state.base_url;
      const config = {
        headers: { "Content-Type": "application/json", "accept": "application/json" },
      };
      axios
        .post(base_url + "/auth/google/", this.socialForm, config)
        .then((response) => {
          localStorage.setItem("isLoggedIn", true);
          localStorage.setItem("aut", this.encodeToken(response.data.tokens["access_token"]));
          localStorage.setItem("rut", this.encodeToken(response.data.tokens["refresh_token"]));
          this.$store.state.userProfile = response.data.data;
          // Stop progress indicator
          this.isLoading = false;
          this.$router.push("/dashboard");
          Toast.makeToast("success", "Sign Up Successfully!")
        })
        .catch(() => {
          this.isLoading = false;
          Toast.makeToast("danger", `Oops... Error`)
        });
    },
    encodeToken(token) {
      return window.btoa(this.$store.state.randString + token + this.$store.state.randString);
    }
  }
};
</script>
