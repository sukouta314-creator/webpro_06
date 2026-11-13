const express = require("express");
const app = express();

app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));



app.get("/hello1", (req, res) => {
  const message1 = "Hello world";
  const message2 = "Bon jour";
  res.render('show', { greet1:message1, greet2:message2});
});

app.get("/hello2", (req, res) => {
  res.render('show', { greet1:"Hello world", greet2:"Bon jour"});
});

let station = [
  { id:0, code:"????", name:"きさらぎ駅"},
  { id:1, code:"JE01", name:"東京駅"},
  { id:2, code:"JE07", name:"舞浜駅"},
  { id:3, code:"JE12", name:"新習志野駅"},
  { id:4, code:"JE13", name:"幕張豊砂駅"},
  { id:5, code:"JE14", name:"海浜幕張駅"},
  { id:6, code:"JE05", name:"新浦安駅"},
];

app.get("/keiyo", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  res.render('db1', { data: station });
});


// 追加後にデータ一覧を表示する版（例2）
// フォームの action を "/keiyo_add_list" に変えると確認できる
app.get("/keiyo_add", (req, res) => {
  let id = Number(req.query.id);
  let code = req.query.code;
  let name = req.query.name;
  let newdata = { id: id, code: code, name: name };
  station.push( newdata );
  res.render('db1', { data: station });
});

// 第9回：一覧表示と詳細表示（station2）
let station2 = [
  { id:1, code:"JE01", name:"東京駅", change:"総武本線，中央線，etc", passengers:403831, distance:0 },
  { id:2, code:"JE02", name:"八丁堀駅", change:"日比谷線", passengers:31071, distance:1.2 },
  { id:3, code:"JE05", name:"新木場駅", change:"有楽町線，りんかい線", passengers:67206, distance:7.4 },
  { id:4, code:"JE07", name:"舞浜駅", change:"舞浜リゾートライン", passengers:76156, distance:12.7 },
  { id:5, code:"JE12", name:"新習志野駅", change:"", passengers:11655, distance:28.3 },
  { id:6, code:"JE17", name:"千葉みなと駅", change:"千葉都市モノレール", passengers:16602, distance:39.0 },
  { id:7, code:"JE18", name:"蘇我駅", change:"内房線，外房線", passengers:31328, distance:43.0 },
];

// 一覧表示
app.get("/keiyo2", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  res.render('keiyo2', { data: station2 });
});

// 詳細表示（URLの :number は station2 の配列番号）
app.get("/keiyo2/:number", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  const number = Number(req.params.number);
  const detail = station2[ number ];
  if( detail === undefined ) {
    return res.status(404).send( '該当する駅がありません' );
  }
  res.render('keiyo2_detail', { data: detail } );
});

// やってみよう(2)(3)：駅以外のデータ（本）の一覧表示と追加
let book = [
  { id:1, title:"無職転生", author:"理不尽な孫の手" },
  { id:2, title:"転生したらスライムだった件", author:"伏瀬＆みっつばー" },
  { id:3, title:"この素晴らしい世界に祝福を", author:"三嶋くろね" },
  { id:4, title:"Re:ゼロから始める異世界生活", author:"鼠色猫" },
  { id:5, title:"幼女戦記", author:"カルロ・ゼン" },
  { id:6, title:"オーバーロード", author:"丸山くがね" },
  { id:7, title:"魔法科高校の劣等生", author:"佐島勤" },
  { id:8, title:"ソードアート・オンライン(SAO)", author:"川原礫" },
  { id:9, title:"痛いのは嫌なので防御力に極振りしたいと思います。", author:"夕蜜柑" },
  { id:10, title:"ようこそ実力至上主義の教室へ", author:"衣笠彰梧" },
  { id:11, title:"くま クマ 熊 ベアー", author:"くまなの" },
  { id:12, title:"陰の実力者になりたくて！", author:"逢沢大介" },
  { id:13, title:"乙女ゲームの破滅フラグしかない悪役令嬢に転生してしまった…", author:"山口悟" },
  { id:14, title:"ありふれた職業で世界最強", author:"山口悟" },
  { id:15, title:"ダンジョンに出会いを求めるのは間違っているだろうか", author:"大森藤ノ" },
  { id:16, title:"この勇者が俺TUEEEくせに慎重すぎる", author:"土日月" },
  { id:17, title:"転生した大聖女は、聖女であることをひた隠す", author:"十夜" },
  { id:18, title:"盾の勇者の成り上がり", author:"アネコユサギ" },
];

app.get("/book", (req, res) => {
  res.render('book', { data: book });
});

app.get("/book_add", (req, res) => {
  let id = Number(req.query.id);
  let title = req.query.title
  let author = req.query.author;
  book.push( { id: id, title: title, author: author } );
  res.redirect('/book');   // 追加後は一覧を表示（/book に転送）
});

app.get("/icon", (req, res) => {
  res.render('icon', { filename:"./public/Apple_logo_black.svg", alt:"Apple Logo"});
});

app.get("/omikuji1", (req, res) => {
  const num = Math.floor( Math.random() * 6 + 1 );
  let luck = '';
  if( num==1 ) luck = '大吉';
  else if( num==2 ) luck = '中吉';

  res.send( '今日の運勢は' + luck + 'です' );
});

app.get("/omikuji2", (req, res) => {
  const num = Math.floor( Math.random() * 6 + 1 );
  let luck = '';
  if( num==1 ) luck = '大吉';
  else if( num==2 ) luck = '中吉';

  res.render( 'omikuji2', {result:luck} );
});

app.get("/janken", (req, res) => {
  let hand = req.query.hand;
  let win = Number( req.query.win );
  let total = Number( req.query.total );
  console.log( {hand, win, total});
  const num = Math.floor( Math.random() * 3 + 1 );
  let cpu = '';
  let judgement = '';
  if( num==1 ) cpu = 'グー';
  else if( num==2 ) cpu = 'チョキ';
  else cpu = 'パー';
  // ここに勝敗の判定を入れる
  // 以下の数行は人間の勝ちの場合の処理なので，
  // 判定に沿ってあいこと負けの処理を追加する
  judgement = '勝ち';
  win += 1;
  total += 1;
  const display = {
    your: hand,
    cpu: cpu,
    judgement: judgement,
    win: win,
    total: total
  }
  res.render( 'janken', display );
});


// ラジオボタンで手を選ぶじゃんけん
app.get("/janken2", (req, res) => {
  let hand = req.query.hand;
  let win = Number(req.query.win);
  let total = Number(req.query.total);

  const num = Math.floor(Math.random() * 3 + 1);
  let cpu = "";

  if (num == 1) {
    cpu = "グー";
  } else if (num == 2) {
    cpu = "チョキ";
  } else {
    cpu = "パー";
  }

  let judgement = "";

  if (hand == cpu) {
    judgement = "あいこ";
  } else if (hand == "グー" && cpu == "チョキ") {
    judgement = "勝ち";
    win += 1;
  } else if (hand == "チョキ" && cpu == "パー") {
    judgement = "勝ち";
    win += 1;
  } else if (hand == "パー" && cpu == "グー") {
    judgement = "勝ち";
    win += 1;
  } else {
    judgement = "負け";
  }

  total += 1;

  const display = {
    your: hand,
    cpu: cpu,
    judgement: judgement,
    win: win,
    total: total
  };

  res.render("janken2", display);
});

app.listen(8080, () => console.log("Example app listening on port 8080!"));
