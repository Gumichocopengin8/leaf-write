import { Divider, Typography, Link } from '@mui/material';
import { css } from '@emotion/react';

const Tutorial = () => {
  return (
    <div css={Container}>
      <Typography variant="h4" component="h1">
        リーフライトの使い方ガイド（チュートリアル）
      </Typography>
      <Divider />
      <article>
        <Typography variant="h5" component="h2" css={Header}>
          まずはじめに
        </Typography>
        <Divider />
        <Typography variant="body1" paragraph>
          毎年、年賀状の住所欄は普通はがきとレイアウトが違うので年賀状の住所作成に苦労する人は少なくないかもしれません。また、市販のソフトウェアを
          無料・有料かかわらずインストールをすることに抵抗がある人もいるでしょう。
          リーフライトは毎年たった一度しかない年賀状の住所作成のために新しくソフトをダウンロードしたり、
          手書きをすることを殲滅するための目的として作りました。
          リーフライトができることは年賀状の住所作成、印刷であり現状それ以外のことはできません。レイアウトやフォントの変更等もできません。
          また、半角数字を使うと数字が横を向いてしまうので、漢数字を使うと綺麗にできますがお好みです。
        </Typography>
        <Typography variant="body1" paragraph>
          プライバシー保護のため、入力される住所データ等は一切データベース等に保存しません（データベース等自体をこのサイトでは使っていません）。
          そのため、画面をリロードするとデータが飛ぶのでお気をつけください。
          また、ソースコードが気になる方やバグレポート、プルリクエスト、フィードバック等は
          <Link href="https://github.com/Gumichocopengin8/leaf-write" target="_blank" rel="noreferrer">
            こちら
          </Link>
          からアクセスできます。
          リーフライトのご利用は利用者が責任の上ご利用ください。管理主は一切の責任を負いかねます。
        </Typography>
      </article>
      <article>
        <Typography variant="h5" component="h2">
          推奨ブラウザ一覧
        </Typography>
        <Divider />
        <Typography variant="body1" paragraph>
          <strong>Google Chrome最新バージョン</strong>。Safari,
          Firefox等では印刷時にレイアウトが崩れる可能性があります。
        </Typography>
      </article>
      <article>
        <Typography variant="h5" component="h2">
          使い方
        </Typography>
        <Divider />
        <article>
          <Typography variant="h6" component="h3" gutterBottom>
            ページの説明
          </Typography>
          <dl>
            <dt>
              <Typography variant="subtitle1">
                <em>Home</em>
              </Typography>
            </dt>
            <dd>
              <Typography variant="body1">年賀状の住所をプレビューで確認、印刷するところです。</Typography>
            </dd>
            <dt>
              <Typography variant="subtitle1">
                <em>Address Book</em>
              </Typography>
            </dt>
            <dd>
              <Typography variant="body1">
                宛名データの入力、編集、閲覧等の作業がするところです。また、入力されたデータをCSVファイルとして出力できます。
              </Typography>
            </dd>
            <dt>
              <Typography variant="subtitle1">
                <em>My Info</em>
              </Typography>
            </dt>
            <dd>
              <Typography variant="body1">差出人の住所を作成するところです。</Typography>
            </dd>
            <dt>
              <Typography variant="subtitle1">
                <em>Tutorial</em>
              </Typography>
            </dt>
            <dd>
              <Typography variant="body1">リーフライトの使い方ガイドが記載されているところです。</Typography>
            </dd>
          </dl>
        </article>
        <article>
          <Typography variant="h6" component="h3" gutterBottom>
            宛名データの入力
          </Typography>
          <Typography variant="body1" paragraph>
            宛名住所データの入力方法は３つあります。
            方法１、２の場合だと、名前３、敬称３以降のデータは差出人住所には使われません。
          </Typography>
          <Typography variant="body1" paragraph>
            １つ目は <mark css={HighLight}>Address Bookページ</mark>
            の画面左上にある住所追加ボタンから１つずつ入力する方法です。
          </Typography>
          <Typography variant="body1" paragraph>
            ２つ目はCSVファイルをインポートして作成することです。CSVファイルは
            <Link
              href="https://github.com/Gumichocopengin8/leaf-write/blob/main/public/nengajo.csv"
              target="_blank"
              rel="noreferrer"
            >
              こちら
            </Link>
            からダウンロードしてご利用ください。 郵便番号は<mark css={HighLight}>123-4567</mark>のように
            <strong>ハイフンを忘れない</strong>
            ようにしてください。
          </Typography>
          <Typography variant="body1" paragraph>
            ３つ目は <mark css={HighLight}>My Infoページ</mark>
            の画面から入力する方法です。
          </Typography>
          <Typography variant="body1" paragraph css={Warning}>
            方法１、２のどちらの方法の場合も１行目のデータは差出人データとして扱われます。
            そのため、空テーブルの状態からデータが１つしかないCSVをインポートしたり、住所追加をした場合は
            <mark css={HighLight}>Address Book</mark>
            のテーブルには１行目の<mark css={HighLight}>is_my_address</mark>にチェックが付きますが編集はできません。
            編集は<mark css={HighLight}>My Infoページ</mark>からしてください。ですが、
            <mark css={HighLight}>Address Book</mark>
            テーブルから削除は可能です。その場合は新たに１行目となったデータが差出人住所となります。
          </Typography>
        </article>
        <article>
          <Typography variant="h6" component="h3" gutterBottom>
            宛名データの編集
          </Typography>
          <Typography variant="body1" paragraph>
            テーブルセルをダブルクリックすることでデータを編集することができます。
            <mark css={HighLight}>is_my_address</mark>のチェックが付いているデータと全ての行のIDは編集不可です。
          </Typography>
        </article>
        <article>
          <Typography variant="h6" component="h3" gutterBottom>
            差出人データの入力
          </Typography>
          <Typography variant="body1" paragraph>
            １つ目のデータが差出人データとして扱われます。
            <mark css={HighLight}>My Infoページ</mark>にアクセスして、住所を編集することができます。
            編集後は必ずSAVEボタンを押してください。
            差出人データは宛名住所と同様データベース等には保存されず、ローカルメモリ上に保持されるのでリロードしたらデータが飛びます。
          </Typography>
        </article>
        <article>
          <Typography variant="h6" component="h3" gutterBottom>
            プレビュー
          </Typography>
          <Typography variant="body1" paragraph>
            データの入力後Home画面でプレビューを見ることができます。もし、レイアウトに合わない場合は再度
            <mark css={HighLight}>Address Bookページ</mark>でデータを編集してください。
          </Typography>
        </article>
        <article>
          <Typography variant="h6" component="h3" gutterBottom>
            印刷
          </Typography>
          <Typography variant="body1" paragraph>
            プレビューに問題がなければ印刷ボタンを押して印刷してください。
            <mark css={Warning}>印刷画面のプレビューにはハガキの絵柄がなくなりますが問題ありません。</mark>
            最初と最後のページが空白になる場合がありますが、問題なく印刷できます。
            また、ページの範囲指定をして頂ければ空ページを印刷しなくてすみます。
            印刷の際はマージン（余白）やヘッダーはつけないようにしてください。
          </Typography>
        </article>
        <article>
          <Typography variant="h6" component="h3" gutterBottom>
            エクスポート
          </Typography>
          <Typography variant="body1" paragraph>
            作業後は <mark css={HighLight}>Address Bookページ</mark>
            からCSVファイルをエクスポートしておくと将来的に再度データを利用することができます。
            <mark css={Warning}>注意点</mark>として
            <mark css={HighLight}>is_my_address</mark>
            のチェックが付いているデータが１番目に来るようにソートして下さい。そうすることによって次回、差出人データとして使うことができます。
            また、フィルターやソート等を有効にしたままエクスポートすると、それらが反映された状態でエクスポートされることになるので再度ご確認ください。
          </Typography>
        </article>
      </article>
    </div>
  );
};

const Container = css`
  padding: 2rem 8rem;

  article > p:first-of-type,
  > article > article:first-of-type > h3 {
    margin-top: 1rem;
  }
`;

const HighLight = css`
  padding: 0.25rem;
  background-color: lightgray;
  opacity: 0.7;
  border-radius: 0.5rem;
`;

const Header = css`
  margin-top: 1rem;
`;

const Warning = css`
  color: crimson;
`;

export default Tutorial;
