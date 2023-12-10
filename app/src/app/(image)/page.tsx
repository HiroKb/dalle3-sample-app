import React from "react";

import prisma from "@/lib/prisma";

import GenerateImageModal from "@/app/(image)/_components/GenerateImageModal";
import ImageCard from "@/app/(image)/_components/ImageCard";


export default async function Home() {
  const images = await prisma.image.findMany({
    orderBy: {
      createdAt: "desc"
    }
  });

  return (
    <>
      <header
        className="py-4 sticky top-0 bg-gray-100 dark:bg-black opacity-90"
        style={{zIndex: 1000}}
      >
        <div className='container flex justify-end'>
          <GenerateImageModal/>
        </div>
      </header>
      <main className="container grid grid-cols-3 gap-8 mt-6">
        {images.map((image) => (
          <ImageCard
            key={image.id}
            image={image}
          />
        ))}
      </main>
    </>
  );
}
