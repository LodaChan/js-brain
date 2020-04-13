/*
  dep
  订阅中间数组，主要目的关联 observer 与 watcher
  对 computed , data , watch 里面的值 在 dep config 中有不同的策略 
*/

export class Dep {
    subs = [];

    addSub(watcher) {
        this.subs.push(watcher);
    };
    
    notify() {
        this.subs.forEach(function (watcher) {
            watcher.update();
        });
    }

}