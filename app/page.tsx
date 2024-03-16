import { simplePostCard } from "@/lib/interface";
import { client, urlFor } from "./lib/sanity";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const revalidate = 30 // revalidate at most every 30 seconds

async function getData() {
  const query = `*[_type == 'post'] | order(_createdAt desc){
    title,
    smallDescription,
    'currentSlug': slug.current,
    mainImage
  }`

  const data = await client.fetch(query);
  return data;
}

export default async function Home() {
  const data: simplePostCard[] = await getData();
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 mt-14 gap-10">
      {data.map((post, index) => (
        <Card key={index}>
          <Image src={urlFor(post.mainImage).url()} alt="image" width={500} height={500} className="object-cover h-[200px] rounded-t-lg" />
          <CardContent className="mt-5">
            <h3 className="font-bold text-lg line-clamp-2">{post.title}</h3>
            <p className="line-clamp-3 text-gray-600 mt-2 dark:text-gray-300">{post.smallDescription}</p>
            <Button asChild className="mt-4 w-full">
              <Link href={`/blog/${post.currentSlug}`}>
                Read More
              </Link>
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
