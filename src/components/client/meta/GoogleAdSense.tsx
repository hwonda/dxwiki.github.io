import { useEffect } from 'react';

const GoogleAdSense = () => {
  const adsenseAccountId = process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_ID;

  useEffect(() => {
    if (!adsenseAccountId) {
      console.log('Google AdSense account ID가 설정되지 않았습니다.');
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js';
    script.async = true;
    script.setAttribute('data-ad-client', process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_ID || '');
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [adsenseAccountId]);

  return null;
};

export default GoogleAdSense;