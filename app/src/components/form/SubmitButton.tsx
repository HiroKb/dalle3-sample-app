'use client'

import React from "react";
import { useFormStatus } from "react-dom";
import {Button} from "@/components/ui/button";
import SpinnerIcon from "@/components/ui/spinner-icon";

type Props = {
  children: React.ReactNode
} & React.ComponentProps<typeof Button>

function SubmitButton({children, ...rest}: Props) {
  const {pending} = useFormStatus()

  return (
    <Button
      type='submit'
      disabled={pending}
      {...rest}
    >
      {pending && (
        <SpinnerIcon className='mr-2 h-4 w-4 animate-spin'/>
      )}
      {children}
    </Button>
  );
}

export default React.memo(SubmitButton);
