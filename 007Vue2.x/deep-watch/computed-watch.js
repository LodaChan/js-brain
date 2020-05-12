data() {
    return {
        obj: {
            name: '夜空中最亮的星星',
            age: 18
        }
    }
},
computed: {
    name(){
        return this.obj.name;
    }
},
watch: {
    name(newV){
        console.log('watch中name为：', newV)
    }
}