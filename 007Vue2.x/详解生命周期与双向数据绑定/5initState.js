/*
  @path  : src/core/instance/state.js
  @usage : init compoment state (options,props,methods,data,computed,watch)
*/
export function initState(vm) { // vm:Compoment

    vm._watchers = []

    const opts = vm.$options

    if (opts.props) {
        initProps(vm, opts.props)
    }
    
    if (opts.methods) {
        initMethods(vm, opts.methods)
    }


    if (opts.data) {
        initData(vm)
    } else {
        observe(vm._data = {}, true)
    }

    if (opts.computed) {
        initComputed(vm, opts.computed)
    }

    if (opts.watch && opts.watch !== nativeWatch) {
        initWatch(vm, opts.watch)
    }
}

