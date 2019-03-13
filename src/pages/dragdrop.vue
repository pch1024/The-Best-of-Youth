<template>
    <div class="content">
      <div class="box" 
      ref="boxs"
      v-for="(item, index) in model"
      :key="index"
      :style="{
				transform: `translateX(${item.style.translateX}px) scale(${item.style.scale})`,
				opacity:item.style.opacity,
				zIndex: item.style.zIndex,
			} ">
			{{index}}
      </div>
    </div>
</template>
<script>
import { DargDrop, DeepClone } from '../util/index';
export default {
	data() {
		return {
			Arr: [1, 2, 3, 4, 5, 6, 7, 8, 9],
			between: 60,
			showNum: 5,
			model: null,
			cacheModel: null,
			currentIndex: 0
		};
	},
	methods: {
		createStyle(index, len) {
			let between = this.between;
			let showNum = this.showNum;
			let x = index * between;
			return {
				style: {
					// 水平偏移量 当前序号*间隔距离
					translateX: x,
					// 根据偏移量设置大小,偏移量越大就越小 ,最小 50%
					scale: 1 - Math.abs(x) / (between * showNum) * 0.8,
					// 根据偏移量设置透明度,偏移量越大就越透明,最小 0
					opacity:
						index === 6 ? 0 : 1 - Math.abs(x) / (between * showNum),
					// 根据偏移量设置层级,偏移量越大就越小,最大值length,最小值1
					zIndex: Math.abs(x) === 0 ? len : len - index
				}
			};
		},
		updateStyle(x) {
			let between = this.between;
			let showNum = this.showNum;

			this.model.forEach((item, index) => {
				let left = x + this.cacheModel[index].style.translateX;
				let absX = Math.abs(left);

				item.style.translateX = left;
				item.style.scale = 1 - absX / (between * showNum) * 0.8;
				item.style.zIndex =
					absX === 0 ? showNum : showNum - absX / between;
				item.style.opacity =
					absX === 0 ? 1 : 1 - absX / (between * showNum);
			});
		}
	},
	mounted() {
		this.$nextTick(function() {
			let _this = this;
			let tmpModel = [];
			let len = this.Arr.length;
			let between = this.between;
			let showNum = this.showNum;

			this.Arr.forEach((item, index) => {
				tmpModel.push(_this.createStyle(index, len));
			});

			this.model = tmpModel;

			setTimeout(() => {
				let boxs = this.$refs.boxs;
				let currentIndex = _this.currentIndex;
				for (var i in boxs) {
					DargDrop({
						el: boxs[i], // 当前元素
						num: i, // 当前元素序号
						start: (startX, startY, el, num, events) => {
							console.log('start');
							_this.cacheModel = DeepClone(_this.model);
							currentIndex = _this.currentIndex;
						},
						move: (moveX = 0, moveY = 0, el, num, events) => {
							console.log('move');
							let absX = Math.abs(moveX);
							let symbol = absX / moveX;

							if (
								absX <= between &&
								currentIndex === parseInt(num) &&
								(currentIndex !== len - 1 || symbol > 0) &&
								(currentIndex !== 0 || symbol < 0)
							) {
								_this.updateStyle(moveX);
							}
						},
						end: (moveX = 0, moveY = 0, el, num) => {
							console.log('end');
							let absX = Math.abs(moveX);
							let symbol = absX / moveX;
							let x = 0;
							if (
								absX >= between / 2 &&
								currentIndex === parseInt(num) &&
								(currentIndex !== len - 1 || symbol > 0) &&
								(currentIndex !== 0 || symbol < 0)
							) {
								x = between;
								_this.currentIndex -= symbol;
							}

							_this.updateStyle(symbol * x);
						}
					});
				}
			});
		});
	},
	watch: {
		currentIndex(newValue, oldValue) {
			console.log(newValue, oldValue);
		}
	}
};
</script>
<style lang="scss" scoped>
$boxW: 200px;
$boxH: 200px;
.content {
	width: 200px;
	height: 200px;
	position: relative;
	left: 50%;
	top: 50%;
	transform-origin: center;
	transform: translateX(-50%) translateY(-50%);
	.box {
		color: white;
		position: absolute;
		width: 100%;
		height: 100%;
		display: flex;
		flex-flow: column;
		justify-content: center;
		left: 0;
		top: 0;
		border-radius: 50%;
		border: 1px solid white;
		transition: 100ms all;
		cursor: pointer;
		&:nth-child(odd) {
			background-color: cadetblue;
		}
		&:nth-child(even) {
			background-color: salmon;
		}
	}
}
</style>
