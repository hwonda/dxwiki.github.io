'use client';

import Link from 'next/link';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { useState, useEffect, useRef } from 'react';
import { Search, ChevronLeft } from 'lucide-react';
import Slider from '@/components/ui/Slider';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const levels = ['기초', '초급', '중급', '고급', '전문']; // 난이도 배열
const relevanceLevels = ['희박', '낮음', '보통', '높음', '밀접'];

const SearchDetailInput = () => {
  const { terms } = useSelector((state: RootState) => state.terms);
  const [searchQuery, setSearchQuery] = useState('');
  // const [difficulty, setDifficulty] = useState('');
  // const [jobRelevance, setJobRelevance] = useState('');
  // const [searchTerm, setSearchTerm] = useState('');
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [range, setRange] = useState<[number, number] | null>(null);
  const [publishedDateRange, setPublishedDateRange] = useState<[Date | null, Date | null]>([null, null]);
  const [modifiedDateRange, setModifiedDateRange] = useState<[Date | null, Date | null]>([null, null]);
  const [selectedQuickSelect, setSelectedQuickSelect] = useState<'all' | 'week' | 'month' | null>('all');
  const [selectedModifiedQuickSelect, setSelectedModifiedQuickSelect] = useState<'all' | 'week' | 'month' | null>('all');
  const [hasInteractedPublished, setHasInteractedPublished] = useState(false);
  const [hasInteractedModified, setHasInteractedModified] = useState(false);
  const [hasInteractedDifficulty, setHasInteractedDifficulty] = useState(false);
  const [hasInteractedJobRelevance, setHasInteractedJobRelevance] = useState(false);
  const [jobRelevanceRange, setJobRelevanceRange] = useState<{
    DS: [number, number];
    DE: [number, number];
    DA: [number, number];
  }>({
    DS: [0, 4],
    DE: [0, 4],
    DA: [0, 4],
  });

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
      if (
        activeModal
        && !(e.target as Element).closest('.filter-modal')
        && !(e.target as Element).closest('[class*="group flex"]')
      ) {
        setActiveModal(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [activeModal]);

  const redirect = (e: React.KeyboardEvent<HTMLInputElement>, term: string) => {
    if (e.key === 'Enter') {
      window.location.href = `/posts?q=${ term
        .trim()
        .split(' ')
        .join('+') }`;
    }
  };

  const handleFilterClick = (modalName: string) => {
    setActiveModal(modalName);

    if (modalName === 'searchQuery' && activeModal === modalName) {
      inputRef.current?.blur();
    }
  };

  const handleRangeChange = (newRange: [number, number] | null) => {
    setRange(newRange);
    setHasInteractedDifficulty(true);
  };

  const handleDateChange = (dates: [Date | null, Date | null], type: 'published' | 'modified') => {
    if (type === 'published') {
      setPublishedDateRange(dates);
      setHasInteractedPublished(true);
      setSelectedQuickSelect(null);
    } else {
      setModifiedDateRange(dates);
      setHasInteractedModified(true);
      setSelectedModifiedQuickSelect(null);
    }
  };

  const formatDateRange = (range: [Date | null, Date | null]) => {
    if (!range[0]) return '전체 기간';

    const formatDate = (date: Date) => {
      const year = date.getFullYear().toString().slice(-2);
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const day = date.getDate().toString().padStart(2, '0');
      return `${ year }.${ month }.${ day }`;
    };

    if (!range[1] || range[0].getTime() === range[1].getTime()) {
      return formatDate(range[0]);
    }
    return `${ formatDate(range[0]) } - ${ formatDate(range[1]) }`;
  };

  const handleQuickSelect = (type: 'all' | 'week' | 'month', dateType: 'published' | 'modified') => {
    if (dateType === 'published') {
      setSelectedQuickSelect(type);
      setHasInteractedPublished(true);
    } else {
      setSelectedModifiedQuickSelect(type);
      setHasInteractedModified(true);
    }

    const today = new Date();
    const startDate = new Date();

    switch (type) {
      case 'week':
        startDate.setDate(today.getDate() - 7);
        break;
      case 'month':
        startDate.setMonth(today.getMonth() - 1);
        break;
      case 'all':
        if (dateType === 'published') {
          setPublishedDateRange([null, null]);
        } else {
          setModifiedDateRange([null, null]);
        }
        return;
    }

    const newRange: [Date, Date] = [startDate, today];
    if (dateType === 'published') {
      setPublishedDateRange(newRange);
    } else {
      setModifiedDateRange(newRange);
    }
    setActiveModal(null);
  };

  const formatDifficultyRange = (range: [number, number] | null) => {
    if (!range) return '전체';
    if (range[0] === 0 && range[1] === levels.length - 1) return '전체';
    return range[0] === range[1] ? levels[range[0]] : `${ levels[range[0]] } - ${ levels[range[1]] }`;
  };

  const handleJobRelevanceRangeChange = (type: 'DS' | 'DE' | 'DA', newRange: [number, number]) => {
    setJobRelevanceRange((prev) => ({
      ...prev,
      [type]: newRange,
    }));
    setHasInteractedJobRelevance(true);
  };

  const formatJobRelevanceRange = () => {
    const formatRange = (range: [number, number]) => {
      if (range[0] === 0 && range[1] === 4) return '전체';
      return `${ relevanceLevels[range[0]] }-${ relevanceLevels[range[1]] }`;
    };

    const dsRange = formatRange(jobRelevanceRange.DS);
    const deRange = formatRange(jobRelevanceRange.DE);
    const daRange = formatRange(jobRelevanceRange.DA);

    if (dsRange === '전체' && deRange === '전체' && daRange === '전체') {
      return '전체';
    }

    return `DS:${ dsRange }, DE:${ deRange }, DA:${ daRange }`;
  };

  const datePickerCustomStyles = `
    .react-datepicker {
      border-color: var(--gray2);
    }
    .react-datepicker__day:hover {
      background-color: var(--gray2) !important;
      color: var(--text) !important;
    }
    .react-datepicker__month-container {
        width: 270px;
        background-color: var(--background);
        border-radius: 5px;
    }
    .react-datepicker__header {
      background-color: var(--gray5);
    }
    .react-datepicker__current-month,
    .react-datepicker__day-name,
    .react-datepicker__day {
      color: var(--text);
    }
    .react-datepicker__day--selected,
    .react-datepicker__day--in-range {
      background-color: var(--background-secondary) !important;
    }
    .react-datepicker__day--in-selecting-range {
      background-color: var(--background-secondary) !important;
    }
    .react-datepicker__day--keyboard-selected {
      background-color: var(--gray3);
    }
  `;

  return (
    <>
      <style>{datePickerCustomStyles}</style>
      <div className="relative w-full mt-2 mb-10">
        <div className={`w-full flex items-center border border-light rounded-full shadow-md dark:shadow-gray4 bg-background ${ activeModal ? 'border-primary' : '' }`}>
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
              className={`peer/difficulty group hidden lg:flex flex-col py-3 px-6 rounded-full relative cursor-pointer
                before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:h-8 before:w-px before:bg-gray2
                ${ activeModal === 'difficulty' ? 'before:bg-primary' : '' }
                ${ activeModal === 'searchQuery' ? 'before:bg-primary' : '' }
                `}
            >
              <label htmlFor="difficulty" className={`text-xs text-main group-hover:cursor-pointer group-hover:text-primary ${ activeModal === 'difficulty' ? 'text-primary' : '' }`}>
                {'난이도'}
              </label>
              <span className={`${
                hasInteractedDifficulty ? 'text-main' : 'text-gray1'
              } group-hover:cursor-pointer text-sm`}
              >
                {formatDifficultyRange(range)}
              </span>
              {activeModal === 'difficulty' && (
                <div className="filter-modal absolute top-full left-0 mt-2 w-72 border border-primary bg-background shadow-lg dark:shadow-gray5 rounded-lg p-4 z-10">
                  <h3 className="font-medium">{'난이도'}</h3>
                  <div className="flex justify-between items-center gap-2 mt-2">
                    <Slider
                      displayLevels={levels}
                      range={range || [0, 4]}
                      onRangeChange={(newRange) => handleRangeChange(newRange)}
                    />
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRangeChange(null);
                      }}
                      className={`shrink-0 px-2 py-1 text-xs rounded-full border transition-colors ${
                        !range
                          ? 'border-primary text-primary'
                          : 'border-gray2 hover:text-primary hover:border-primary'
                      }`}
                    >
                      {'전체'}
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* 직무 연관도 */}
            <div
              onClick={() => handleFilterClick('jobRelevance')}
              className={`peer/job group hidden lg:flex flex-col py-3 px-6 rounded-full relative cursor-pointer
                before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:h-8 before:w-px before:bg-gray2
                ${ activeModal === 'jobRelevance' ? 'before:bg-primary' : '' }
                ${ activeModal === 'difficulty' ? 'before:bg-primary' : '' }
                `}
            >
              <label htmlFor="jobRelevance" className={`text-xs text-main group-hover:cursor-pointer group-hover:text-primary ${ activeModal === 'jobRelevance' ? 'text-primary' : '' }`}>
                {'직무 연관도'}
              </label>
              <span className={`${
                hasInteractedJobRelevance ? 'text-main' : 'text-gray1'
              } text-sm group-hover:cursor-pointer truncate max-w-[68px]`}
              >
                {formatJobRelevanceRange()}
              </span>
              {activeModal === 'jobRelevance' && (
                <div className="filter-modal absolute top-full left-0 mt-2 w-80 border border-primary bg-background shadow-lg dark:shadow-gray5 rounded-lg p-4 z-10">
                  <h3 className="font-medium mb-2">{'직무 연관도'}</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <span className="text-sm">{'DS'}</span>
                      <Slider
                        displayLevels={relevanceLevels}
                        range={jobRelevanceRange.DS}
                        onRangeChange={(newRange) => handleJobRelevanceRangeChange('DS', newRange)}
                      />
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleJobRelevanceRangeChange('DS', [0, 4]);
                        }}
                        className={`shrink-0 text-xs border rounded-full px-2 py-1 ${
                          jobRelevanceRange.DS[0] === 0 && jobRelevanceRange.DS[1] === 4
                            ? 'border-primary text-primary'
                            : 'border-gray2 hover:text-primary hover:border-primary'
                        }`}
                      >
                        {'전체'}
                      </button>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm">{'DE'}</span>
                      <Slider
                        displayLevels={relevanceLevels}
                        range={jobRelevanceRange.DE}
                        onRangeChange={(newRange) => handleJobRelevanceRangeChange('DE', newRange)}
                      />
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleJobRelevanceRangeChange('DE', [0, 4]);
                        }}
                        className={`shrink-0 text-xs border rounded-full px-2 py-1 ${
                          jobRelevanceRange.DE[0] === 0 && jobRelevanceRange.DE[1] === 4
                            ? 'border-primary text-primary'
                            : 'border-gray2 hover:text-primary hover:border-primary'
                        }`}
                      >
                        {'전체'}
                      </button>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm">{'DA'}</span>
                      <Slider
                        displayLevels={relevanceLevels}
                        range={jobRelevanceRange.DA}
                        onRangeChange={(newRange) => handleJobRelevanceRangeChange('DA', newRange)}
                      />
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleJobRelevanceRangeChange('DA', [0, 4]);
                        }}
                        className={`shrink-0 text-xs border rounded-full px-2 py-1 ${
                          jobRelevanceRange.DA[0] === 0 && jobRelevanceRange.DA[1] === 4
                            ? 'border-primary text-primary'
                            : 'border-gray2 hover:text-primary hover:border-primary'
                        }`}
                      >
                        {'전체'}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* 발행일 */}
            <div
              onClick={() => handleFilterClick('publishedDate')}
              className={`peer/published group hidden lg:flex flex-col py-3 px-6 rounded-full relative cursor-pointer
                before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:h-8 before:w-px before:bg-gray2
                ${ activeModal === 'publishedDate' ? 'before:bg-primary' : '' }
                ${ activeModal === 'jobRelevance' ? 'before:bg-primary' : '' }
                `}
            >
              <label htmlFor="publishedDate" className={`text-xs text-main group-hover:cursor-pointer group-hover:text-primary ${ activeModal === 'publishedDate' ? 'text-primary' : '' }`}>
                {'발행일'}
              </label>
              <span className={`${
                hasInteractedPublished ? 'text-main' : 'text-gray1'
              } group-hover:cursor-pointer text-sm truncate`}
              >
                {formatDateRange(publishedDateRange)}
              </span>
              {activeModal === 'publishedDate' && (
                <div className="filter-modal absolute top-full left-0 mt-2 w-80 border border-primary bg-background shadow-lg dark:shadow-gray5 rounded-lg p-5 z-10">
                  <h3 className="font-medium mb-1.5">{'발행일'}</h3>
                  <div className="space-y-3">
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        onClick={() => handleQuickSelect('all', 'published')}
                        className={`px-3 py-1.5 text-sm rounded-full border transition-colors ${
                          (selectedQuickSelect === 'all' && !publishedDateRange[0])
                            ? 'border-primary text-primary'
                            : 'border-gray2 hover:text-primary hover:border-primary'
                        }`}
                      >
                        {'전체 기간'}
                      </button>
                      <button
                        onClick={() => handleQuickSelect('week', 'published')}
                        className={`px-3 py-1.5 text-sm rounded-full border transition-colors ${
                          selectedQuickSelect === 'week'
                            ? 'border-primary text-primary'
                            : 'border-gray2 hover:text-primary hover:border-primary'
                        }`}
                      >
                        {'최근 1주'}
                      </button>
                      <button
                        onClick={() => handleQuickSelect('month', 'published')}
                        className={`px-3 py-1.5 text-sm rounded-full border transition-colors ${
                          selectedQuickSelect === 'month'
                            ? 'border-primary text-primary'
                            : 'border-gray2 hover:text-primary hover:border-primary'
                        }`}
                      >
                        {'최근 1달'}
                      </button>
                    </div>
                    <div className="flex justify-center">
                      <DatePicker
                        selected={publishedDateRange[0]}
                        onChange={(dates) => handleDateChange(dates as [Date | null, Date | null], 'published')}
                        startDate={publishedDateRange[0]}
                        endDate={publishedDateRange[1]}
                        selectsRange
                        calendarClassName="dark:bg-background"
                        inline
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* 수정일 */}
            <div
              onClick={() => handleFilterClick('modifiedDate')}
              className={`group hidden lg:flex justify-between items-center py-3 pl-6 pr-3 rounded-full cursor-pointer relative
                before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:h-8 before:w-px before:bg-gray2
                ${ activeModal === 'modifiedDate' ? 'before:bg-primary' : '' }
                ${ activeModal === 'publishedDate' ? 'before:bg-primary' : '' }
                `}
            >
              <div className='flex flex-col group-hover:cursor-pointer'>
                <label htmlFor="modifiedDate" className={`text-xs text-main group-hover:cursor-pointer group-hover:text-primary ${ activeModal === 'modifiedDate' ? 'text-primary' : '' }`}>
                  {'수정일'}
                </label>
                <span className={`${
                  hasInteractedModified ? 'text-main' : 'text-gray1'
                } group-hover:cursor-pointer text-sm truncate`}
                >
                  {formatDateRange(modifiedDateRange)}
                </span>
              </div>
              {activeModal === 'modifiedDate' && (
                <div className="filter-modal absolute top-full right-0 mt-2 w-80 border border-primary bg-background shadow-lg dark:shadow-gray5 rounded-lg p-5 z-10">
                  <h3 className="font-medium mb-1.5">{'수정일'}</h3>
                  <div className="space-y-3">
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        onClick={() => handleQuickSelect('all', 'modified')}
                        className={`px-3 py-1.5 text-sm rounded-full border transition-colors ${
                          (selectedModifiedQuickSelect === 'all' && !modifiedDateRange[0])
                            ? 'border-primary text-primary'
                            : 'border-gray2 hover:text-primary hover:border-primary'
                        }`}
                      >
                        {'전체 기간'}
                      </button>
                      <button
                        onClick={() => handleQuickSelect('week', 'modified')}
                        className={`px-3 py-1.5 text-sm rounded-full border transition-colors ${
                          selectedModifiedQuickSelect === 'week'
                            ? 'border-primary text-primary'
                            : 'border-gray2 hover:text-primary hover:border-primary'
                        }`}
                      >
                        {'최근 1주'}
                      </button>
                      <button
                        onClick={() => handleQuickSelect('month', 'modified')}
                        className={`px-3 py-1.5 text-sm rounded-full border transition-colors ${
                          selectedModifiedQuickSelect === 'month'
                            ? 'border-primary text-primary'
                            : 'border-gray2 hover:text-primary hover:border-primary'
                        }`}
                      >
                        {'최근 1달'}
                      </button>
                    </div>
                    <div className="flex justify-center">
                      <DatePicker
                        selected={modifiedDateRange[0]}
                        onChange={(dates) => handleDateChange(dates as [Date | null, Date | null], 'modified')}
                        startDate={modifiedDateRange[0]}
                        endDate={modifiedDateRange[1]}
                        selectsRange
                        calendarClassName="dark:bg-background"
                        inline
                      />
                    </div>
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
    </>
  );
};

export default SearchDetailInput;
