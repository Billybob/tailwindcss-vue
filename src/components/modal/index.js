import Vue from 'vue';
import TvModel from './modal.vue';
import { installComponents, registerComponentProgrammatic } from '../../utils/plugins.js';

const ModalProgrammatic = function(params) {
	let content;
	let parent;
	if (typeof params === 'string') content = params;

	if (params.parent) {
		parent = params.parent;
		delete params.parent;
	}

	const propsData = Object.assign({ content }, typeof params === 'string' ? {} : params, { programmatic: true });

	const vm = typeof window !== 'undefined' && window.Vue ? window.Vue : Vue;
	if (!vm.options.components['TvModal']) {
		throw new Error('(TV Warn[TvModal Programmatic]) - the \'TvModal\' component is requried for notify to work');
	};
	const ModelComponent = vm.extend(TvModel);
	return new ModelComponent({
		parent,
		el: document.createElement('div'),
		propsData
	});
};

TvModel.install = function(Vue, args = {}) {
	installComponents(Vue, args, [this]);
	registerComponentProgrammatic(Vue, 'modal', ModalProgrammatic);
};

export default TvModel;

export { ModalProgrammatic };
