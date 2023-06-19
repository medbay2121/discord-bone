
//Node.jsはCommon JSなのでimportではなくrequireを使う
const mul_function = require('./mul_function.js');
const querystring = require('querystring');
const discord = require('discord.js');
const client = new discord.Client();

//エラーの例外処理のためにtry~catchを使う
try{
    
//常時起動のためのプログラム
  const http = require('http');
  http
    .createServer(function (req, res) {
      //データタイプがPOSTのみ受け取る
      if (req.method == "POST") {
        var data = "";
        req.on("data", function (chunk) {
          data += chunk;
        });
        req.on("end", function () {
          if (!data) {
            res.end("No post data");
            return;
          }
          var dataObject = querystring.parse(data);
          console.log("post:" + dataObject.type);
          //Objecttypeが起動プログラムのものであるときのみ受け取る
          if (dataObject.type == "wake") {
            console.log("Woke up in post");
            res.end();
            return;
          }
          res.end();
        });
      } else if (req.method == "GET") {
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end("Discord Bot is active now\n");
      }
    })
    .listen(3000);

  

  //起動確認
  client.on('ready', () => {
    console.log('ready');
  })
  
  //送られてきたメッセージの受け取り
  //アロー演算子はJavaScript特有の関数記述の方法
  client.on('message', message => {
    //BOTのメッセージは無視
    if(message.author.bot) return;
    
    //その言葉が含まれる時に返信する（.match）
    if(message.content.match(message.content.match(/大和撫子/))){
        message.channel.send('呼びました？');
    }
  
    //完全一致(その言葉以外送られてきてない)の時に返信する（===）
    if(message.content === 'にゃ〜ん'){
      message.channel.send('にゃにゃにゃ〜ん');
    }

    //関数の使い方はモジュール系と同じ
    if(message.content === "Hey"){
      //コンソールにHello Worldと送られてくる
      mul_function.hello();
    }

  })
         
  
  //例外処理のひとつ
  if (process.env.TOKEN == undefined) {
    console.log("TOKENが設定されていません。");
    process.exit(0);
  }
  //ログイントークンなどSECRETな情報は.envファイルに記述しよう
  //今回のDiscordのログイントークン名は「TOKEN」
  client.login(process.env.TOKEN);

  
}catch (e) {
 console.log(e);
}
