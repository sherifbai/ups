/*
  Warnings:

  - A unique constraint covering the columns `[user_id,post_id]` on the table `posts_marks` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "posts_marks_user_id_post_id_key" ON "posts_marks"("user_id", "post_id");
