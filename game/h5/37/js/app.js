!function(n){var t;function e(n){this.dom=n}function o(t,o){return new e((o||n).querySelector(t))}function c(){o(".btn-start").on("click",function(n){o(".start-container").css("display","none"),o(".game-container").css("display","block"),ResourceManager.onResourceLoaded=function(){(t=new Tetris).startGame()},ResourceManager.init()}),o(".btn-set").on("click",function(){o(".modal-dialog ").css("display","block")}),o("#btn-dialog-close").on("click",function(){o(".modal-dialog ").css("display","none"),t&&t.resume()}),o("#ck-sound").on("change",function(){var n=o("#ck-sound").get().checked;window.TetrisConfig.config.enableSound=n}),o(".btn-game-setting").on("click",function(){}),o(".btn-game-pause").on("click",function(n){var e=n.target;"暂停"===e.innerText?(e.innerText="继续",t.pause()):(e.innerText="暂停",t.resume())}),o(".btn-game-start").on("click",function(n){})}e.prototype.get=function(){return this.dom},e.prototype.on=function(n,t){this.get().addEventListener(n,t)},e.prototype.css=function(n,t){this.get().style[n]=t},n.addEventListener("DOMContentLoaded",function(n){c()})}(document);