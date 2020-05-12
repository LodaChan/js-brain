((global, chunkId,module) => {
    
    // CommonJS : module.exports = testModule
    // ES6      : module export testModule
    function exportModule() {
        this.__chunkId = chunkId;
        this.__moduleName = module;
        this.fn1 = () => { };
        this.fn2 = () => { };
    }

    global[chunkId] = new exportModule();

})(window["webpackJsonp"] = window["webpackJsonp"] || [], 0, 'testModule');