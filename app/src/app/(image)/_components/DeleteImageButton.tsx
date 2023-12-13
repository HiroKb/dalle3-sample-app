'use client'
import React from "react";
import {useFormState} from "react-dom";
import {Image} from "@prisma/client";

import SubmitButton from "@/components/form/SubmitButton";

import {deleteImage} from "@/app/(image)/_actions/delete-image";

type Props = {
  image: Image
} & React.DetailedHTMLProps<React.FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>

function DeleteImageButton({image, ...rest}: Props) {
  const [state, formAction] = useFormState(deleteImage, undefined)

  return (
    <form
      action={formAction}
      className='flex justify-end'
      {...rest}
    >
      <input type='hidden' name='id' value={image.id}/>
      {state?.message && (
        <p className='text-red-500 text-sm mt-2'>{state.message}</p>
      )}
      <SubmitButton
        className='ml-4'
      >
        Delete
      </SubmitButton>
    </form>
  );
}

export default React.memo(DeleteImageButton);
