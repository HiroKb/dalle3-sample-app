'use server'

import 'server-only'
import OpenAI from "openai";
import {Upload} from "@aws-sdk/lib-storage";
import {StreamingBlobPayloadInputTypes} from "@smithy/types";
import {z} from "zod";
import {redirect} from "next/navigation";
import {revalidatePath} from "next/cache";

import prisma from "@/lib/prisma";
import {getS3Client} from "@/lib/s3-client";

const generateImageSchema = z.object({
  prompt: z.string().min(1).max(1000),
})

export const generateImage = async (_prevState: any, formData: FormData) => {
  const parseInputResult = generateImageSchema.safeParse(Object.fromEntries(formData.entries()));

  if (!parseInputResult.success) {
    return {
      messages: parseInputResult.error.flatten().fieldErrors.prompt
    }
  }

  try {
    const dalle3Image = await generateImageByDalle3(parseInputResult.data.prompt)

    const imageStream = await fetchImage(dalle3Image.url)

    const uploadResult = await uploadImage(imageStream)

    await prisma.image.create({
      data: {
        prompt: parseInputResult.data.prompt,
        revisedPrompt: dalle3Image.revised_prompt,
        key: uploadResult.Key
      }
    })
  } catch (e) {
    console.log(e)
    return {
      messages: ['Internal server error']
    }
  }

  revalidatePath('/')
  redirect('/')
}

const openAIImageSchema = z.object({
  revised_prompt: z.string(),
  url: z.string(),
})

const uploadResultSchema = z.object({
  Key: z.string(),
})

const generateImageByDalle3 = async (prompt: string) => {
  const openai = new OpenAI()

  const generatedResponse = await openai.images.generate({
    model: 'dall-e-3',
    prompt: prompt,
    n: 1,
    size: '1024x1024',
    quality: 'standard'
  })

  return openAIImageSchema.parse(generatedResponse.data[0])
}

const fetchImage = async (url: string) => {
  const imageFetchResponse = await fetch(url, {
    cache: 'no-cache',
  })

  if (!imageFetchResponse.body) {
    throw new Error('Image file not found')
  }

  return imageFetchResponse.body
}

const uploadImage = async (
  file: StreamingBlobPayloadInputTypes,
  fileName: string = `${crypto.randomUUID()}${Date.now()}.png`,
  contentType: 'image/png' | 'image/jpeg' = 'image/png'
) => {

  const upload = new Upload({
    client: getS3Client(),
    params: {
      Bucket: process.env.STORAGE_BUCKET_NAME,
      Key: fileName,
      Body: file,
      ContentType: contentType,
    },
  });

  return uploadResultSchema.parse(await upload.done())
}