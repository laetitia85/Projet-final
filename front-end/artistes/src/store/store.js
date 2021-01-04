import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: "",
    tokenPro: "",
    tokenPicture_profil: "",
    tokenId: "",
    tokenIdPro: "",
    tokenIdContent: "",
    contents: []
  },
  plugins: [createPersistedState()],

  mutations: {
    STORE_TOKEN(state, myToken) {
      state.token = myToken;
    },
    STORE_TOKENPRO(state, myTokenPro) {
      state.tokenPro = myTokenPro;
    },
    DELETETOKEN(state) {
      state.token = "";
      state.tokenPro = "";
      state.tokenPicture_profil = "";
      state.tokenId = "";
      state.tokenIdPro = "";
      state.tokenIdContent = "";
      state.contents = [];
    },
    DECODETOKEN(state, myDecodeToken) {
      state.tokenPicture_profil = myDecodeToken;
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
    RECCONTACT(state, myRecContent) {
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
    deleteToken(context) {
      context.commit("DELETETOKEN");
    },
    decodeToken(context, myDecodeToken) {
      context.commit("DECODETOKEN", myDecodeToken);
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
    TokenPicture_profil: (state) => {
      return state.tokenPicture_profil;
    },
    AllContent: (state) => {
      return state.contents;
    }
  }
});
