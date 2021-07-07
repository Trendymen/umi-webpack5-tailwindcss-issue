import { defineConfig } from 'umi';
import { configCss } from './configCss';

export default defineConfig({
  chainWebpack(memo /* , { type, webpack, env, createCSSRule } */) {
    configCss(memo);
  },
  mfsu:{},
  webpack5:{},
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    { path: '/', component: '@/pages/index' },
  ],
  fastRefresh: {},
});
