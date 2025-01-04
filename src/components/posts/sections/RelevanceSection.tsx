'use client';

import { useEffect, useRef, useState } from 'react';
import RelevanceCard from '@/components/ui/RelevanceCard';
import { Relevance } from '@/types';

// Tailwind 브레이크포인트에 맞춰 화면 폭 체크 훅
function useIsSmallScreen() {
  const [isSmall, setIsSmall] = useState(false);
  useEffect(() => {
    const checkScreen = () => {
      // 640px(sm) 이하인지 여부
      setIsSmall(window.innerWidth < 640);
    };
    checkScreen();
    window.addEventListener('resize', checkScreen);
    return () => window.removeEventListener('resize', checkScreen);
  }, []);
  return isSmall;
}

interface RelevanceSectionProps {
  analyst: Relevance['analyst'];
  engineer: Relevance['engineer'];
  scientist: Relevance['scientist'];
}

export default function RelevanceSection({ analyst, engineer, scientist }: RelevanceSectionProps) {
  const [inView, setInView] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  // 작은 화면 판별
  const isSmallScreen = useIsSmallScreen();

  const nullRelevance
    = !analyst?.description && !engineer?.description && !scientist?.description
    && !analyst?.score && !engineer?.score && !scientist?.score;

  // 화면이 md 이상일 때만 IntersectionObserver로 애니메이션 처리
  useEffect(() => {
    if (isSmallScreen) return; // 작은 화면일 경우 애니메이션 로직 무시

    const observer = new IntersectionObserver(
      ([entry]) => {
        const ratio = entry.intersectionRatio;
        // 30% 이상 보이면 inView = true, 미만이면 false
        if (ratio >= 0.3) setInView(true);
        else if (ratio < 0.3) setInView(false);
      },
      { threshold: [0, 0.3, 0.5, 0.7, 1] }
    );

    const currentRef = sectionRef.current;
    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [isSmallScreen]);

  if (nullRelevance) return null;

  return (
    <section ref={sectionRef} className="group-section relative">
      <h2>
        <span className="text-primary sm:ml-[-20px] mr-2.5 sm:opacity-0 group-section-title transition-opacity">
          {'#'}
        </span>
        {'직무 연관도'}
      </h2>

      <div className={isSmallScreen
        ? 'sm-carousel-wrapper overflow-x-auto flex gap-4 snap-x snap-mandatory scroll-smooth'
        : `cards-container ${ inView ? 'show' : '' } grid items-stretch grid-cols-3 gap-3`}
      >
        {analyst && (
          <div className={isSmallScreen ? 'snap-center shrink-0 w-[85%] mx-auto' : ''}>
            <RelevanceCard
              title="데이터 분석가"
              subtitle="Data Analyst"
              score={analyst.score ?? 0}
              description={analyst.description ?? ''}
              className={isSmallScreen ? 'no-animation' : 'card card1'}
              imageUrl="https://cdn.pixabay.com/photo/2016/07/11/17/45/abstract-1510190_1280.png"
            />
          </div>
        )}
        {scientist && (
          <div className={isSmallScreen ? 'snap-center shrink-0 w-[85%] mx-auto' : ''}>
            <RelevanceCard
              title="데이터 과학자"
              subtitle="Data Scientist"
              score={scientist.score ?? 0}
              description={scientist.description ?? ''}
              className={isSmallScreen ? 'no-animation' : 'card card2'}
              imageUrl="https://cdn.pixabay.com/photo/2016/06/02/02/33/triangles-1430105_1280.png"
            />
          </div>
        )}
        {engineer && (
          <div className={isSmallScreen ? 'snap-center shrink-0 w-[85%] mx-auto' : ''}>
            <RelevanceCard
              title="데이터 엔지니어"
              subtitle="Data Engineer"
              score={engineer.score ?? 0}
              description={engineer.description ?? ''}
              className={isSmallScreen ? 'no-animation' : 'card card3'}
              imageUrl="https://cdn.pixabay.com/photo/2016/07/12/07/11/abstract-1511533_1280.jpg"
            />
          </div>
        )}
      </div>
    </section>
  );
}
