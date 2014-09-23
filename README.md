# ファイル構成

- config.rb         :Compass用の設定ファイル
- Gruntfile.js      :Gruntのタスクを記載しているファイル
- package.json      :Gruntの初期設定ファイル
- .gitignore        :Git管理しないファイルを指定しているファイル
- /htdocs/          :Webサイトのルートディレクトリ
- /htdocs/_DEVELOP/ :Sass等開発用のファイルを格納したディレクトリ（サーバーにはアップしない）
- /htdocs/assets/   :共通ファイル一式

# 事前準備
以下をコマンドラインからインストール

- node.js : http://nodejs.org/
- Sass : http://sass-lang.com/
- Compass : http://compass-style.org/

# Gruntの使い方
## node_modulesの読み込み

+ ターミナルでプロジェクトのルートに移動
+ $ npm install　を実行
+ プロジェクトルートに/node_modules/grunt/等のファイルが生成される

## Gruntの実行

+ ターミナルでプロジェクトのルートに移動
+ $ grunt　を実行

# ファイルの監視とコンパイルについて
grunt命令を実行すると、/_DEVELOP内のファイルの監視（watch命令）が走る

## 監視ファイルとコンパイル先

- htdocs/_DEVELOP/scss/以下のscssファイルを更新　→　htdocs/assets/css/style.css　が生成される
- htdocs/_DEVELOP/js/以下の/mineフォルダ内のjsファイルを更新　→　htdocs/assets/js/head.js, htdocs/assets/js/main.js　を生成される

## デバッグ版とリリース版について
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
