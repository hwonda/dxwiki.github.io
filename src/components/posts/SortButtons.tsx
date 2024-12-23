import { SortType, SortDirection } from '@/types';
import { Dropdown, DropdownTrigger, DropdownList, DropdownItem } from '@/components/ui/Dropdown';

interface SortButtonsProps {
  sortType: SortType;
  sortDirection: SortDirection;
  onSortChange: (type: SortType)=> void;
  onSortMobile: (type: SortType, direction: SortDirection)=> void;
}

const sortTypeLabel = {
  updated: { label: '날짜', desc: '최근순', asc: '과거순' },
  difficulty: { label: '난이도', desc: '높은순', asc: '낮은순' },
  DA: { label: 'DA 관련', desc: '높은순', asc: '낮은순' },
  DE: { label: 'DE 관련', desc: '높은순', asc: '낮은순' },
  DS: { label: 'DS 관련', desc: '높은순', asc: '낮은순' },
};

const SortButtons = ({ sortType, sortDirection, onSortChange, onSortMobile }: SortButtonsProps) => {
  const getSortIcon = (type: SortType) => {
    if (sortType !== type) return '•';
    return sortDirection === 'asc' ? '↑' : '↓';
  };

  const getSortText = (type: SortType) => {
    if (sortType !== type) return '';
    return sortDirection === 'asc' ? sortTypeLabel[type].asc : sortTypeLabel[type].desc;
  };

  const renderSortButton = (type: SortType) => (
    <button
      onClick={() => onSortChange(type)}
      className={`shrink-0 flex items-center gap-0.5 px-1.5 sm:px-2 py-1 text-sm rounded-full border ${
        sortType === type ? 'border-primary text-primary' : 'border-light text-gray1'
      }`}
    >
      <span>{sortTypeLabel[type].label}</span>
      <span className='hidden sm:block'>{getSortText(type)}</span>
      <span>{getSortIcon(type)}</span>
    </button>
  );

  const sortTypes: SortType[] = ['updated', 'difficulty', 'DA', 'DE', 'DS'];

  const getMobileDropdownItems = () => {
    return sortTypes.flatMap((type) => [
      {
        type,
        direction: 'desc' as SortDirection,
        label: `${sortTypeLabel[type].label} ${sortTypeLabel[type].desc}`,
      },
      {
        type,
        direction: 'asc' as SortDirection,
        label: `${sortTypeLabel[type].label} ${sortTypeLabel[type].asc}`,
      },
    ]);
  };

  return (
    <div className="flex items-center gap-2">
      {/* 모바일에서는 드롭다운으로 표시 */}
      <div className="md:hidden">
        <Dropdown>
          <DropdownTrigger>
            <button className="flex items-center gap-1 px-2 py-1 text-sm rounded-full border border-primary text-primary">
              <span>{sortTypeLabel[sortType].label} {getSortText(sortType)}</span>
              <span>{getSortIcon(sortType)}</span>
            </button>
          </DropdownTrigger>
          <DropdownList align='end'>
            {getMobileDropdownItems().map((item, index) => (
              <DropdownItem
                key={index}
                onClick={() => {
                  onSortMobile(item.type, item.direction);
                }}
                className={sortType === item.type && sortDirection === item.direction ? 'text-primary' : ''}
              >
                <div className="flex items-center justify-between w-full">
                  <span>{item.label}</span>
                  <span>{sortType === item.type && sortDirection === item.direction ? '•' : ''}</span>
                </div>
              </DropdownItem>
            ))}
          </DropdownList>
        </Dropdown>
      </div>

      {/* 데스크톱에서는 버튼으로 표시 */}
      <div className="hidden md:flex md:flex-wrap md:gap-2">
        {sortTypes.map((type) => (
          <div key={type}>{renderSortButton(type)}</div>
        ))}
      </div>
    </div>
  );
};

export default SortButtons;