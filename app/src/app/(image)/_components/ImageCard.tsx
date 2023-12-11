import React from "react";

import Image from "next/image";
import {Image as ImageType} from "@prisma/client";

import {AspectRatio} from "@/components/ui/aspect-ratio";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";

import {getPublicImageUrl} from "@/lib/server-utils";
import DeleteImageButton from "@/app/(image)/_components/DeleteImageButton";

type Props = {
  image: ImageType
} & React.ComponentProps<typeof AspectRatio>

function ImageCard({image, ...rest}: Props) {

  return (
    <Popover>
      <PopoverTrigger asChild>
        <AspectRatio
          className="relative rounded-md overflow-hidden shadow-lg shadow-gray-500 dark:shadow-gray-800 cursor-pointer"
          {...rest}
        >
          <Image
            src={getPublicImageUrl(image.key)}
            alt={image.prompt}
            fill
          />
        </AspectRatio>
      </PopoverTrigger>
      <PopoverContent className="p-4 border-2 w-96">
        <h4 className='text-xl font-semibold'>Prompt</h4>
        <p>{image.prompt}</p>
        <h4 className='text-xl font-semibold mt-6'>Revised Prompt</h4>
        <p>{image.revisedPrompt}</p>

        <DeleteImageButton
          image={image}
        />
      </PopoverContent>
    </Popover>
  );
}

export default React.memo(ImageCard);
