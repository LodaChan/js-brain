<template>
    <div>
        <span @click="handleClick">
            {{test}}
        </span>
    </div>
</template>

<script>
    export default {
        name: 'BaseComponent',
        props: {
            test: Number
        },
        mounted() {
            
        },
        methods: {
            handleClick() {
                this.$emit('click')
            }
        }
    }
</script>