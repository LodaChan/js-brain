# vuex 使用与原理

> vuex , 采用集中式存储管理应用的所有组件的状态 , 主要用于 兄弟组件数据同步 的场景 ， 本质上是1个vue的插件，对应响应式的方式与data,computed,watch类似

#### 引入  vuex

```js
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
```

```js
const state = {}
const mutations = {}
const actions = {}
const getters = {}
export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})
```

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

+ 与 vue observer dep watcher类似

#### vuex action 异步实现原理

> 利用浏览器的 执行栈-任务队列-微任务队列 , actions 加入到任务队列， action内的操作(promise/setTimeout)等重新扫描，保证执行顺序的一致性


+ mutation 同步设计
+ action   异步设计

```js

// action 加入 promise 与 setTimeout
yourModuleStore.actions = {
    'action-name'({ commit }, userInfoObj) {
        return new Promise((resolve, reject) => {
            setTimeout(()=>{
                commit('mutation-name', userInfoObj)
                resolve()
            },1000)
        })
    },
}
```