-- DropForeignKey
ALTER TABLE "DisasterFormAnswer" DROP CONSTRAINT "DisasterFormAnswer_formQuestionId_fkey";

-- DropForeignKey
ALTER TABLE "DisasterFormAnswer" DROP CONSTRAINT "DisasterFormAnswer_formResponseId_fkey";

-- DropForeignKey
ALTER TABLE "DisasterFormQuestion" DROP CONSTRAINT "DisasterFormQuestion_eventId_fkey";

-- DropForeignKey
ALTER TABLE "DisasterFormResponse" DROP CONSTRAINT "DisasterFormResponse_eventOnAddressId_fkey";

-- DropForeignKey
ALTER TABLE "DisasterFormResponse" DROP CONSTRAINT "DisasterFormResponse_volunteerId_fkey";

-- AlterTable
ALTER TABLE "DisasterFormAnswer" ALTER COLUMN "formQuestionId" DROP NOT NULL,
ALTER COLUMN "formResponseId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "DisasterFormQuestion" ALTER COLUMN "eventId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "DisasterFormResponse" ALTER COLUMN "volunteerId" DROP NOT NULL,
ALTER COLUMN "eventOnAddressId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "DisasterFormQuestion" ADD CONSTRAINT "DisasterFormQuestion_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DisasterFormResponse" ADD CONSTRAINT "DisasterFormResponse_volunteerId_fkey" FOREIGN KEY ("volunteerId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DisasterFormResponse" ADD CONSTRAINT "DisasterFormResponse_eventOnAddressId_fkey" FOREIGN KEY ("eventOnAddressId") REFERENCES "EventsOnAddresses"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DisasterFormAnswer" ADD CONSTRAINT "DisasterFormAnswer_formQuestionId_fkey" FOREIGN KEY ("formQuestionId") REFERENCES "DisasterFormQuestion"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DisasterFormAnswer" ADD CONSTRAINT "DisasterFormAnswer_formResponseId_fkey" FOREIGN KEY ("formResponseId") REFERENCES "DisasterFormResponse"("id") ON DELETE SET NULL ON UPDATE CASCADE;
