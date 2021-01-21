import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: null,
    tokenPro: "",
    tokenAdmin: "",
    tokenPicture_profil: null,
    tokenId: "",
    tokenIdPro: "",
    tokenIdAdmin: "",
    tokenPicture: null,
    tokenIdContent: "",
    contents: [],
    contentsId: [],
    users: [],
    usersPro: [],
    categoryTab: []
  },
  plugins: [createPersistedState()],

  mutations: {
    STORE_TOKEN(state, myToken) {
      state.token = myToken;
    },
    STORE_TOKENPRO(state, myTokenPro) {
      state.tokenPro = myTokenPro;
    },
    STORE_TOKENADMIN(state, myTokenAdmin) {
      state.tokenPro = myTokenAdmin;
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
      state.tokenAdmin = "";
      state.tokenPicture_profil = "";
      state.tokenId = "";
      state.tokenIdPro = "";
      state.tokenIdAdmin = "";
      state.tokenPicture = "";
      state.tokenName = "";
      state.tokenIdContent = "";
      state.contents = [];
      state.contentsId = [];
      state.users = [];
      state.usersPro = [];
      state.categoryTab = [];
    },
    DECODETOKEN(state, myDecodeToken) {
      state.tokenPicture_profil = myDecodeToken;
    },
    DECODETOKENPRO(state, myDecodeTokenPro) {
      state.tokenPicture = myDecodeTokenPro;
    },
    DECODETOKENADMIN(state, myDecodeTokenAdmin) {
      state.tokenName = myDecodeTokenAdmin;
    },
    DECODETOKENID(state, myDecodeTokenId) {
      state.tokenId = myDecodeTokenId;
    },
    DECODETOKENIDPRO(state, myDecodeTokenIdPro) {
      state.tokenIdPro = myDecodeTokenIdPro;
    },
    DECODETOKENIDADMIN(state, myDecodeTokenIdAdmin) {
      state.tokenIdAdmin = myDecodeTokenIdAdmin;
    },
    DECODETOKENIDCONTENT(state, myDecodeTokenIdContent) {
      state.tokenIdContent = myDecodeTokenIdContent;
    },
    ADDCONTENT(state, myAddContent) {
      state.contents.push(myAddContent);
    },
    RECCONTENT(state, myRecContent) {
      state.contents = myRecContent;
    },
    RECCONTENTID(state, myRecContentId) {
      state.contentsId = myRecContentId;
    },
    ADDCONTENTBYCATEGORY(state, myCategoryTab) {
      state.categoryTab.push(myCategoryTab);
    }
  },

  actions: {
    token(context, myToken) {
      context.commit("STORE_TOKEN", myToken);
    },
    tokenPro(context, myTokenPro) {
      context.commit("STORE_TOKENPRO", myTokenPro);
    },
    tokenAdmin(context, myTokenAdmin) {
      context.commit("STORE_TOKENADMIN", myTokenAdmin);
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
    decodeTokenAdmin(context, myDecodeTokenAdmin) {
      context.commit("DECODETOKENADMIN", myDecodeTokenAdmin);
    },
    decodeTokenId(context, myDecodeTokenId) {
      context.commit("DECODETOKENID", myDecodeTokenId);
    },
    decodeTokenIdPro(context, myDecodeTokenIdPro) {
      context.commit("DECODETOKENIDPRO", myDecodeTokenIdPro);
    },
    decodeTokenIdAdmin(context, myDecodeTokenIdAdmin) {
      context.commit("DECODETOKENIDADMIN", myDecodeTokenIdAdmin);
    },
    decodeTokenIdContent(context, myDecodeTokenIdContent) {
      context.commit("DECODETOKENIDCONTENT", myDecodeTokenIdContent);
    },
    addContent(context, myAddContent) {
      context.commit("ADDCONTENT", myAddContent);
    },
    recContent(context, myRecContent) {
      context.commit("RECCONTENT", myRecContent);
    },
    recContentId(context, myRecContentId) {
      context.commit("RECCONTENTID", myRecContentId);
    },
    categoryTab(context, myCategoryTab) {
      context.commit("ADDCONTENTBYCATEGORY", myCategoryTab);
    }
  },

  getters: {
    Token: state => {
      return state.token;
    },
    TokenPicture_profil: state => {
      return state.tokenPicture_profil;
    },
    TokenPicture: state => {
      return state.tokenPicture;
    },
    TokenName: state => {
      return state.tokenName;
    },
    AllContent: state => {
      return state.contents;
    },
    ContentId: state => {
      return state.contentsId;
    },
    CategoryContent: state => {
      return state.categoryTab;
    },
    AllUsers: state => {
      return state.users;
    }
  }
});
