import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import LogoAnimation from '@/components/common/LogoAnimation';
import SearchInput from '@/components/common/SearchInput';
import { fetchTermsData } from '@/utils/termsData';

export default async function Home() {
  const terms = await fetchTermsData();

  return (
    <div className="min-h-[calc(100vh_-230px)] flex flex-col justify-center items-end sm:mx-10 md:mx-40 overflow-hidden">
      <LogoAnimation fontSize='10vw' />
      <div className='flex justify-center items-center gap-4 mb-4 text-sm sm:text-base md:text-lg'>
        <p><span className='text-primary font-bold'>{terms.length}</span>{' 개의 데이터 용어사전'}</p>
        <Link href='/posts' className='flex items-center border-0 no-underline text-sub text-sm hover:text-accent hover:font-semibold'>
          {'더보기'}
          <ChevronRight className='size-4' />
        </Link>
      </div>
      <SearchInput />
    </div>
  );
}
