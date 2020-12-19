# 企业Vue开发实战

### 1.项目创建

### 2.axios封装和请求响应劫持

**axios.js  配置axios封装Ajax**

**data.js  请求响应数据**

axios.js文件代码如下：

```js
import axios from 'axios';
import config from '@/config';

const baseUrl =
	process.env.NODE_ENV === 'development'
		? config.baseUrl.dev
		: config.baseUrl.pro;

class HttpRequest {
	constructor(baseUrl) {
		this.baseUrl = baseUrl;
		this.queue = {};
	}
	getInsideConfig() {
		const config = {
			baseURL: this.baseUrl,
			header: {
				//
			},
		};
		return config;
	}
	interceptors(instance, url) {
		instance.interceptors.request.use((config) => {
			//处理请求
			console.log('拦截和处理请求');
			config.data = {
				msg: 'hello world',
			};
			console.log(config);
			return config;
		});
		instance.interceptors.response.use(
			(res) => {
				//处理响应
				console.log('拦截和处理响应');
				console.log(res);
				return res.data;
			},
			(error) => {
				//处理请求和响应问题
				console.log(error);
				return { error: '网络请求出错了' };
			}
		);
	}
	request(options) {
		const instance = axios.create(); //创建实例对象
		options = Object.assign(this.getInsideConfig(), options);
		this.interceptors(instance, options.url);
		return instance(options);
	}
}

const axiosObj = new HttpRequest(baseUrl);

export default axiosObj;

```



### 3.vue开发模式跨域解决方案与代理服务器配置

**使用 node 配置一个简易的后台服务器**

```js
let express = require('express');

let app = express();

// app.use((req, res, next) => {
// 	res.append('Access-Control-Allow-Origin', '*');
// 	res.append('Access-Control-Allow-headers', '*');
// 	next();
// });

app.get('/', (req, res) => {
	res.json({
		msg: '这是首页',
	});
});

app.get('/banner', (req, res) => {
	res.json({
		msg: '这是banner',
	});
});

app.listen(3000, () => {
	console.log('http://localhost:3000');
});

```

**Vue.config.js 文件配置**

```js
module.exports = {
	devServer: {
		proxy: {
			'/api': {
				target: 'http://localhost:3000',
				pathRewrite: {
					'^/api': '',
				},
			},
		},
	},
};
```

**config index.js 文件配置**

```js
export default {
	title: 'lwelm',
	baseUrl: {
		dev: '/api', //开发的时候后台接口地址
		pro: '', //产品上线发布后，后台接口地址
	},
};
```



### 4.mockjs模拟后端数据实现前后端同时开发

**mock.js  文件配置**

```js
// 使用 Mock
import Mock from 'mockjs';
import position from '@/api/mockServerData/position';
import index_entry from '@/api/mockServerData/index_entry';
import restaurants from '@/api/mockServerData/restaurants';

//配置请求延时
Mock.setup({
	timeout: 1000,
});

Mock.mock('/api/posi', position);
Mock.mock('/api/index_entry', index_entry);
Mock.mock('/api/restaurants', restaurants);

//字符串匹配
// Mock.mock('/api/user', {
// 	username: '小王',
// 	age: 18,
// 	gender: '男',
// 	type: '帅',
// });

//正则匹配
// Mock.mock(/\/api\/user/gis, {
// 	username: '小王',
// 	age: 18,
// 	gender: '男',
// 	type: '帅',
// });

//随机属性数据
// Mock.mock(/\/api\/user/gis, {
// 	username: '王',
// 	age: 18,
// 	mtime: '@datetime',
// 	'score | 1-800': 800,
// 	'rank | 1-100': 100,
// 	nickname: '@cname',
// 	urlAddress: '@url',
// 	imgUrl: '@image',
// 	email: '@email',
// });
```



### 5.Vue项目REM布局设置

**config 文件目录下的 rem.js 文件配置**

