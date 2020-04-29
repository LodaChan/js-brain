# 与webview交互

#### webview to js

```java
// webView 执行js 函数
- (void)webViewDidFinishLoad:(UIWebView *)webView{
    [webView stringByEvaluatingJavaScriptFromString:@"ocCallJSFunction({'name':'vix'})"];
}
```
```java
// js上下文 执行js函数js上下文 执行js函数
- (void)webViewDidFinishLoad:(UIWebView *)webView{
    JSContext *context = [webView valueForKeyPath:@"documentView.webView.mainFrame.javaScriptContext"];
    [context evaluateScript:@"ocCallJSFunction({'name':'vix'})"];
}
```

```java
// JS调用原生OC的方法，并传值
@protocol JSObjDelegate <JSExport>
- (NSString *)sayHello;
@end
在xxx.m中遵守协议<JSObjDelegate>

- (void)webViewDidFinishLoad:(UIWebView *)webView{
    JSContext *context = [webView valueForKeyPath:@"documentView.webView.mainFrame.javaScriptContext"];
    //定义好JS要调用的方法，sayHello就是调用的方法名
    context[@"app"] = self;//遵守协议 app为js中定义的一个类用来调用sayHello方法
}
- (NSString *)sayHello {
    return "Hello OC";
}
```

```js
function ocCallJSFunction(data) {
    var obj = eval(data);
}
```

#### js to webview

```js
function showToast(toast) {
    javascript:control.showToast(toast);
}
```

```java
@JavascriptInterface
public void showToast(String toast) {
    Toast.makeText(MainActivity.this, toast, Toast.LENGTH_SHORT).show();
    log("show toast success");
}

class JSInterface {
    @JavascriptInterface //注意这个代码一定要加上
    public String showToast(string toast) {
        return toast";
    }
}
webView.addJavascriptInterface(new JSInterface(), "AndroidJS");
```

#### 使用 JsBridge

```js

webView.loadUrl("javascript:JSBridge.trigger('webviewReady')"
```