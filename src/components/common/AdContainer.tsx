import Script from 'next/script';

interface AdContainerProps {
  slot: string;
  format: string;
  className?: string;
}

const AdContainer = ({ slot, format, className }: AdContainerProps) => {
  return (
    <div className="googleAd-container">
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
        strategy="afterInteractive"
      />
      <ins
        className={`adsbygoogle block ${ className }`}
        data-ad-client="ca-pub-1278038564950020"
        data-ad-slot={slot}
        data-auto-format={format}
        data-full-width-responsive="true"
      />
      <Script id="ads-init" strategy="afterInteractive">
        {'(adsbygoogle = window.adsbygoogle || []).push({});'}
      </Script>
    </div>
  );
};

export default AdContainer;