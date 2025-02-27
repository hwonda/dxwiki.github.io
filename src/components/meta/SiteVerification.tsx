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
        content="eec719b4c5e6a60878bda345c712c22a66aa76da"
      />
    </>
  );
};

export default GoogleVerification;