import React from "react";

import prisma from "@/lib/prisma";
import {getPublicImageUrl} from "@/lib/server-utils";

import Image from "next/image";
import GenerateImageModal from "@/app/(image)/_components/GenerateImageModal";


export default async function Home() {
  const images = await prisma.image.findMany({
    orderBy: {
      createdAt: "desc"
    }
  });

  return (
    <>
      <header className="py-4 sticky top-0 z-10 bg-gray-300 dark:bg-gray-950 opacity-90">
        <div className='container flex justify-end'>
          <GenerateImageModal/>
        </div>
      </header>
      <main className="container grid grid-cols-3 gap-8 mt-6">
        {images.map((image) => (
          <div
            key={image.id}
            className="col-span-1 relative aspect-square rounded-md overflow-hidden shadow-lg shadow-gray-500 dark:shadow-gray-800"
          >
            <Image
              src={getPublicImageUrl(image.key)}
              alt={image.prompt}
              fill
            />
          </div>
        ))}
      </main>
    </>
  );
}
