const GoogleVerification = () => {
  const siteVerificationId = 'D34dkEhDhush7JO9qT1TlWowPtkolmsc5wDu9Vr_qLQ';

  return(
    <>
      <meta
        name="google-site-verification"
        content={siteVerificationId}
      />
      <meta
        name="naver-site-verification"
        content="4f2d5a06c90b5260ce153023faef37a2b617c431"
      />
    </>
  );
};

export default GoogleVerification;