require('../styles/main.scss');
require('../styles/test.styl');

import Vue from 'vue/dist/vue.js';
import MainIndex from './index.vue'

const cart = require("./cart")

const [a,,b] = [1,2,3];

const name = "Bob"
const time = "today";
var testing = `Hello ${name}, how are you ${time}?`

const app = new Vue({
    el: '#app',
    components : {
        MainIndex
    }
})

