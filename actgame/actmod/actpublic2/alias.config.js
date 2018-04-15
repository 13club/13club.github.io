module.exports = function() {
	var globalAliasConfig = require('./../../modules2/scripts/alias.config')();
	
	var localAliasConfig = {
		// "giftDialog":"./../../components2/giftDialog.vue",
		// "ruleDialog":"./../../components2/ruleDialog.vue"
	}
	var resultAliasConfig = {};
	// Object.assign()把一个或多个源对象的可枚举属性值复制到目标对象中，返回值为目标对象
	Object.assign(resultAliasConfig, globalAliasConfig, localAliasConfig);
	return resultAliasConfig;
}