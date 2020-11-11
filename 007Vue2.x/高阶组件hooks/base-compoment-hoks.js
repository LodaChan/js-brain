export default function myCompomentHoks(compoment) {
    return {
        mounted() {
            console.log('I have already mounted')
        },
        props: compoment.props,
        // 利用 渲染函数(render) 替代 模板(template)
        render(h) {
            const slots = Object.keys(this.$slots)
                .reduce((arr, key) => arr.concat(this.$slots[key]), [])
                .map(vnode => {
                    vnode.context = this._self
                    return vnode
                })

            return h(compoment, {
                on: this.$listeners,// 传递 event
                props: this.$props, // 传递 props
                attrs: this.$attrs, // 传递 data
                scopedSlots: this.$scopedSlots,  // 传递 scoped , 透传 scopedSlots ， 解决 slot 与 具名 slot scoped 丢失问题

            }, slots // 当作 option 参数 传入
            )
        }
    }
}