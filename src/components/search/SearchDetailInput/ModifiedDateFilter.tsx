import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/locale';

interface ModifiedDateFilterProps {
  activeModal: string | null;
  handleFilterClick: (modalName: string)=> void;
  modifiedDateRange: [Date | null, Date | null];
  hasInteractedModified: boolean;
  handleDateChange: (dates: [Date | null, Date | null], type: 'published' | 'modified')=> void;
  formatDateRange: (range: [Date | null, Date | null])=> string;
}

const ModifiedDateFilter = ({
  activeModal,
  handleFilterClick,
  modifiedDateRange,
  hasInteractedModified,
  handleDateChange,
  formatDateRange,
}: ModifiedDateFilterProps) => {
  return (
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
        <div className="filter-modal absolute top-full right-0 mt-2 w-64 border border-primary bg-background shadow-lg dark:shadow-gray5 rounded-lg p-3.5 z-10">
          <div className="text-sm font-medium mb-2.5">{'수정일'}</div>
          <div className="flex justify-center">
            <DatePicker
              selected={modifiedDateRange[0]}
              onChange={(dates) => handleDateChange(dates as [Date | null, Date | null], 'modified')}
              startDate={modifiedDateRange[0]}
              endDate={modifiedDateRange[1]}
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

export default ModifiedDateFilter;