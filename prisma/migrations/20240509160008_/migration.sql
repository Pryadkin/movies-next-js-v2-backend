-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Filters" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "Filters_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tags" (
    "id" SERIAL NOT NULL,
    "tagName" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "isGroup" BOOLEAN NOT NULL,
    "filtersId" INTEGER NOT NULL,

    CONSTRAINT "Tags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Genres" (
    "id" SERIAL NOT NULL,
    "genreId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "filtersId" INTEGER,

    CONSTRAINT "Genres_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Tags" ADD CONSTRAINT "Tags_filtersId_fkey" FOREIGN KEY ("filtersId") REFERENCES "Filters"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Genres" ADD CONSTRAINT "Genres_filtersId_fkey" FOREIGN KEY ("filtersId") REFERENCES "Filters"("id") ON DELETE SET NULL ON UPDATE CASCADE;
