-- CreateTable
CREATE TABLE "License_type" (
    "id" SERIAL NOT NULL,
    "license_type_id" INTEGER NOT NULL,
    "license_name" TEXT NOT NULL,

    CONSTRAINT "License_type_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "License_data" (
    "id" SERIAL NOT NULL,
    "user_uuid" TEXT NOT NULL,
    "license_type_id" INTEGER NOT NULL,
    "expiry_date" TIMESTAMP(3) NOT NULL,
    "image_url" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "License_data_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "License_type_license_type_id_key" ON "License_type"("license_type_id");

-- CreateIndex
CREATE UNIQUE INDEX "License_type_license_name_key" ON "License_type"("license_name");
