'use client'

import React from "react";
import {useFormState} from "react-dom";

import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Dialog, DialogContent, DialogHeader, DialogTrigger} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {generateImage} from "@/app/(image)/server-action";
import GenerateButton from "@/app/(image)/_components/GenerateButton";

function GenerateImageModal() {
  const [state, formAction] = useFormState(generateImage, undefined)

  return (

    <Dialog>
      <DialogTrigger asChild>
        <Button>Generate Image</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          Generate Image
        </DialogHeader>
        <form action={formAction}>
          <Label>Prompt</Label>
          <Input
            name='prompt'
            className='mt-2'
          />
          {state?.errors && 'prompt' in state.errors && state.errors.prompt?.map((error) => (
            <p key={error} className='text-red-500 text-sm mt-2'>{error}</p>
          ))
          }
          {state?.errors && 'common' in state.errors && state.errors.common?.map((error) => (
            <p key={error} className='text-red-500 text-sm mt-2'>{error}</p>
          ))
          }
          <div className='flex justify-end mt-4'>
            <GenerateButton/>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default React.memo(GenerateImageModal);
