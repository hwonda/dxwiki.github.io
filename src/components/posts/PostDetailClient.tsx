'use client';

import { useState, useCallback } from 'react';
import TableOfContents from '@/components/common/TableOfContents';
import ShareModal from '@/components/common/ShareModal';

interface Props {
  title: string;
  children: React.ReactNode;
}

const PostDetailClient = ({ title, children }: Props) => {
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  const handleShare = useCallback(() => {
    setIsShareModalOpen(true);
  }, []);

  return (
    <div className='prose block md:grid md:grid-cols-[1fr_5fr]'>
      <TableOfContents
        title={title}
        onShare={handleShare}
      />
      <div className='md:grid md:grid-cols-[1fr_160px]'>
        <div className='text-justify'>
          {children}
        </div>
        <div>
          <amp-ad width="100vw" height="600"
            type="adsense"
            data-ad-client="ca-pub-1278038564950020"
            data-ad-slot="5547328424"
            data-auto-format="rspv"
            data-full-width=""
          >
            <div overflow="" />
          </amp-ad>
        </div>
      </div>

      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
      />
    </div>
  );
};

export default PostDetailClient;