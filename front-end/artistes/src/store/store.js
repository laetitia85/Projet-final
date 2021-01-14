import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: null,
    tokenPro: "",
    tokenPicture_profil: null,
    tokenId: "",
    tokenIdPro: "",
    tokenPicture: null,
    tokenIdContent: "",
    contents: [],
    users: [],
    usersPro: []
  },
  plugins: [createPersistedState()],

  mutations: {
    STORE_TOKEN(state, myToken) {
      state.token = myToken;
    },
    STORE_TOKENPRO(state, myTokenPro) {
      state.tokenPro = myTokenPro;
    },
    ADDUSERS(state, AddUsers) {
      state.users = AddUsers;
    },
    ADDUSERSPRO(state, AddUsersPro) {
      state.usersPro = AddUsersPro;
    },
    UPDATEUSERS(state, myAddUsers) {
      state.users.push(myAddUsers);
    },
    UPDATEUSERSPRO(state, myAddUsersPro) {
      state.usersPro.push(myAddUsersPro);
    },
    DELETETOKEN(state) {
      state.token = "";
      state.tokenPro = "";
      state.tokenPicture_profil = "";
      state.tokenId = "";
      state.tokenIdPro = "";
      state.tokenPicture= "";
      state.tokenIdContent = "";
      state.contents = [];
      state.users = [];
    },
    DECODETOKEN(state, myDecodeToken) {
      state.tokenPicture_profil = myDecodeToken;
    },
    DECODETOKENPRO(state, myDecodeTokenPro) {
      state.tokenPicture = myDecodeTokenPro;
    },
    DECODETOKENID(state, myDecodeTokenId) {
      state.tokenId = myDecodeTokenId;
    },
    DECODETOKENIDPRO(state, myDecodeTokenIdPro) {
      state.tokenIdPro = myDecodeTokenIdPro;
    },
    DECODETOKENIDCONTENT(state, myDecodeTokenIdContent) {
      state.tokenIdContent = myDecodeTokenIdContent;
    },
    ADDCONTENT(state, myAddContent) {
      state.contents.push(myAddContent);
    },
    RECCONTENT(state, myRecContent) {
      state.contents = myRecContent;
    }
  },

  actions: {
    token(context, myToken) {
      context.commit("STORE_TOKEN", myToken);
    },
    tokenPro(context, myTokenPro) {
      context.commit("STORE_TOKENPRO", myTokenPro);
    },
    addUsers(context, AddUsers) {
      context.commit("ADDUSERS", AddUsers);
    },
    addUsersPro(context, AddUsersPro) {
      context.commit("ADDUSERSPRO", AddUsersPro);
    },
    updateUsers(context) {
      context.commit("UPDATEUSERS");
    },
    updateUsersPro(context) {
      context.commit("UPDATEUSERSPRO");
    },
    deleteToken(context) {
      context.commit("DELETETOKEN");
    },
    decodeToken(context, myDecodeToken) {
      context.commit("DECODETOKEN", myDecodeToken);
    },
    decodeTokenPro(context, myDecodeTokenPro) {
      context.commit("DECODETOKENPRO", myDecodeTokenPro);
    },
    decodeTokenId(context, myDecodeTokenId) {
      context.commit("DECODETOKENID", myDecodeTokenId);
    },
    decodeTokenIdPro(context, myDecodeTokenIdPro) {
      context.commit("DECODETOKENIDPRO", myDecodeTokenIdPro);
    },
    decodeTokenIdContent(context, myDecodeTokenIdContent) {
      context.commit("DECODETOKENIDCONTENT", myDecodeTokenIdContent);
    },
    addContent(context, myAddContent) {
      context.commit("ADDCONTENT", myAddContent);
    },
    recContent(context, myRecContent) {
      context.commit("RECCONTENT", myRecContent);
    }
  },

  getters: {
    TokenPicture_profil: state => {
      return state.tokenPicture_profil;
    },
    TokenPicture: state => {
      return state.tokenPicture;
    },
    AllContent: state => {
      return state.contents;
    },
    ContentId: state => {
      return state.contents;
    },
    AllUsers: state => {
      return state.users;
    }
  }
});
