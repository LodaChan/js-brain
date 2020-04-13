# vuex 使用与原理

> vuex , 采用集中式存储管理应用的所有组件的状态 , 主要用于 兄弟组件数据同步 的场景

#### vuex 使用

+ state
'use strict'
const yourModuleStore = {}

```js
// @define
yourModuleStore.state = {
    userInfo: JSON.parse(sessionStorage.getItem('userInfo')) || {
        userName: "",
        nickName: "",
        imgUrl: "/static/images/default-user-logo.png",
        token: "",
        userId: "0"
    },
    accessTree: JSON.parse(sessionStorage.getItem('accessTree')) || []
}

```

+ getter

```js
// @define
yourModuleStore.getters = {
    userName: state => {
        return state.userInfo.userName
    },
}

// @usage
computed:{
    userName(){
         return this.$store.state.yourModuleStore.userInfo.userName;
    }
}

```


+ mutation

```js
// @define
yourModuleStore.mutations = {
    'mutation-name'(state, userInfoObj) {
        state.userInfo = userInfoObj
        sessionStorage.setItem('userInfo', JSON.stringify(state.userInfo))
    },
}
```

+ action

```js
// @define
yourModuleStore.actions = {
    'action-name'({ commit }, userInfoObj) {
        return new Promise((resolve, reject) => {
            commit('mutation-name', userInfoObj)
            resolve()
        })
    },
}
export default yourModuleStore

// @usage
this.$store.dispatch('action-name', data)


```

#### vuex 原理

> 在 思考 前需要 熟悉 vue 的 computed 初始化过程 ，Observer ， dep , watcher(data-watcher ,computed-watcher的区别)