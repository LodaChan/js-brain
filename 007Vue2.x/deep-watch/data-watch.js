data() {
    return {
        obj: {
            name: '夜空中最亮的星星',
            age: 18
        }
    }
},
watch: {
    'obj.name': {
        deep: true,
            handler: function(newV, oldV) {
                console.log('watch中：', newV)
            }
    }
}