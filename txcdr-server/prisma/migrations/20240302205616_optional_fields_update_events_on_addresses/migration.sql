-- DropForeignKey
ALTER TABLE "EventsOnAddresses" DROP CONSTRAINT "EventsOnAddresses_addressId_fkey";

-- DropForeignKey
ALTER TABLE "EventsOnAddresses" DROP CONSTRAINT "EventsOnAddresses_eventId_fkey";

-- AlterTable
ALTER TABLE "EventsOnAddresses" ALTER COLUMN "eventId" DROP NOT NULL,
ALTER COLUMN "addressId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "EventsOnAddresses" ADD CONSTRAINT "EventsOnAddresses_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventsOnAddresses" ADD CONSTRAINT "EventsOnAddresses_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Address"("id") ON DELETE SET NULL ON UPDATE CASCADE;
