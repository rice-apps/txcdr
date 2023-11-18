-- CreateTable
CREATE TABLE "Form" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "eventId" INTEGER NOT NULL,
    "impacted" BOOLEAN NOT NULL,
    "residentName" TEXT NOT NULL,
    "residentPhone" TEXT NOT NULL,
    "residentEmail" TEXT NOT NULL,
    "primaryLanguage" TEXT NOT NULL,
    "needHelp" BOOLEAN NOT NULL,
    "roofDamaged" BOOLEAN NOT NULL,
    "floodWaterHeight" TEXT NOT NULL,
    "ableToStayHome" BOOLEAN NOT NULL,

    CONSTRAINT "Form_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Form" ADD CONSTRAINT "Form_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Form" ADD CONSTRAINT "Form_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
