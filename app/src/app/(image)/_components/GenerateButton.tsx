'use client'

import React from "react";
import { useFormStatus } from "react-dom";
import {Button} from "@/components/ui/button";
import SpinnerIcon from "@/components/ui/spinner-icon";

function GenerateButton() {
  const {pending} = useFormStatus()

  return (
    <Button
      type='submit'
      disabled={pending}
    >
      {pending && (
        <SpinnerIcon className='mr-2 h-4 w-4 animate-spin'/>
      )}
      Generate
    </Button>
  );
}

export default React.memo(GenerateButton);
