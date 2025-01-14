import { getProfileData } from '@/utils/profilesData';
import ContactClient from '@/components/common/ContactClient';
import Footer from '@/components/common/Footer';

const ContactPage = async () => {
  const profile = await getProfileData();
  return (
    <>
      <ContactClient profile={profile} />
      <div className='block sm:hidden'>
        <Footer />
      </div>
    </>
  );
};

export default ContactPage;
