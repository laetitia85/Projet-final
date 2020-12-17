import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: "",
    tokenName: "",
    tokenId: "",
    contents: [],
  },

  mutations: {
    STORE_TOKEN(state, myToken) {
      state.token = myToken;
    },
    DELETETOKEN(state) {
      state.token = "";
      state.tokenName = "";
      state.tokenId = "";
      state.contacts = [];
    },
    DECODETOKEN(state, myDecodeToken) {
      state.tokenName = myDecodeToken;
    },
    DECODETOKENID(state, myDecodeTokenId) {
      state.tokenId = myDecodeTokenId;
    },
    ADDCONTENT(state, myAddContent) {
      state.contents.push(myAddContent);
    },
    RECCONTACT(state, myRecContent) {
      state.contents = myRecContent;
    },
  },

  actions: {
    token(context, myToken) {
      context.commit("STORE_TOKEN", myToken);
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
    addContent(context, myAddContent) {
      context.commit("ADDCONTENT", myAddContent);
    },
    recContent(context, myRecContent) {
      context.commit("RECCONTENT", myRecContent);
    },
  },

  getters: {
    TokenName: (state) => {
      return state.tokenName;
    },
    AllContent: (state) => {
      return state.contents;
    },
  },
});
