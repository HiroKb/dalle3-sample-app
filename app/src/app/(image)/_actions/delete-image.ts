'use server'
import 'server-only'

import {DeleteObjectCommand} from "@aws-sdk/client-s3";
import {z} from "zod";
import {redirect} from "next/navigation";
import {revalidatePath} from "next/cache";

import prisma from "@/lib/prisma";
import {getS3Client} from "@/lib/s3-client";

export const deleteImage = async (_prevState: any, formData: FormData) => {
  try {
    const id = z.string().min(1).parse(formData.get('id'))

    const image = await prisma.image.findUniqueOrThrow({
      where: {
        id: id
      }
    })

    await prisma.$transaction(async (prismaClient) => {
      await prismaClient.image.delete({
        where: {
          id: id
        }
      })

      await getS3Client().send(new DeleteObjectCommand({
        Bucket: process.env.STORAGE_BUCKET_NAME,
        Key: image.key
      }))
    })

  } catch (e) {
    console.log(e)
    return {message: 'Internal server error'}
  }

  revalidatePath('/')
  redirect('/')
}
