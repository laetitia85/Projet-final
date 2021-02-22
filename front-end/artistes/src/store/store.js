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
    tokenName: "",
    tokenPicture: null,
    tokenPicture_profil_a: null,
    tokenIdContent: "",
    contents: [],
    contentsId: [],
    users: [],
    usersPro: [],
    admin: [],
    categoryTab: [],
    categoryContentTab: [],
    comments: [],
    commentsId: []
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
      state.tokenAdmin = myTokenAdmin;
    },
    RECUSERS(state, myRecUsers) {
      state.users = myRecUsers;
    },
    RECUSERSPRO(state, myRecUsersPro) {
      state.usersPro = myRecUsersPro;
    },
    ADDADMIN(state, myAddAdmin) {
      state.admin.push(myAddAdmin);
    },
    UPDATEUSERS(state, myAddUsers) {
      state.users.push(myAddUsers);
    },
    UPDATEUSERSPRO(state, myAddUsersPro) {
      state.usersPro.push(myAddUsersPro);
    },
    UPDATEADMIN(state, myAddAdmin) {
      state.admin.push(myAddAdmin);
    },
    DELETETOKEN(state) {
      state.token = "";
      state.tokenPro = "";
      state.tokenAdmin = "";
      state.tokenPicture_profil = "";
      state.tokenPicture_profil_a = "";
      state.tokenId = "";
      state.tokenIdPro = "";
      state.tokenIdAdmin = "";
      state.tokenPicture = "";
      state.tokenName = "";
      state.tokenIdContent = "";
      state.contents = [];
      state.comments = [];
      state.contentsId = "";
      state.commentsId = "";
      state.users = [];
      state.admin = [];
      state.usersPro = [];
      state.categoryTab = [];
      state.categoryContentTab = [];
    },
    DECODETOKEN(state, myDecodeToken) {
      state.tokenPicture_profil = myDecodeToken;
    },
    DECODETOKENPRO(state, myDecodeTokenPro) {
      state.tokenPicture = myDecodeTokenPro;
    },
    DECODETOKENADMIN(state, myDecodeTokenAdmin) {
      state.tokenName = myDecodeTokenAdmin;
      state.tokenPicture_profil_a = myDecodeTokenAdmin;
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
      state.contents = myAddContent;
    },
    RECCONTENT(state, myRecContent) {
      state.contents = myRecContent;
    },
    RECCOMMENT(state, myRecComment) {
      state.comment = myRecComment;
    },
    RECCONTENTID(state, myRecContentId) {
      state.contentsId = myRecContentId;
    },
    RECCOMMENTID(state, myRecCommentId) {
      state.commentsId = myRecCommentId;
    },
    ADDCONTENTID(state, myAddContentId) {
      for (let i = 0; i < state.contentsId.length; i++) {
        if (state.contentsId[i].id_user_a === myAddContentId) {
          state.contentsId.splice(i, 1);
        }
      }
    },
    ADDCOMMENTID(state, myAddCommentId) {
      for (let i = 0; i < state.commentsId.length; i++) {
        if (state.commentsId[i].id_post === myAddCommentId) {
          state.commentsId.splice(i, 1);
        }
      }
    },
    ADDCONTENTBYCATEGORY(state, myCategoryTab) {
      state.categoryTab.push(myCategoryTab);
    },
    ADDCATEGORYCONTENTTAB(state, myCategoryContentTab) {
      state.categoryContentTab.push(myCategoryContentTab);
    },
    DELETEUSERS(state, myDeleteUsers) {
      for (let i = 0; i < state.users.length; i++) {
        if (state.users[i].id_a === myDeleteUsers) {
          state.users.splice(i, 1);
        }
      }
    },
    DELETEUSERSPRO(state, myDeleteUsersPro) {
      for (let i = 0; i < state.usersPro.length; i++) {
        if (state.usersPro[i].id_p === myDeleteUsersPro) {
          state.usersPro.splice(i, 1);
        }
      }
    },
    DELETEPOSTS(state, myDeletePosts) {
      for (let i = 0; i < state.contents.length; i++) {
        if (state.contents[i].id_c === myDeletePosts) {
          state.contents.splice(i, 1);
        }
      }
    },
    DELETEMYPOSTS(state, myDeleteMyPosts) {
      for (let i = 0; i < state.contentsId.length; i++) {
        if (state.contentsId[i].id_c === myDeleteMyPosts) {
          state.contentsId.splice(i, 1);
        }
      }
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
    recUsers(context, myRecUsers) {
      context.commit("RECUSERS", myRecUsers);
    },
    recUsersPro(context, myRecUsersPro) {
      context.commit("RECUSERSPRO", myRecUsersPro);
    },
    addAdmin(context, myAddAdmin) {
      context.commit("ADDADMIN", myAddAdmin);
    },
    updateUsers(context) {
      context.commit("UPDATEUSERS");
    },
    updateUsersPro(context) {
      context.commit("UPDATEUSERSPRO");
    },
    updateAdmin(context) {
      context.commit("UPDATEADMIN");
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
    recComment(context, myRecComment) {
      context.commit("RECCOMMENT", myRecComment);
    },
    recContentId(context, myRecContentId) {
      context.commit("RECCONTENTID", myRecContentId);
    },
    recCommentId(context, myRecCommentId) {
      context.commit("RECCOMMENTID", myRecCommentId);
    },
    addContentId(context, myAddContentId) {
      context.commit("ADDCONTENTID", myAddContentId);
    },
    addCommentId(context, myAddCommentId) {
      context.commit("ADDCOMMENTID", myAddCommentId);
    },
    categoryTab(context, myCategoryTab) {
      context.commit("ADDCONTENTBYCATEGORY", myCategoryTab);
    },
    categoryContentTab(context, myCategoryContentTab) {
      context.commit("ADDCATEGORYCONTENTTAB", myCategoryContentTab);
    },
    deleteUsers(context, myDeleteUsers) {
      context.commit("DELETEUSERS", myDeleteUsers);
    },
    deleteUsersPro(context, myDeleteUsersPro) {
      context.commit("DELETEUSERSPRO", myDeleteUsersPro);
    },
    deletePosts(context, myDeletePosts) {
      context.commit("DELETEPOSTS", myDeletePosts);
    },
    deleteMyPosts(context, myDeleteMyPosts) {
      context.commit("DELETEMYPOSTS", myDeleteMyPosts);
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
    TokenPicture_profil_a: state => {
      return state.tokenPicture_profil_a;
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
    CategoryTab: state => {
      return state.categoryTab;
    },
    CategoryContentTab: state => {
      return state.categoryContentTab;
    },
    AllUsers: state => {
      return state.users;
    },
    AllUsersPro: state => {
      return state.usersPro;
    },
    Admin: state => {
      return state.admin;
    }
  }
});
