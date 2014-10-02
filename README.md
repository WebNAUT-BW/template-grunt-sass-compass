# 概要
フロントエンド開発用のGruntテンプレート。  
- Sass[Compass]のビルド
- CSS,JavaScriptの結合・圧縮
- ローカルサーバー接続
を行います。

## ファイル構成
- config.rb         :Compass用の設定ファイル
- Gruntfile.js      :Gruntのタスクを記載しているファイル
- package.json      :Gruntの初期設定ファイル
- /htdocs/          :Webサイトのルートディレクトリ
- /htdocs/_DEVELOP/ :Sass等開発用のファイルを格納したディレクトリ（サーバーにはアップしない）
- /htdocs/assets/   :Gruntで生成したファイルが出力されるディレクトリ、他画像など共通ファイル一式の格納先

## 事前準備
以下をコマンドラインからインストール

- node.js : http://nodejs.org/
- Sass : http://sass-lang.com/
- Compass : http://compass-style.org/

## Gruntの使い方
### node_modulesの読み込み

+ ターミナルでプロジェクトのルートに移動
+ $ npm install　を実行
+ プロジェクトルートに/node_modules/grunt/等のファイルが生成される

### Gruntの実行

+ ターミナルでプロジェクトのルートに移動
+ $ grunt　を実行

### デバッグ版とリリース版について
開発段階ではソースの圧縮を使わず、リリース時にのみ圧縮のコマンドを実行させる  
Gruntfile.jsのタスク部分を　'build:debug'　とするとデバッグ版になり、　'build:release'　とするとリリース版になる。

```js:gruntタスク
grunt.registerTask(
	'default',
	[
		'build:debug'
	]
);
```

## ファイルの監視とコンパイルについて
grunt命令を実行すると、/_DEVELOP内のファイルの監視（watch命令）が走る

### 監視ファイルとコンパイル先について

####Sass->CSS
- htdocs/_DEVELOP/scss/　以下のscssファイルを更新
- htdocs/_DEVELOP/css/　にstyle.css（非圧縮）とstyle.min.css（圧縮）のCSSが生成される
- デバッグ時は　htdocs/_DEVELOP/css/　から　htdocs/assets/css/　にstyle.css（非圧縮）が複製される
- リリース時は　htdocs/_DEVELOP/css/　から　htdocs/assets/css/　にstyle.min.css（圧縮）が複製される

####JavaScript
- htdocs/_DEVELOP/js/　以下の/mineフォルダ内のjsファイルを更新
- htdocs/_DEVELOP/js/head/libs/とhtdocs/_DEVELOP/js/head/mine/　を結合したファイルとして　htdocs/_DEVELOP/js/head/all.js（非圧縮）とall.min.js（圧縮）が生成される
- htdocs/_DEVELOP/js/main/libs/とhtdocs/_DEVELOP/js/main/mine/　を結合したファイルとして　htdocs/_DEVELOP/js/main/all.js（非圧縮）とall.min.js（圧縮）が生成される
- デバッグ時は　htdocs/_DEVELOP/js/head/all.js　が　htdocs/assets/js/head.js　に　htdocs/_DEVELOP/js/main/all.js　が　htdocs/assets/js/main.js　に複製される
- リリース時は　htdocs/_DEVELOP/js/head/all.min.js　が　htdocs/assets/js/head.js　に　htdocs/_DEVELOP/js/main/all.min.js　が　htdocs/assets/js/main.js　に複製される

##紹介記事
タスク自動化ツール「Grunt」で効率的にマークアップ！  
http://webnaut.jp/markup/1104.html
