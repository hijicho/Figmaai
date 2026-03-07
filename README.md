
  # FigmaAI

  This is a code bundle for FigmaAI. The original project is available at https://www.figma.com/design/kx3M4D2Q5y0u1FCWuxh4N1/FigmaAI.

  ## Running the code

  Run `npm i` to install the dependencies.

  Run `npm run dev` to start the development server.

  ① インポート文を消す（またはコメントアウトする）
ファイルの一番上の方にある、この行を削除するか、先頭に // をつけて無効化します。

JavaScript
// 変更前
import Link from "next/link";

// 変更後（消すか、このように // をつける）
// import Link from "next/link";
  ② <Link> を <a> に書き換える
続けて、タグ自体をViteでも動く普通のHTMLリンク（aタグ）に直します。
検索窓に <Link  （※うしろに半角スペースを入れてください）、置換窓に <a  と入れて「すべて置換」を押します！
検索窓に </Link> 、置換窓に </a> と入れて「すべて置換」を押します！