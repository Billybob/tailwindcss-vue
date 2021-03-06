<template>
	<li class="relative" @mouseenter="hover = true" @mouseleave="hover = false">
		<div @click="handleClick" :class="['relative', currentClass]">
			<slot name="icon" />
			<transition name="custom" enter-active-class="animated fadeIn faster" leave-active-class="animated fadeOut faster">
				<span v-show="!menuCollapsed">
					<slot name="title" />
				</span>
			</transition>
			<slot name="arrow" :collapse="menuCollapsed" :opened="opened">
				<tv-menu-arrow :collapse="menuCollapsed" :opened="opened" :menu-arrow-class="menuArrowClass" />
			</slot>
		</div>
		<transition type="custom" v-if="menuCollapsed" enter-active-class="animated fadeIn fast" leave-active-class="animated fadeOut fast">
			<ul v-show="hover" class="absolute top-0 z-30 children" :style="{'width': popupWidth, 'right': `-${popupWidth}`}">
				<slot />
			</ul>
		</transition>
		<collapse-transition v-else>
			<ul v-show="opened" class="children">
				<slot />
			</ul>
		</collapse-transition>
	</li>
</template>
<script>
import CollapseTransition from '../../components/transitions/collapse-transition.vue';
import MenuArrow from './menu-arrow.vue';
import Emitter from '../../mixins/emitter.js';
import Menu from './menu-mixin.js';
export default {
	name: 'TvSideSubmenu',
	mixins: [Emitter, Menu],
	components: {
		'collapse-transition': CollapseTransition,
		'tv-menu-arrow': MenuArrow
	},
	props: {
		index: {
			type: String,
			default: null,
			validator: val => typeof val === 'string' || val === null
		},
		disabled: {
			type: Boolean,
			default: false
		},
		popupWidth: {
			type: String,
			default: '200px'
		},
		menuArrowClass: {
			type: String,
			default: 'pl-1 pr-4'
		}
	},
	data() {
		return {
			items: {},
			submenus: {},
			hover: false
		};
	},
	computed: {
		menuCollapsed() {
			return this.rootMenu.collapse;
		},
		opened() {
			return this.rootMenu.openedMenus.indexOf(this.index) > -1;
		},
		active() {
			let isActive = false;
			const submenus = this.submenus;
			const items = this.items;

			Object.keys(items).forEach(index => {
				if (items[index].active) {
					isActive = true;
				}
			});

			Object.keys(submenus).forEach(index => {
				if (submenus[index].active) {
					isActive = true;
				}
			});

			return isActive;
		}
	},
	methods: {
		addItem(item) {
			this.$set(this.items, item.index, item);
		},
		removeItem(item) {
			delete this.items[item.index];
		},
		addSubmenu(item) {
			this.$set(this.submenus, item.index, item);
		},
		removeSubmenu(item) {
			delete this.submenus[item.index];
		},
		handleClick() {
			const { rootMenu, disabled } = this;
			if (rootMenu.collapse || disabled) {
				return;
			}
			this.dispatch('TvSideMenu', 'submenu-click', this);
		}
	},
	mounted() {
		this.parentMenu.addSubmenu(this);
		this.rootMenu.addSubmenu(this);
	},
	beforeDestroy() {
		this.parentMenu.removeSubmenu(this);
		this.rootMenu.removeSubmenu(this);
	}
};
</script>
