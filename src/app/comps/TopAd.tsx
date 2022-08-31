import { useRef, useEffect } from "react";

export function TopAd() {
  useEffect(() => {
    ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
  }, []);

  return (
    <div className="top-ad" >
      <ins className="adsbygoogle"
        style={{ display: 'block', width: '728px', height: '50px', margin: 'auto' }}
        data-ad-client="ca-pub-7352271602634363"
        data-ad-slot="2478298726"></ins>
    </div >
  );
}