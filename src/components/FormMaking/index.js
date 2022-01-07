import 'normalize.css/normalize.css';
import MakingForm from '@/components/FormMaking/Container.vue';
import GenerateForm from '@/components/FormMaking/GenerateForm.vue';
import './style/index.scss';

MakingForm.install = function(Vue) {
    Vue.component(MakingForm.name, MakingForm);
};

GenerateForm.install = function(Vue) {
    Vue.component(GenerateForm.name, GenerateForm);
};

const components = [
    MakingForm,
    GenerateForm
];

const install = function(Vue) {
    components.forEach(component => {
        Vue.component(component.name, component);
    });
};

if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}

export {
    install,
    MakingForm,
    GenerateForm
};

export default {
    install,
    MakingForm,
    GenerateForm
};