'use client';

import Link from 'next/link';
import { Link as LinkIcon } from 'lucide-react';
import { transformToSlug } from '@/utils/filters';
import { Fragment } from 'react';
import { Terms } from '@/types';

interface RelatedTerm {
  terms: Terms[];
}

const RelatedTermsSection = ({ terms }: RelatedTerm) => {
  if(terms.length === 0) return null;
  return(
    <section className="group">
      <h2>
        <span className="text-primary sm:ml-[-20px] mr-2.5 sm:opacity-0 group-hover:opacity-100 transition-opacity">{'#'}</span>
        {'관련용어'}
      </h2>
      <div className="grid grid-cols-[auto_1fr] items-start gap-x-1.5">
        {terms.map((item, index) => (
          item.internal_link ? (
            <Fragment key={index}>
              <Link
                href={transformToSlug(item.internal_link)}
                className='group flex shrink-0 justify-center items-center gap-1 tag-button rounded-3xl text-sm hover:no-underline px-2.5'
              >
                <span>{item.term}</span>
                <LinkIcon size={16} />
              </Link>
              <span className="mb-2">{item.description}</span>
            </Fragment>
          ) : (
            <Fragment key={index}>
              <span className='tag-button-no-link flex justify-center shrink-0 rounded-3xl text-sm bg-extreme-light px-2.5'>
                {item.term}
              </span>
              <span className="mb-2">{item.description}</span>
            </Fragment>
          )
        ))}
      </div>
    </section>
  );
};

export default RelatedTermsSection;