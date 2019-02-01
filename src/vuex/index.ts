import Vue from 'vue';
import Vuex from 'vuex';

import app from './modules/app';
import login from './modules/login';
import feedBack from './modules/feedBack';
import client from './modules/common/client';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        ossBucket:'',//ali-oss
        vehicleType:[]
    },
    mutations: {
        judgeDomain:(state,data)=>{
            if(window.location.hostname=="csp.sowl.cn"){
                state.ossBucket="sinostoragedev"
              }else if(window.location.hostname=="csp.jfry.cn"){
                state.ossBucket="sinostorage"
              }else {
                state.ossBucket="sinostoragedev"
              }
        },
        SET_vehicleTypeList:(state,data)=>{
            state.vehicleType = data; 
        }
    },
    actions: {

    },
    modules: {
        client,
        app,
        login,
        feedBack 
    }
});

export default store;
