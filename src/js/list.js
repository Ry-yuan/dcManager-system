// vue实例
var list = new Vue({
    el: '#list',
    data: {
        // 数据
        items: []
    },
    methods: {
    },
    mounted() {
        var that = this;
        // 请求数据
        axios.get('../mockdata/list.json').then(function(res){
            that.items = res.data
        }).catch(function(err){
            console.log(err);
        })
    }
})