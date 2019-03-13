<template>
  <div id="app">
	<div class="nav">
		<div class="list" :style="{width:menuWidth,opacity:menuOpacity}">
			<router-link :to="{ name: 'Home' }">Home</router-link>
			<router-link :to="{ name: 'DargDorp' }">DargDorp</router-link>
			<router-link :to="{ name: 'Flex' }">Flex</router-link>
		</div>
		<div class="menuOnOff" @click="OpenMenu">导航</div>
	</div>
	<div class="main">
		<router-view></router-view>
	</div>
  </div>
</template>

<script>
export default {
	name: 'app',
	data() {
		return {
			menuWidth: '0',
			menuOpacity: 0
		};
	},
	methods: {
		OpenMenu() {
			this.menuWidth = this.menuWidth === '200px' ? '0' : '200px';
			this.menuOpacity = this.menuOpacity === 1 ? 0 : 1;
		}
	}
};
</script>

<style lang="scss">
html * {
	box-sizing: content-box;
	padding: 0;
	margin: 0;
}
#app {
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	position: relative;
	width: 100%;
	height: 100%;
	overflow: hidden;
}
.nav {
	height: 100%;
	position: absolute;
	z-index: 999;
	border-right: 1px solid rgba(0, 0, 0, 0.3);
	.list {
		overflow: auto;
		transition: all 500ms ease-in-out;
		height: 100%;
		background-color: white;
	}
	a {
		transition: all 1s ease;
		color: rgba(0, 0, 0, 0.2);
		text-decoration: none;
		display: block;
		width: 80%;
		padding-bottom: 10px;
		margin: 30px auto;
	}
	a.router-link-exact-active {
		color: cadetblue;
		border-bottom: 1px dashed;
	}
	.menuOnOff {
		position: absolute;
		height: 40px;
		background-color: #24bd91;
		right: 0;
		width: 60px;
		font-size: 16px;
		top: 0;
		transform: translateX(100%);
		line-height: 40px;
		text-align: center;
		color: white;
		cursor: pointer;
	}
}
.main {
	width: 100%;
	height: 100%;
}
</style>
