import { getTermData } from '@/utils/termsData';
import { notFound } from 'next/navigation';
import { formatDate } from '@/utils/metaData';
import MarkdownContent from './MarkdownContent';
import TableOfContents from '@/components/client/common/TableOfContents';
import RadarChart from '@/components/client/GLRadarChart';
import Stars from '@/components/server/ui/Stars';

interface Props {
  slug: string
}

const PostDetail = async ({ slug }: Props) => {
  const term = await getTermData(slug);

  if (!term) {
    notFound();
  }

  return (
    <div className='prose block md:grid md:grid-cols-[1fr_5fr]'>
      <div className='sticky mt-24 top-[382px] h-32 hidden md:block'>
        <TableOfContents title={term.title.ko} />
      </div>
      <div className='md:mr-40'>
        <div className='sm:ml-5'>
          <div className='flex justify-center sm:justify-start mt-32 border-b border-light'>
            <div className='flex flex-col items-center sm:items-start mb-2'>
              <h1 className="text-3xl font-bold text-main">{term.title.ko}</h1>
              <span className="text-xl font-bold text-sub mb-8 font-noto">{term.title.en}</span>
              <p>{term.description.short}</p>
            </div>
          </div>
          <div className='flex flex-col sm:flex-row justify-start items-end mt-5 gap-2'>
            <span className=''>{'by '}{term.metadata.authors}</span>
            <span className="text-gray-400 hidden sm:block">{'•'}</span>
            <div className='flex gap-2 items-center'>
              <span className=''>{formatDate(term.metadata.created_at)}{' 발행'}</span>
              <span className="text-gray-400">{'•'}</span>
              <span className=''>{formatDate(term.metadata.updated_at)}{' 수정'}</span>
            </div>
          </div>
        </div>
        <div className='sm:ml-5'>
          <section className="group">
            <h2 className="relative flex items-center">
              <span className="text-primary sm:ml-[-20px] mr-2 sm:opacity-0 group-hover:opacity-100 transition-opacity">{'#'}</span>
              {'개념'}
            </h2>
            <MarkdownContent content={term.description.full} />
          </section>

          <section className="group">
            <h2 className='flex items-center'>
              <span className="text-primary sm:ml-[-20px] mr-2 sm:opacity-0 group-hover:opacity-100 transition-opacity">{'#'}</span>
              {'난이도'}
              <span className='ml-4'>
                <Stars rating={term.difficulty.level} />
              </span>
            </h2>
            <div className='mb-2' />
            <MarkdownContent content={term.difficulty.description} />
          </section>

          <section className="group">
            <h2>
              <span className="text-primary sm:ml-[-20px] mr-2 sm:opacity-0 group-hover:opacity-100 transition-opacity">{'#'}</span>
              {'직무 연관도'}
            </h2>
            <div className='block sm:flex items-start gap-10'>
              <div className='w-[100vw-8px] sm:w-[300px] flex justify-center items-center sm:mb-0 sm:mr-2'>
                <RadarChart
                  className="mt-6"
                  targetData={[term.relevance.analyst.score,term.relevance.scientist.score,term.relevance.engineer.score]}
                  labelData={['Analyst', 'Scientist', 'Engineer']}
                  init
                />
              </div>
              <div className='grid grid-cols-[1fr_3fr] h-full mt-4'>
                <span className="text-main text-center sm:m-0">{'직무'}</span>
                <span className="text-main pl-4 sm:m-0">{'설명'}</span>

                <div className="grid grid-rows-3">
                  <h3 className="text-center self-center m-0">{'Analyst'}</h3>
                  <h3 className="text-center self-center m-0">{'Engineer'}</h3>
                  <h3 className="text-center self-center m-0">{'Scientist'}</h3>
                </div>

                <div className="pl-3 grid grid-rows-3">
                  <span className="self-center p-1">{term.relevance.analyst.description}</span>
                  <span className="self-center p-1">{term.relevance.engineer.description}</span>
                  <span className="self-center p-1">{term.relevance.scientist.description}</span>
                </div>

              </div>
            </div>
          </section>

          <section className="group">
            <h2>
              <span className="text-primary sm:ml-[-20px] mr-2 sm:opacity-0 group-hover:opacity-100 transition-opacity">{'#'}</span>
              {'관련용어'}
            </h2>
            <ul>
              {term.terms.map((item, index) => (
                <li key={index} className='flex items-center gap-3 mb-2'>
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {item.term}
                  </a>
                  {item.description}
                </li>
              ))}
            </ul>
          </section>

          <section className="group">
            <h2>
              <span className="text-primary sm:ml-[-20px] mr-2 sm:opacity-0 group-hover:opacity-100 transition-opacity">{'#'}</span>
              {'사용사례'}
            </h2>
            <div className="flex flex-wrap gap-1 mb-4">
              {term.usecase.industries.map((tag, index) => (
                <button
                  key={index}
                  className="tag-button"
                >
                  {tag}
                </button>
              ))}
            </div>
            <p>{term.usecase.example}</p>
            <p>{term.usecase.description}</p>
          </section>

          <section className="group">
            <h2>
              <span className="text-primary sm:ml-[-20px] mr-2 sm:opacity-0 group-hover:opacity-100 transition-opacity">{'#'}</span>
              {'레퍼런스'}
            </h2>
            <div>
              <h3>{'1. Tutorials'}</h3>
              <ul>
                {term.references.tutorials.map((tutorial, index) => (
                  <li key={index}>
                    <a href={tutorial.link} target="_blank" rel="noopener noreferrer">{tutorial.title}</a>
                    <div className=''>{tutorial.platform}</div>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3>{'2. Books'}</h3>
              <ul>
                {term.references.books.map((book, index) => (
                  <li key={index}>
                    <div>
                      <a href={book.link} target="_blank" rel="noopener noreferrer">{book.title}</a>
                    </div>
                    <div className=''>{' by '}{book.authors.join(', ')}{'('}{book.year}{', '}{book.publisher}{')'}</div>
                    <div className=''>{'ISBN: '}{book.isbn}</div>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3>{'3. Academic'}</h3>
              <ul>
                {term.references.academic.map((paper, index) => (
                  <li key={index}>
                    <a href={paper.link} target="_blank" rel="noopener noreferrer">{paper.title}</a>
                    <div className=''>{paper.authors.join(', ')}{' ('}{paper.year}{') '}</div>
                    <div className=''>{'DOI: '}{paper.doi}</div>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3>{'4. Open Source'}</h3>
              <ul>
                {term.references.opensource.map((project, index) => (
                  <li key={index}>
                    <a href={project.link} target="_blank" rel="noopener noreferrer">{project.name}</a>
                    <div className=''>{project.description}</div>
                    <div className=''>{'(License: '}{project.license}{')'}</div>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section className="group">
            <h2>
              <span className="text-primary sm:ml-[-20px] mr-2 sm:opacity-0 group-hover:opacity-100 transition-opacity">{'#'}</span>
              {'태그'}
            </h2>
            <div className="flex flex-wrap gap-1">
              {term.tags.map((tag, index) => (
                <button
                  key={index}
                  className="tag-button"
                >
                  {tag}
                </button>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PostDetail;