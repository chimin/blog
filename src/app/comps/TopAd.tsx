const html = `
  <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7352271602634363"
    crossorigin="anonymous"></script>
  <!-- Top ad -->
  <ins class="adsbygoogle"
    style="display:block;width:728px;height:50px;margin:auto"
    data-ad-client="ca-pub-7352271602634363"
    data-ad-slot="2478298726"></ins>
  <script>
    (adsbygoogle = window.adsbygoogle || []).push({});
  </script>`;

export function TopAd() {
    return <div dangerouslySetInnerHTML={{ __html: html }}></div>;
}