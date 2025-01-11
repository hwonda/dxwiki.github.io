'use client';

import Link from 'next/link';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { useState, useEffect, useRef } from 'react';
import { Search, ChevronLeft } from 'lucide-react';

const SearchDetailInput = () => {
  const { terms } = useSelector((state: RootState) => state.terms);
  const [searchQuery, setSearchQuery] = useState('');
  // const [publishedDate, setPublishedDate] = useState('');
  // const [modifiedDate, setModifiedDate] = useState('');
  // const [difficulty, setDifficulty] = useState('');
  // const [jobRelevance, setJobRelevance] = useState('');
  // const [searchTerm, setSearchTerm] = useState('');
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const placeholder = terms.length ? `${ terms.length }개의 데이터 용어 검색` : '검색어 입력해주세요';

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!(e.target as Element).closest('.filter-modal')) {
        setActiveModal(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const redirect = (e: React.KeyboardEvent<HTMLInputElement>, term: string) => {
    if (e.key === 'Enter') {
      window.location.href = `/posts?q=${ term
        .trim()
        .split(' ')
        .join('+') }`;
    }
  };

  const handleFilterClick = (modalName: string) => {
    const newActiveModal = activeModal === modalName ? null : modalName;
    setActiveModal(newActiveModal);

    if (modalName === 'searchQuery' && newActiveModal === null) {
      inputRef.current?.blur();
    }
  };

  return (
    <div className="relative w-full mt-2 mb-10">
      <div className={`w-full flex items-center border border-light rounded-full bg-background ${ activeModal ? 'border-primary' : '' }`}>
        <div className='ml-3'>
          <Link
            href="/"
            className='flex items-center justify-center size-11 rounded-full hover:bg-gray3'
          >
            <ChevronLeft className='size-5' />
          </Link>
        </div>
        <div className="w-full grid grid-cols-[4fr_1.5fr_1.5fr_2fr_2.5fr] items-center">
          {/* 검색어 */}
          <div
            onClick={() => handleFilterClick('searchQuery')}
            className='peer/search group flex flex-col py-3 px-4 rounded-full'
          >
            <label htmlFor="searchQuery" className={`text-xs text-main group-hover:cursor-pointer group-hover:text-primary ${ activeModal === 'searchQuery' ? 'text-primary' : '' }`}>
              {'검색어'}
            </label>
            <input
              id="searchQuery"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => redirect(e, searchQuery)}
              placeholder={placeholder}
              className="bg-transparent focus:outline-none placeholder:text-gray1 text-main"
            />
          </div>

          {/* 난이도 */}
          <div
            onClick={() => handleFilterClick('difficulty')}
            className={`peer/difficulty group flex flex-col py-3 px-6 rounded-full relative cursor-pointer
              before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:h-8 before:w-px before:bg-gray2
              ${ activeModal === 'difficulty' ? 'before:bg-primary' : '' }
              ${ activeModal === 'searchQuery' ? 'before:bg-primary' : '' }
              `}
          >
            <label htmlFor="difficulty" className={`text-xs text-main group-hover:cursor-pointer group-hover:text-primary ${ activeModal === 'difficulty' ? 'text-primary' : '' }`}>
              {'난이도'}
            </label>
            <span className='text-gray1 group-hover:cursor-pointer'>{'전체'}</span>
            {activeModal === 'difficulty' && (
              <div className="filter-modal absolute top-full left-0 mt-2 w-48 border border-primary bg-background shadow-lg rounded-lg p-4 z-10">
                <h3 className="font-medium mb-2">{'난이도 선택'}</h3>
                <div className="space-y-2">
                  <div className="cursor-pointer p-2 rounded">{'초급'}</div>
                  <div className="cursor-pointer p-2 rounded">{'중급'}</div>
                  <div className="cursor-pointer p-2 rounded">{'고급'}</div>
                </div>
              </div>
            )}
          </div>

          {/* 직무 연관도 */}
          <div
            onClick={() => handleFilterClick('jobRelevance')}
            className={`peer/job group flex flex-col py-3 px-6 rounded-full relative cursor-pointer
              before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:h-8 before:w-px before:bg-gray2
              ${ activeModal === 'jobRelevance' ? 'before:bg-primary' : '' }
              ${ activeModal === 'difficulty' ? 'before:bg-primary' : '' }
              `}
          >
            <label htmlFor="jobRelevance" className={`text-xs text-main group-hover:cursor-pointer group-hover:text-primary ${ activeModal === 'jobRelevance' ? 'text-primary' : '' }`}>
              {'직무 연관도'}
            </label>
            <span className='text-gray1 group-hover:cursor-pointer'>{'전체'}</span>
            {activeModal === 'jobRelevance' && (
              <div className="filter-modal absolute top-full left-0 mt-2 w-48 border border-primary bg-background shadow-lg rounded-lg p-4 z-10">
                <h3 className="font-medium mb-2">{'직무 연관도'}</h3>
                <div className="space-y-2">
                  <div className="cursor-pointer p-2 rounded">{'높음'}</div>
                  <div className="cursor-pointer p-2 rounded">{'중간'}</div>
                  <div className="cursor-pointer p-2 rounded">{'낮음'}</div>
                </div>
              </div>
            )}
          </div>

          {/* 발행일 */}
          <div
            onClick={() => handleFilterClick('publishedDate')}
            className={`peer/published group flex flex-col py-3 px-6 rounded-full relative cursor-pointer
              before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:h-8 before:w-px before:bg-gray2
              ${ activeModal === 'publishedDate' ? 'before:bg-primary' : '' }
              ${ activeModal === 'jobRelevance' ? 'before:bg-primary' : '' }
              `}
          >
            <label htmlFor="publishedDate" className={`text-xs text-main group-hover:cursor-pointer group-hover:text-primary ${ activeModal === 'publishedDate' ? 'text-primary' : '' }`}>
              {'발행일'}
            </label>
            <span className='text-gray1 group-hover:cursor-pointer'>{'전체 기간'}</span>
            {activeModal === 'publishedDate' && (
              <div className="filter-modal absolute top-full left-0 mt-2 w-48 border border-primary bg-background shadow-lg rounded-lg p-4 z-10">
                <h3 className="font-medium mb-2">{'발행일 선택'}</h3>
                <div className="space-y-2">
                  <div className="cursor-pointer p-2 rounded">{'최근 1주일'}</div>
                  <div className="cursor-pointer p-2 rounded">{'최근 1개월'}</div>
                  <div className="cursor-pointer p-2 rounded">{'최근 3개월'}</div>
                  <div className="cursor-pointer p-2 rounded">{'전체 기간'}</div>
                </div>
              </div>
            )}
          </div>

          {/* 수정일 */}
          <div
            onClick={() => handleFilterClick('modifiedDate')}
            className={`group flex justify-between items-center py-3 pl-6 pr-3 rounded-full cursor-pointer relative
              before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:h-8 before:w-px before:bg-gray2
              ${ activeModal === 'modifiedDate' ? 'before:bg-primary' : '' }
              ${ activeModal === 'publishedDate' ? 'before:bg-primary' : '' }
              `}
          >
            <div className='flex flex-col group-hover:cursor-pointer'>
              <label htmlFor="modifiedDate" className={`text-xs text-main group-hover:cursor-pointer group-hover:text-primary ${ activeModal === 'modifiedDate' ? 'text-primary' : '' }`}>
                {'수정일'}
              </label>
              <span className='text-gray1 group-hover:cursor-pointer'>{'전체 기간'}</span>
            </div>
            {activeModal === 'modifiedDate' && (
              <div className="filter-modal absolute top-full left-0 mt-2 w-48 border border-primary bg-background shadow-lg rounded-lg p-4 z-10">
                <h3 className="font-medium mb-2">{'수정일 선택'}</h3>
                <div className="space-y-2">
                  <div className="cursor-pointer p-2 rounded">{'최근 1주일'}</div>
                  <div className="cursor-pointer p-2 rounded">{'최근 1개월'}</div>
                  <div className="cursor-pointer p-2 rounded">{'최근 3개월'}</div>
                  <div className="cursor-pointer p-2 rounded">{'전체 기간'}</div>
                </div>
              </div>
            )}
          </div>
          {/* 검색 버튼 */}
          <div className='absolute right-3 top-1/2 -translate-y-1/2'>
            <button
              className="flex items-center justify-center size-11 rounded-full hover:bg-[#03537f] bg-primary"
            >
              <Search className="text-white size-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchDetailInput;
