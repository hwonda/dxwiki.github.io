import React from 'react';

interface GoogleAnalyticsProps {
  trackingId: string;
}

const GoogleAnalytics = ({ trackingId }: GoogleAnalyticsProps) => {
  if (!trackingId) {
    console.warn('Google Analytics Tracking ID is missing');
    return null;
  }

  return (
    <>
      <script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${ trackingId }`}
      />
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${ trackingId }');
          `,
        }}
      />
    </>
  );
};

export default GoogleAnalytics;
