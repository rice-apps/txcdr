/*
  Warnings:

  - You are about to drop the column `isActive` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `location` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `nHouses` on the `Event` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Event" DROP COLUMN "isActive",
DROP COLUMN "location",
DROP COLUMN "nHouses";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "isAuth" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "Address" (
    "id" SERIAL NOT NULL,
    "censusBlock" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "zipCode" TEXT NOT NULL,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EventsOnAddresses" (
    "id" SERIAL NOT NULL,
    "eventId" INTEGER NOT NULL,
    "addressId" INTEGER NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "assignedBy" TEXT NOT NULL,

    CONSTRAINT "EventsOnAddresses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DisasterFormQuestion" (
    "id" SERIAL NOT NULL,
    "sequence" INTEGER NOT NULL,
    "field" TEXT NOT NULL,
    "descriptionOne" TEXT NOT NULL,
    "descriptionTwo" TEXT NOT NULL,
    "questionType" INTEGER NOT NULL,
    "validation" TEXT NOT NULL,
    "require" BOOLEAN NOT NULL,
    "options" TEXT[],
    "eventId" INTEGER NOT NULL,

    CONSTRAINT "DisasterFormQuestion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DisasterFormResponse" (
    "id" SERIAL NOT NULL,
    "volunteerId" INTEGER NOT NULL,
    "eventOnAddressId" INTEGER NOT NULL,

    CONSTRAINT "DisasterFormResponse_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DisasterFormAnswer" (
    "id" SERIAL NOT NULL,
    "answer" TEXT NOT NULL,
    "formQuestionId" INTEGER NOT NULL,
    "formResponseId" INTEGER NOT NULL,

    CONSTRAINT "DisasterFormAnswer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DisasterFormQuestion_eventId_key" ON "DisasterFormQuestion"("eventId");

-- CreateIndex
CREATE UNIQUE INDEX "DisasterFormResponse_volunteerId_key" ON "DisasterFormResponse"("volunteerId");

-- CreateIndex
CREATE UNIQUE INDEX "DisasterFormResponse_eventOnAddressId_key" ON "DisasterFormResponse"("eventOnAddressId");

-- CreateIndex
CREATE UNIQUE INDEX "DisasterFormAnswer_formQuestionId_key" ON "DisasterFormAnswer"("formQuestionId");

-- CreateIndex
CREATE UNIQUE INDEX "DisasterFormAnswer_formResponseId_key" ON "DisasterFormAnswer"("formResponseId");

-- AddForeignKey
ALTER TABLE "EventsOnAddresses" ADD CONSTRAINT "EventsOnAddresses_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventsOnAddresses" ADD CONSTRAINT "EventsOnAddresses_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Address"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DisasterFormQuestion" ADD CONSTRAINT "DisasterFormQuestion_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DisasterFormResponse" ADD CONSTRAINT "DisasterFormResponse_volunteerId_fkey" FOREIGN KEY ("volunteerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DisasterFormResponse" ADD CONSTRAINT "DisasterFormResponse_eventOnAddressId_fkey" FOREIGN KEY ("eventOnAddressId") REFERENCES "EventsOnAddresses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DisasterFormAnswer" ADD CONSTRAINT "DisasterFormAnswer_formQuestionId_fkey" FOREIGN KEY ("formQuestionId") REFERENCES "DisasterFormQuestion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DisasterFormAnswer" ADD CONSTRAINT "DisasterFormAnswer_formResponseId_fkey" FOREIGN KEY ("formResponseId") REFERENCES "DisasterFormResponse"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
