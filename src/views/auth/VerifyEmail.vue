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
                        <h1 class="text-white mb-2 mt-5">Confirm Your Email!</h1>
                        <p class="text-lead text-white">Kindly confirm your email to proceed.</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="container">
            <div class="row mt-lg-n10 mt-md-n11 mt-n10 justify-content-center">
                <div class="col-xl-4 col-lg-5 col-md-7 mx-auto">
                    <div class="card z-index-0">
                        <div class="card-header text-center pt-4">
                            <h5>Verify Email</h5>
                            <p v-if="failure" class="alert alert-danger" role="alert">
                                {{ message }}
                            </p>
                            <p v-if="success" class="alert alert-success" role="alert">
                                {{ message }}
                            </p>
                        </div>
                        <div class="card-body">
                            <form role="form" @submit="verfiyEmail">
                                <div class="form-group">
                                    <label for="email">Email</label>
                                    <input id="email" type="email" class="form-control" name="email"
                                        v-model="form.email" required placeholder="your email" />
                                    <div class="invalid-feedback"></div>
                                </div>
                                <div class="form-group">
                                    <label for="code">Verification Code</label>
                                    <input id="code" v-model="form.code" type="text" class="form-control" name="code"
                                        tabindex="1" required autofocus placeholder="*****" />
                                </div>
                                <div class="text-center">
                                    <argon-button fullWidth color="dark" variant="gradient" class="my-4 mb-2"
                                        type="submit" :isLoading="isLoading">Verify</argon-button>
                                </div>
                            </form>
                            <p>
                                If you are not receiving verification emails, <a href="#" @click="resendCode">click here
                                    to resend verification code to your email</a>.
                            </p>
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
import axios from "axios";
import Toast from "../../helpers/Toast";
const body = document.getElementsByTagName("body")[0];

export default {
    name: "VerifyEmail",
    data() {
        return {
            isLoading: false,
            form: {
                code: "",
                email: ""
            },
            message: "",
            success: false,
            failure: false,
        };
    },
    mounted() {
        this.form.email = this.$route.query.email;
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
        async verfiyEmail(e) {
            e.preventDefault();
            //Show progress indicator
            this.isLoading = true;
            const base_url = await this.$store.state.base_url;
            await axios
                .post(base_url + "/auth/confirm-register/", this.form)
                .then((response) => {
                    this.failure = false;
                    this.success = true;
                    this.message = response.data["message"];
                    localStorage.setItem("isLoggedIn", true);
                    localStorage.setItem("aut", this.encodeToken(response.data.tokens["access_token"]));
                    localStorage.setItem("rut", this.encodeToken(response.data.tokens["refresh_token"]));
                    this.$store.state.userProfile = response.data.data;
                    // Stop progress indicator
                    this.isLoading = false;
                    // Alert
                    Toast.makeToast("success", response.data["message"]);
                    this.$router.push("/dashboard");
                })
                .catch((error) => {
                    this.isLoading = false;
                    this.success = false;
                    this.failure = true;
                    Toast.makeToast("danger", error.response.data["message"])
                    this.message = error.response.data["message"];
                });
        },
        async resendCode(e) {
            e.preventDefault();
            //Show progress indicator
            const base_url = await this.$store.state.base_url;
            await axios
                .post(base_url + "/auth/resend-code/", { "email": this.form.email })
                .then((response) => {
                    // Stop progress indicator
                    this.isLoading = false;
                    Toast.makeToast("success", response.data["message"])
                })
                .catch((error) => {
                    this.isLoading = false;
                    Toast.makeToast("danger", error.response.data["message"])
                });
        },
        encodeToken(token) {
            return window.btoa(this.$store.state.randString + token + this.$store.state.randString);
        }
    }
};
</script>
