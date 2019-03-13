<template>
  <div class="flexBox">
    <div class="list" :style="parentStyle">
      <div class="li" v-for="(item, index) in childModelActive" :key="index" :style="item" :class="{active:itemIndex===index, flexItems:true}" @click="editItem(index)">
        {{index}}
      </div>
    </div>
    <div class="menu">
      <div class="tab">
        <div class="th" :class="{active:tabIndex===0}" @click="changeTab(0)">当前容器</div>
        <div class="th" :class="{active:tabIndex===1}" @click="changeTab(1)">所有项目</div>
        <div class="th" @click="pushItem">项目++</div>
        <div class="th" @click="popItem">项目--</div>
      </div>
      <div class="list">
        <div class="li" v-for="(value,key,index) in currentTargt" :key="index" @click="openPopup(key,value)">
          <p>
            <b>{{key}}</b>
          </p>
          <p>{{value}}</p>
        </div>
      </div>

    </div>
    <div class="popup" v-if="isPopup">
      <div class="header">当前值：{{popupModel.currentValue}}</div>
      <div class="body">
        <div class="list">
          <div class="li" v-for="(item,index) in popupModel.currentObj" :key="index" :class="{active:popupIndex===index}" @click="popupIndex=index;popupModel.currentValue=popupModel.currentObj[index]">{{item}}</div>
        </div>
      </div>
      <div class="footer">
        <div class="cancel" @click="isPopup = false">
          取消
        </div>
        <div class="sure" @click="submitPopup">
          确定
        </div>
      </div>
    </div>
  </div>

</template>
<script>
import { isNull, DeepClone, handlerCSS } from './../util/index.js';
export default {
	data() {
		return {
			isPopup: false,
			tabIndex: 0, // 菜单项当前选项索引
			popupIndex: 0, // 弹出框当前选项索引
			currentStyleName: null, // 当前编辑的styleName
			currentTargt: null, // 当前编辑的styleObj
			type: ['parent', 'children', 'child'],
			currentType: null,
			itemIndex: null, // 当前编辑的项目的索引
			flex: {
				// 容器属性
				'flex-flow': [],
				'flex-direction': ['row', 'row-reverse', 'column', 'column-reverse'],
				'flex-wrap': ['nowrap', 'wrap', 'wrap-reverse'],
				'align-items': [
					'flex-start',
					'flex-end',
					'center',
					'baseline',
					'stretch'
				],
				'justify-content': [
					'flex-start',
					'flex-end',
					'center',
					'space-between',
					'space-around'
				],
				'align-content': [
					'flex-start',
					'flex-end',
					'center',
					'space-between',
					'space-around'
				],
				// 项目属性
				flex: [],
				'flex-shrink': [0, 1], // 0:空间不足不缩小；1：空间不足缩小
				'align-self': [
					'auto',
					'flex-start',
					'flex-end',
					'center',
					'baseline',
					'stretch'
				],
				order: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], // int
				'flex-grow': [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], // number
				'flex-basis': ['auto', '50px', '100px', '150px', '200px'] //length
			},
			parentStyle: {
				'flex-direction': 'row',
				'flex-wrap': 'wrap',
				'align-items': 'center',
				'justify-content': 'center',
				'align-content': 'center'
			},
			childrenStyle: {
				order: 'initial',
				'flex-grow': 'initial',
				'flex-shrink': 'initial',
				'flex-basis': 'initial',
				'align-self': 'initial'
			},
			childrenCount: 0,
			popupModel: {
				currentValue: null,
				currentObj: null
			},
			childModelActive: null,
			childModel: null,
			parentModel: null
		};
	},
	mounted() {
		// console.log('mounted');
		this.initView();
	},
	methods: {
		initView() {
			// console.log('initView');

			this.childrenCount = 5;
			let count = this.childrenCount > 0 ? this.childrenCount : 1;
			this.childModel = new Array(count);
			this.childModel.fill(this.childrenStyle);

			this.childModelActive = this.fliterStyle(this.childModel);

			this.parentModel = this.parentStyle;
			this.currentTargt = this.parentModel;
			this.currentType = this.type[0]; // parent
		},
		fliterStyle(arr) {
			let tmp = [];
			arr.forEach((item, index) => {
				tmp.push({});
				for (let name in item) {
					if (item[name] !== 'initial') {
						tmp[index][name] = item[name];
					}
				}
			});
			return tmp;
		},
		editItem(i) {
			this.tabIndex = null;
			this.itemIndex = i;
			this.currentTargt = this.childModel[i];
			this.currentType = this.type[2]; // child
		},
		pushItem() {
			if (this.childrenCount < 99) {
				this.childrenCount++;
				this.childModel.push(this.childrenStyle);

				this.childModelActive = this.fliterStyle(this.childModel);
			}
		},
		popItem() {
			if (this.childrenCount > 1) {
				this.childrenCount--;
				this.childModel.pop();
				this.childModelActive = this.fliterStyle(this.childModel);
			}
		},
		changeTab(n) {
			this.tabIndex = n;
			this.itemIndex = null;
			this.currentTargt = n === 0 ? this.parentModel : handlerCSS('.flexItems');
			this.currentType = n === 0 ? this.type[0] : this.type[1]; // parent || children
		},
		openPopup(k, v) {
			v = isNaN(v - 0) ? v : v - 0;
			this.currentStyleName = k; // 更新当前编辑的 styleName
			this.popupModel.currentValue = v; // 更新当前弹出框的激活的样式属性
			this.popupModel.currentObj = this.flex[k]; // 更新当前弹出框的激活的样式对象
			this.popupIndex = this.flex[k].indexOf(v); // 更新当前弹出框的激活的样式属性的索引
			this.isPopup = true; // 弹出框是否打开
		},
		submitPopup() {
			if (this.tabIndex === 0) {
				this.parentStyle[this.currentStyleName] = this.popupModel.currentValue;
			}

			if (this.tabIndex === 1) {
				handlerCSS(
					'.flexItems',
					this.currentStyleName,
					this.popupModel.currentValue
				);
				this.currentTargt = handlerCSS('.flexItems');
			}

			if (isNull(this.tabIndex)) {
				let tmp = DeepClone(this.childModel);
				tmp[this.itemIndex][
					this.currentStyleName
				] = this.popupModel.currentValue;
				this.childModel = tmp;
				this.childModelActive = this.fliterStyle(this.childModel);
				this.currentTargt = this.childModel[this.itemIndex];
			}

			this.isPopup = false;
		}
	},
	watch: {}
};
</script>
<style lang="scss" scoped>
html * {
	transition: 200ms all;
}
$ink: #283149;
$blue: #404b69;
$red: #f73859;
$gray: #dadada;
$snow: #f2f2f2;

