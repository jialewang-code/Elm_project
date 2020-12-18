<template>
  <div id="home" class="home">
    <nav-bar
      title="标题"
      left-text="返回"
      right-text="按钮"
      :fixed="true"
      :placeholder="true"
      @click-left="onClickLeft"
      @click-right="onClickRight"
    >
      <template #left>
        <Icon name="search" size="18" />
      </template>
      <template #right>
        <span class="iconfont icon-gerenzhongxin"></span>
      </template>

      <template #title>
        <span>{{titlePosition}}</span>
      </template>
    </nav-bar>
    
    <!-- 轮播 -->
    <swipe class="my-swipe" :loop="false" indicator-color="grey" :show-indicators="true">
      <Swipe-item>
        <grid>
          <Grid-item v-for="(item,index) in swiperList1" :key="index">
            <van-image width="0.84rem" height="0.84rem" fit="cover" :src="'https://fuss10.elemecdn.com/'+item.image_url"/>
            <span>{{item.title}}</span>
          </Grid-item>
          
        </grid>
      </Swipe-item>
      <Swipe-item>
        <grid>
          <Grid-item v-for="(item,index) in swiperList2" :key="index">
            <van-image width="0.84rem" height="0.84rem" fit="cover" :src="'https://fuss10.elemecdn.com/'+item.image_url"/>
            <span>{{item.title}}</span>
          </Grid-item>
          
        </grid>
      </Swipe-item>
    </swipe>


    <ShopList :shopListArr="shopListArr"></ShopList>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import {getPosiData,getIndexEntryData,getRestaurantsData} from '@/api/data'
//import Button from 'vant/lib/button';
import { NavBar,Icon ,Swipe, SwipeItem,Grid, GridItem,Image } from 'vant';
import ShopList from '@/components/ShowList.vue'

export default {
  name: 'Home',
  data(){
    return {
      titlePosition:"",
      swiperList1:[],
      swiperList2:[],
      shopListArr:[]
    }
  },
  components: {
    NavBar,Icon,Swipe, SwipeItem,Grid, GridItem,vanImage:Image,ShopList
  },
  methods:{
    onClickLeft() {
      Toast('返回');
    },
    onClickRight() {
      Toast('按钮');
    },
  },
  async mounted(){
    getPosiData().then((res)=>{
      this.titlePosition = res.name;
    });
    
    ((async ()=>{
      let res2 = await getIndexEntryData()
      console.log(res2)
      this.swiperList1 = res2.slice(0,8);
      this.swiperList2 = res2.slice(8,16);
    })());
    
    getRestaurantsData().then((res)=>{
      this.shopListArr = res
    })
    
  }
  
}
</script>

<style lang="less">

#home{

  .van-nav-bar{
    background: #3190e8;
  }
  .van-nav-bar__title,.van-nav-bar__title,.van-nav-bar .van-icon,.van-nav-bar__right{
    color: #fff;
    font-size: 0.30rem;
  }
  .h1{
    width :3.75rem;
    height: 1rem;
    background: skyblue;
    font-size: 0.5rem;
    line-height: 1rem;
  }
  .my-swipe{
    height: 3.6rem;
  }

}


</style>
