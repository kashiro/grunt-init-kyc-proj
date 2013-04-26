# grunt-init-kyc-proj

> ウェブサイト制作用[grunt-init][]テンプレートです

[grunt-init]: http://gruntjs.com/project-scaffolding

## インストール

テンプレートをインストールする前に、
[grunt-init][]のインストールが必須です。

[grunt-init][]をインストールした後、
このテンプレートを`~/.grunt-init/`に置いてください。

また、ターミナルにて以下の`git clone`のコマンドを実行することで、インストールできます：
```
git clone https://github.com/choristes/grunt-init-proj.git ~/.grunt-init/jquery
```

_（Windowsでインストールする場合、インストール先は[grunt-initのドキュメント][grunt-init]にご参考ください。）_

## Step 1. テンプレートを展開

ターミナルを起動して、プロジェクト用の空きディレクトリの下に移動して、
以下のコマンドを実行してください。

```
grunt-init kyc-proj
```

_コマンドを実行する際、ディレクトリの下にテンプレートのファイルが自動に生成されます。_
_既存のファイルが上書きされる恐れがありますので、_
_ディレクトリが空いているかどうかを確認した上で実行してください。_

## Step 2. `grunt server`を使って実装

`grunt server`を実行すると、
ローカルサーバーは自動的に立ち上がります。
`http://localhost:9000/`でサイトの状況を確認できます。

`src`ディレクトリ下の編集が保存されると、
編集されたCompassとCoffeeファイルは自動的にコンパイルされ、
ブラウザは自動的にリロードを行います。

## Step 3. `grunt test`を使ってテスト

`grunt test`を実行すると、
MochaとPhantomJSの組み合わせで、
`test`ディレクトリ中のユニットテストが行われます。

## Step 4. `grunt build`を使ってデプロイ

`grunt build`を実行すると、
`dist`ディレクトリにデプロイ用のコードが生成されます。
Compass、CSS、CoffeeScriptとJavaScriptファイルはHTML中の記述に従って統括されます。