@function randomColor() {
	$colors: #ffb6b9, #fae3d9, #bbded6, #61c0bf;
	@return nth($colors, random(length($colors)));
}

.flexBox {
	width: 320px;
	height: 600px;
	position: absolute;
	left: 50%;
	right: 50%;
	background-color: $snow;
	transform: translateX(-50%) translateY(-50%);
	top: 50%;
	border: 1px dashed $gray;
	> div.list {
		width: 320px;
		height: 320px;
		background-color: white;
		display: flex;
		.li {
			width: 30px;
			height: 30px;
			line-height: 30px;
			cursor: pointer;
			&.active,
			&:hover {
				border: 1px solid black;
			}

			&:nth-child(odd) {
				background-color: #{randomColor()};
			}
			&:nth-child(even) {
				background-color: #{randomColor()};
			}
		}
	}
	> div.menu {
		.tab {
			border: 1px solid $gray;
			border-width: 1px 0;
			display: flex;
			flex-flow: row nowrap;
			> div {
				width: 50%;
				flex-grow: 0;
				line-height: 30px;
				cursor: pointer;
				&.active,
				&:active {
					color: white;
					background-color: $red;
				}
			}
		}
		> div.list {
			display: flex;
			flex-flow: row wrap;
			justify-content: flex-start;
			> div.li {
				font-size: 10px;
				width: calc(100% / 3);
				flex-grow: 0;
				height: 50px;
				display: flex;
				flex-flow: column;
				justify-content: center;
				&:hover {
					cursor: pointer;
					background-color: $gray;
				}
			}
		}
	}
}
.popup {
	position: absolute;
	height: 100%;
	width: 100%;
	background-color: rgba(0, 0, 0, 0.3);
	top: 0;
	left: 0;
	display: flex;
	flex-direction: column;
	justify-content: center;
	> div {
		width: 80%;
		margin: 0 auto;
		background-color: gray;
		line-height: 40px;
		width: 270px;
		color: white;
	}
	.header {
		height: 40px;
		font-weight: bold;
	}
	.body {
		height: 270px;
		background-color: #4e4e4e;
		.list {
			height: 100%;
			overflow-y: auto;
			overflow-x: hidden;
		}
		.li {
			transform: scale(0.8);
		}
		.li:hover,
		.li:active,
		.li.active {
			cursor: pointer;
			transform: scale(1);
			color: #61c0bf;
		}
	}
	.footer {
		height: 40px;
		display: flex;
		> div {
			cursor: pointer;
			width: 50%;
			color: #61c0bf;
			&:hover {
				background-color: #61c0bf;
				color: white;
			}
		}
	}
}
</style>
<style>
.flexItems {
	order: 0;
	flex-grow: 0;
	flex-shrink: 0;
	flex-basis: auto;
	align-self: auto;
}
</style>
