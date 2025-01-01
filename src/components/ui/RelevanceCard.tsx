import '@/app/style/card.css';

interface CardComponentProps {
  score: number;
  description: string;
  title: string;
  subtitle: string;
  imageUrl: string;
  className?: string;
}

const RelevanceCard = ({
  score,
  description,
  title,
  subtitle,
  imageUrl,
  className,
}: CardComponentProps) => {
  let tag = '';

  switch (title) {
    case '데이터 분석가':
      tag = 'DA';
      break;
    case '데이터 엔지니어':
      tag = 'DE';
      break;
    case '데이터 과학자':
      tag = 'DS';
      break;
  }

  return (
    <div className={`card size-full min-h-80 rounded-lg border border-light overflow-hidden flex flex-col relative ${ className }`}>
      <div className="h-64 overflow-hidden relative">
        <div
          className="card-image bg-cover bg-center size-full"
          style={{ backgroundImage: `url(${ imageUrl })` }}
        />
        <span
          className="absolute top-2 right-3 text-white text-2xl font-bold"
          style={{ textShadow: '2px 2px 4px rgba(0, 0, 10, 0.9)' }}
        >
          {'L'}
          {score}
        </span>
        <span
          className="absolute text-white text-xl font-bold left-4 top-[215px]"
          style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}
        >
          {title}
        </span>
      </div>
      <div className="p-4 bg-white dark:bg-black opacity-90 flex-1 relative z-10">
        <div className="text-primary mb-2 text-sm">
          {tag}
          {' | '}
          {subtitle}
        </div>
        <div className="card-description text-sub text-sm font-semibold">{description}</div>
      </div>
    </div>
  );
};

export default RelevanceCard;
