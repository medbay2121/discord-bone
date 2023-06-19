
//JavaScriptでは関数も変数として定義する
const hello = function (){
  try {
    console.log("Hello World");
    return;
  }catch (e) {
    console.log(e);
  }
}
  
//変数をファイル外にエクスポートする時はこの書き方をする
//関数以外にファイル内の変数なんかもエクスポートできる
exports.hello = hello;



