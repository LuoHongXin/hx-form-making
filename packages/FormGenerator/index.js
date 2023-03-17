import GLFormGenerator from './src/formGenerator';

GLFormGenerator.install = function(Vue) {
  Vue.component(GLFormGenerator.name, GLFormGenerator);
};

export default GLFormGenerator;
