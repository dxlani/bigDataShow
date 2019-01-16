

const feedBack = {
    state: {
        test: "这是一个测",
    },
    mutations: {
        setTagsList (state, list) {
            state.tagsList.push(...list);
        },
        
    }
};

export default feedBack;