```js
(function() {
	function resize() {
		const baseFontSize = 100; //设计稿100px相当于1rem，750px==7.5rem,相当于各种屏幕100%的宽度
		const designWidth = 750; //设计稿宽度
		const width = window.innerWidth; //屏幕宽度
		let currentFontSize = (width / designWidth) * baseFontSize;
		document.querySelector('html').style.fontSize = currentFontSize + 'px';
	}

	window.onresize = function() {
		resize();
	};

	document.addEventListener('DOMContentLoaded', resize);
})();

```

**main.js 文件中引入**

` import '@/config/rem.js';`

**App.js 文件中设置字体大小**

```js
body {
  font-size: 16px;
}
```

### 6.首页数据获取

**data.js 文件配置**

```js
import axios from '@/api/axios';

export const getBannerData = () => {
	return axios.request({
		url: 'banner',
		method: 'get',
	});
};

// export const getUserData = () => {
// 	return axios.request({
// 		url: 'user',
// 		method: 'get',
// 	});
// };

export const getPosiData = () => {
	return axios.request({
		url: 'posi',
		method: 'get',
	});
};
```

**Home.vue 文件异步获取**

```js
async mounted() {
    getPosiData().then((res) => {
      this.titlePosition = res.name;
    });
    getIndexEntryData().then((res2) => {
      console.log(res2);
      this.swiperList1 = res2.slice(0, 8);
      this.swiperList2 = res2.slice(8, 16);
    });
    getRestaurantsData().then((res3) => {
      this.shopListArr = res3;
    });
  },
```

### 7.项目中图标优化与字体图标使用

**打开 IconFont 网站登录下载图标**

**引入项目下面生成的 fontclass 代码**

```js
<link rel="stylesheet" href="./iconfont.css">
```

**挑选相应图标并获取类名，应用于页面**

```js
<span class="iconfont icon-xxx"></span>
```

### 8.UI组件的使用与按需导入

**安装 Vant 组件库，按需导入**

```js
import {
  NavBar,
  Icon,
  Swipe,
  SwipeItem,
  Grid,
  GridItem,
  Image as VanImage,
} from "vant";
```

**babel.config.js 文件配置**

```js
module.exports = {
	plugins: [
		[
			'import',
			{
				libraryName: 'vant',
				libraryDirectory: 'es',
				style: true,
			},
			'vant',
		],
	],
};
```

### 9.UI 组件插槽使用与样式修改

```vue
<nav-bar
      title="标题"
      left-text="返回"
      right-text="按钮"
      @click-left="onClickLeft"
      @click-right="onClickRight"
>
      <template #left>
        <icon name="search" size="18" />
      </template>
      <template #right>
        <span class="iconfont icon-gerenzhongxin"></span>
      </template>
      <template #title>
        <span>{{ titlePosition }}</span>
      </template>
</nav-bar>
```

### 10.轮播组件加 grid 布局完成图标列表

```html
<swipe
      class="my-swipe"
      :loop="false"
      indicator-color="gray"
      show-indicators="true"
 >
      <swipe-item>
        <grid>
          <grid-item v-for="(item, index) in swiperList1" :key="index">
            <van-image
              width="0.84rem"
              height="0.84rem"
              fit="cover"
              :src="'https://fuss10.elemecdn.com/' + item.image_url"
            ></van-image>
            <span>{{ item.title }}</span>
          </grid-item>
        </grid>
      </swipe-item>
      <swipe-item>
        <grid>
          <grid-item v-for="(item, index) in swiperList2" :key="index">
            <van-image
              width="0.84rem"
              height="0.84rem"
              fit="cover"
              :src="'https://fuss10.elemecdn.com/' + item.image_url"
            ></van-image>
            <span>{{ item.title }}</span>
          </grid-item>
        </grid>
      </swipe-item>
</swipe>
```

### 11.列表加载与骨架屏使用

