import Bluebird = require("bluebird");

//Тук имената на променливите трябва да съвпадат с тези от webpack.config.js фаила ред - new webpack.ProvidePlugin({ Promise: 'bluebird', $: 'jquery', jQuery: 'jquery' }),
declare var Promise: Bluebird<any>;