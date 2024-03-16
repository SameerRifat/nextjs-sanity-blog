import { client, urlFor } from '@/app/lib/sanity';
import { fullPost } from '@/lib/interface';
import Image from 'next/image';
import React from 'react'
import {PortableText} from '@portabletext/react'

export const revalidate = 30 // revalidate at most every 30 seconds

async function getData(slug: string) {
    const query = `*[_type == 'post' && slug.current == '${slug}'] {
        title,
        smallDescription,
        'currentSlug': slug.current,
        mainImage,
        body
      }[0]`

    const data = await client.fetch(query);
    return data;
}

const page = async ({ params }: { params: { slug: string } }) => {
    const data: fullPost = await getData(params.slug);
    return (
        <div className='mt-14 mb-20'>
            <h1>
                <span className='text-primary block text-center font-semibold tracking-wide uppercase'>Sameer Rifat - Blog</span>
                <span className='text-center font-bold text-3xl block mt-4 tracking-tight'>{data.title}</span>
            </h1>
            <Image
                src={urlFor(data.mainImage).url()}
                alt='image'
                width={800}
                height={800}
                priority
                quality={100}
                className='mt-8 mx-auto rounded-lg border'
            />

            <div className='mt-20 prose prose-blue dark:prose-invert prose-xl max-w-[800px] mx-auto prose-li:marker:text-primary prose-code:font-normal'>
                <PortableText value={data.body}/>
            </div>
        </div>
    )
}

export default page