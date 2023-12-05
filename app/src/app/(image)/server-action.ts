'use server'

import 'server-only'
import OpenAI from "openai";
import {z} from "zod";
import {redirect} from "next/navigation";
import {revalidatePath} from "next/cache";

import prisma from "@/lib/prisma";


const generateImageSchema = z.object({
  prompt: z.string().min(1).max(1000),
})

const openAIImageSchema = z.object({
  revised_prompt: z.string(),
  url: z.string(),
})

export const generateImage = async (_prevState: any, formData: FormData) => {
  const parseInputResult = generateImageSchema.safeParse(Object.fromEntries(formData.entries()));

  if (!parseInputResult.success) {
    return {
      errors: parseInputResult.error.flatten().fieldErrors
    }
  }

  const openai = new OpenAI()

  try {
    const generatedResponse = await openai.images.generate({
      model: 'dall-e-3',
      prompt: parseInputResult.data.prompt,
      n: 1,
      size: '1024x1024',
    })

    const openAiImage = openAIImageSchema.parse(generatedResponse.data[0])

    await prisma.image.create({
      data: {
        prompt: parseInputResult.data.prompt,
        revisedPrompt: openAiImage.revised_prompt,
        url: openAiImage.url
      }
    })
  } catch (e) {
    return {
      errors: {
        common: ['Internal server error']
      }
    }
  }

  revalidatePath('/')
  redirect('/')
}