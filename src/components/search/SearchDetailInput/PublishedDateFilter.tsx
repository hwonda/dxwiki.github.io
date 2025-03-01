import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/locale';

interface PublishedDateFilterProps {
  activeModal: string | null;
  handleFilterClick: (modalName: string)=> void;
  publishedDateRange: [Date | null, Date | null];
  hasInteractedPublished: boolean;
  handleDateChange: (dates: [Date | null, Date | null], type: 'published' | 'modified')=> void;
  formatDateRange: (range: [Date | null, Date | null])=> string;
}

const PublishedDateFilter = ({
  activeModal,
  handleFilterClick,
  publishedDateRange,
  hasInteractedPublished,
  handleDateChange,
  formatDateRange,
}: PublishedDateFilterProps) => {
  return (
    <div
      onClick={() => handleFilterClick('publishedDate')}
      className={`peer/published group hidden lg:flex flex-col py-3 px-6 rounded-full relative cursor-pointer
        before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:h-8 before:w-px before:bg-gray2
        ${ activeModal === 'publishedDate' ? 'before:bg-primary' : '' }
        ${ activeModal === 'complex' ? 'before:bg-primary' : '' }
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
        <div className="filter-modal absolute top-full left-0 mt-2 w-64 border border-primary bg-background shadow-lg dark:shadow-gray5 rounded-lg p-3.5 z-10">
          <div className="text-sm font-medium mb-2.5">{'발행일'}</div>
          <div className="flex justify-center">
            <DatePicker
              selected={publishedDateRange[0]}
              onChange={(dates) => handleDateChange(dates as [Date | null, Date | null], 'published')}
              startDate={publishedDateRange[0]}
              endDate={publishedDateRange[1]}
              selectsRange
              calendarClassName="dark:bg-background"
              locale={ko}
              inline
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default PublishedDateFilter;