'use client'

import React from "react";
import {useFormState} from "react-dom";

import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Dialog, DialogContent, DialogHeader, DialogTrigger} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import SubmitButton from "@/components/form/SubmitButton";

import {generateImage} from "@/app/(image)/_actions/generate-image";

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
          {state?.messages && state.messages.map((message) => (
            <p key={message} className='text-red-500 text-sm mt-2'>{message}</p>
          ))
          }
          <div className='flex justify-end mt-4'>
            <SubmitButton>
              Generate
            </SubmitButton>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default React.memo(GenerateImageModal);
