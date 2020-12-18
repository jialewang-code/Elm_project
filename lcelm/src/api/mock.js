import Mock from 'mockjs';
import position from '@/api/mockServerData/position'
import index_entry from '@/api/mockServerData/index_entry'
import restaurants from '@/api/mockServerData/restaurants'
//配置请求延时
Mock.setup({
    timeout:1000
})

Mock.mock('/api/posi',position)
Mock.mock('/api/index_entry',index_entry)
Mock.mock('/api/restaurants',restaurants)

//直接使用字符串匹配路径还可以使用正则匹配路径
// Mock.mock('/api/user',{
//     username:"老陈",
//     age:18,
//     gender:"男",
//     type:"帅"
// })

// Mock.mock(/\/api\/user/igs,{
//     username:"老陈",
//     age:18,
//     gender:"男",
//     type:"帅"
// })


// Mock.mock(/\/api\/user/igs,{
//     username:"老陈",
//     "mtime":"@datetime",
//     "score|1-800":800,
//     "rank|1-100":100,
//     "nickname":"@cname",
//     "address":"@url",
//     "imgUrl":"@image",
//     'email':"@email"
// })



