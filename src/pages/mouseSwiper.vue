<template>
    <div class="mouse" ref="box">

    </div>
</template>

<script>
import { DargDrop } from '../util/index';
export default {
	mounted() {
		this.$nextTick(() => {
			let _this = this;
			DargDrop({
				el: _this.$refs.box,
				start: (startX, startY, el, num, e) => {
					console.log('start', startX, startY, el, num, e);
				},
				move: (moveX, moveY, el, num, e) => {
					console.log('move');
				},
				end: (moveX, moveY, el, num) => {
					console.log('end', moveX, moveY, el, num);
				}
			});
		});
	}
};
</script>

<style lang="scss" scoped>
.mouse {
	margin: 0 auto;
	width: 300px;
	height: 300px;
	background-color: aquamarine;
}
</style>
