-- AlterTable
ALTER TABLE "Form" ALTER COLUMN "impacted" DROP NOT NULL,
ALTER COLUMN "residentName" DROP NOT NULL,
ALTER COLUMN "residentPhone" DROP NOT NULL,
ALTER COLUMN "residentEmail" DROP NOT NULL,
ALTER COLUMN "primaryLanguage" DROP NOT NULL,
ALTER COLUMN "needHelp" DROP NOT NULL,
ALTER COLUMN "roofDamaged" DROP NOT NULL,
ALTER COLUMN "floodWaterHeight" DROP NOT NULL,
ALTER COLUMN "ableToStayHome" DROP NOT NULL;
