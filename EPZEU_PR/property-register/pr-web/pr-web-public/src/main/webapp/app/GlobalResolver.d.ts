import JQuery = require("jquery");
import Bluebird = require("bluebird");

//Names of variables have to be the same as in webpack.config.js file, on row  - new webpack.ProvidePlugin({ Promise: 'bluebird', $: 'jquery', jQuery: 'jquery' }),
declare var $: JQuery;
declare var Promise: Bluebird<any>;
