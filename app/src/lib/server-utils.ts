import 'server-only'

export const getPublicImageUrl = (key: string) => {
  return `${process.env.STORAGE_PUBLIC_PROTOCOL}://${process.env.STORAGE_PUBLIC_HOSTNAME}${!!process.env.STORAGE_PUBLIC_PORT ? ':' + process.env.STORAGE_PUBLIC_PORT : ''}${process.env.NODE_ENV === 'development' ? '/' + process.env.STORAGE_BUCKET_NAME : ''}/${key}`
}
