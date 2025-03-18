import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/locale';
import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PublishedDateFilterProps {
  activeModal: string | null | undefined;
  handleFilterClick: (modalName: string)=> void;
  publishedDateRange: [Date | null | undefined, Date | null | undefined];
  hasInteractedPublished: boolean;
  handleDateChange: (dates: [Date | null | undefined, Date | null | undefined], type: 'published' | 'modified')=> void;
  formatDateRange: (range: [Date | null | undefined, Date | null | undefined])=> string;
}

const PublishedDateFilter = ({
  activeModal,
  handleFilterClick,
  publishedDateRange,
  hasInteractedPublished,
  handleDateChange,
  formatDateRange,
}: PublishedDateFilterProps) => {
  const [isMonthYearPickerVisible, setIsMonthYearPickerVisible] = useState(false);

  const handleMonthYearChange = (dates: [Date | null, Date | null]) => {
    if (!dates[0]) return;

    if (!dates[1]) {
      const startDate = new Date(dates[0].getFullYear(), dates[0].getMonth(), 1);
      // const endDate = new Date(dates[0].getFullYear(), dates[0].getMonth() + 1, 0);
      handleDateChange([startDate, null], 'published');
      return;
    }

    const startDate = new Date(dates[0].getFullYear(), dates[0].getMonth(), 1);
    const endDate = new Date(dates[1].getFullYear(), dates[1].getMonth() + 1, 0);

    handleDateChange([startDate, endDate], 'published');
    setIsMonthYearPickerVisible(false);
  };

  // 월/년 선택 모드로 전환할 때 날짜 초기화하는 함수 추가
  const handleMonthYearPickerToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isMonthYearPickerVisible) {
      handleDateChange([null, null], 'published');
    }
    setIsMonthYearPickerVisible(!isMonthYearPickerVisible);
  };

  return (
    <div
      onClick={() => handleFilterClick('publishedDate')}
      className={`peer/published group hidden lg:flex flex-col py-3 px-6 rounded-full relative cursor-pointer
        before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:h-8 before:w-px before:bg-gray2
        ${ activeModal === 'publishedDate' ? 'before:bg-primary' : '' }
        ${ activeModal === 'complex' ? 'before:bg-primary' : '' }
        `}
    >
      <label htmlFor="publishedDate" className={`text-[13px] text-main group-hover:cursor-pointer group-hover:text-primary ${ activeModal === 'publishedDate' ? 'text-primary' : '' }`}>
        {'발행일'}
      </label>
      <span className={`${
        hasInteractedPublished ? 'text-main' : 'text-gray1'
      } group-hover:cursor-pointer text-sm truncate`}
      >
        {formatDateRange(publishedDateRange)}
      </span>
      {activeModal === 'publishedDate' && (
        <div className="filter-modal absolute top-full left-0 mt-2 w-64 border border-primary bg-background shadow-lg dark:shadow-gray5 rounded-lg p-3.5 z-10">
          {/* <div className="text-sm font-medium mb-2.5">{publishedDateRange[0]?.toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
          <div className="text-sm font-medium mb-2.5">{publishedDateRange[1]?.toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' })}</div> */}
          <div className="flex justify-center">
            <DatePicker
              selected={publishedDateRange[0]}
              onChange={(dates: [Date | null, Date | null]) => {
                if (isMonthYearPickerVisible) {
                  handleMonthYearChange(dates);
                } else {
                  handleDateChange([
                    dates[0] || undefined,
                    dates[1] || undefined,
                  ], 'published');
                }
              }}
              startDate={publishedDateRange[0]}
              endDate={publishedDateRange[1]}
              selectsRange={true}
              calendarClassName="dark:bg-background"
              locale={ko}
              inline
              showMonthYearPicker={isMonthYearPickerVisible}
              dateFormat="MM/yyyy"
              renderCustomHeader={({
                date,
                decreaseMonth,
                increaseMonth,
                prevMonthButtonDisabled,
                nextMonthButtonDisabled,
                decreaseYear,
                increaseYear,
                prevYearButtonDisabled,
                nextYearButtonDisabled,
              }) => (
                <div className="flex justify-between items-center px-2">
                  {!isMonthYearPickerVisible ? (
                    // 일반 달력 모드일 때 월 네비게이션
                    <>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          decreaseMonth();
                        }}
                        disabled={prevMonthButtonDisabled}
                        type="button"
                        className="p-1 text-primary"
                      >
                        <ChevronLeft />
                      </button>

                      <div
                        onClick={(e) => {
                          handleMonthYearPickerToggle(e);
                        }}
                        className="cursor-pointer font-semibold text-main text-sm"
                      >
                        {new Intl.DateTimeFormat('ko', {
                          year: 'numeric',
                          month: 'long',
                        }).format(date)}
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          increaseMonth();
                        }}
                        disabled={nextMonthButtonDisabled}
                        type="button"
                        className="p-1 text-primary"
                      >
                        <ChevronRight />
                      </button>
                    </>
                  ) : (
                    // 월/년 선택 모드일 때 연도 네비게이션
                    <>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          decreaseYear();
                        }}
                        disabled={prevYearButtonDisabled}
                        type="button"
                        className="p-1 text-primary"
                      >
                        <ChevronLeft />
                      </button>

                      <div className="font-semibold text-main text-sm">
                        {date.getFullYear()}{'년'}
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          increaseYear();
                        }}
                        disabled={nextYearButtonDisabled}
                        type="button"
                        className="p-1 text-primary"
                      >
                        <ChevronRight />
                      </button>
                    </>
                  )}
                </div>
              )}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default PublishedDateFilter;