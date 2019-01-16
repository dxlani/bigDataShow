const client = {
    state: {
        clientName:''
    },
    /* 不支持异步，方法示例：this.$store.commit('SET_ClientName',this.form.name) */
    mutations: {
        SET_ClientName(state, clientName) {
            state.clientName=clientName;
        }
    },
    /* 支持异步，方法示例：this.$store.dispatch('SET_ClientNameAsync') */
    actions: {
        SET_ClientNameAsync({commit,state}) {
                commit('SET_ClientName', '2323232');
        }
    },
};

export default client;
