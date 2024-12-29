'use client';

import { useState, useCallback } from 'react';
import TableOfContents from '@/components/common/TableOfContents';
import ShareModal from '@/components/common/ShareModal';
import AdContainer from '@/components/common/AdContainer';

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
        <div className='hidden md:flex flex-col ml-4'>
          <div className='w-full h-[425px]' />
          <AdContainer
            slot="5547328424"
            format="mcrspv"
            className="sticky top-[140px] w-40 min-h-[600px]"
          />
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