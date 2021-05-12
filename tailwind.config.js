module.exports = {
  // purgeで設定したファイルの中で使われているtailwindクラスの
  // ユーティリティだけ、deploy時にcssファイルとして出力してくれる
  purge: ['./pages/**/*.tsx', './components/**/*.tsx'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
