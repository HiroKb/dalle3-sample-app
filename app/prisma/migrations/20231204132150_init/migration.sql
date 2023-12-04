-- CreateTable
CREATE TABLE "images" (
    "id" TEXT NOT NULL,
    "prompt" TEXT NOT NULL,
    "revised_prompt" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "images_pkey" PRIMARY KEY ("id")
);
