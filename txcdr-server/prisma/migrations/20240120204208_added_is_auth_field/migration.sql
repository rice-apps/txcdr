-- AlterTable
ALTER TABLE "User" ADD COLUMN     "isAuth" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "Form" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "eventId" INTEGER NOT NULL,
    "impacted" BOOLEAN,
    "residentName" TEXT,
    "residentPhone" TEXT,
    "residentEmail" TEXT,
    "primaryLanguage" TEXT,
    "needHelp" BOOLEAN,
    "roofDamaged" BOOLEAN,
    "floodWaterHeight" TEXT,
    "ableToStayHome" BOOLEAN,

    CONSTRAINT "Form_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Form" ADD CONSTRAINT "Form_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Form" ADD CONSTRAINT "Form_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
