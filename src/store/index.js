import { createStore } from "vuex";
import axios from 'axios';

const base_url = 'https://api.ktechhub.com/api/v1'
const randString = "eyjoicmVmcmVzaCIsImV4cCI6MTcwNjcwNjghekj@3k2lkjdfkalladfl@zNywiaWF0IjoxN"


function getToken(name) {
  return window.atob(localStorage.getItem(name)).replaceAll(randString, "");
}
function encodeToken(token) {
  return window.btoa(randString + token + randString);
}

export default createStore({
  state: {
    hideConfigButton: false,
    isPinned: true,
    showConfig: false,
    sidebarType: "bg-white",
    isRTL: false,
    mcolor: "",
    darkMode: localStorage.getItem("darkMode"),
    isNavFixed: false,
    isAbsolute: false,
    showNavs: true,
    showSidenav: true,
    showNavbar: true,
    showFooter: true,
    showMain: true,
    layout: "default",
    // Utils
    base_url: base_url,
    randString: randString,
    getToken: getToken("aut"),
    alertOn: false,
    // API Data
    userProfile: {},
  },
  mutations: {
    toggleConfigurator(state) {
      state.showConfig = !state.showConfig;
    },
    navbarMinimize(state) {
      const sidenav_show = document.querySelector(".g-sidenav-show");

      if (sidenav_show.classList.contains("g-sidenav-hidden")) {
        sidenav_show.classList.remove("g-sidenav-hidden");
        sidenav_show.classList.add("g-sidenav-pinned");
        state.isPinned = true;
      } else {
        sidenav_show.classList.add("g-sidenav-hidden");
        sidenav_show.classList.remove("g-sidenav-pinned");
        state.isPinned = false;
      }
    },
    sidebarType(state, payload) {
      state.sidebarType = payload;
    },
    navbarFixed(state) {
      if (state.isNavFixed === false) {
        state.isNavFixed = true;
      } else {
        state.isNavFixed = false;
      }
    },
    update_userProfile: (state, newData) => state.userProfile = newData,
  },
  actions: {
    toggleSidebarColor({ commit }, payload) {
      commit("sidebarType", payload);
    },
    // Utility Methods
    async logout() {
      this.userProfile = {}
      localStorage.removeItem("isLoggedIn")
      localStorage.removeItem("aut")
      localStorage.removeItem("rut")
      document.location.href = "/login"
    },
    // User Methods
    async getUserProfile({ commit, dispatch }) {
      const token = await getToken("aut")
      axios.get(base_url + '/auth/user/',
        { headers: { Authorization: `Bearer ${token}` } }
      ).then((response) => {
        commit('update_userProfile', response.data)
      }).catch(() => {
        // Check token expiration and use refresh 
        axios.post(base_url + '/auth/token/refresh/', { "refresh": getToken("rut") })
          .then((response) => {
            localStorage.setItem("aut", encodeToken(response.data.access));
            location.reload()
          })
          .catch((err) => {
            if (err.message === 'Network Error') {
              console.log("No internet")
            } else {
              dispatch("logout");
            }
          })
      });
    },
  },
  getters: {}
});
