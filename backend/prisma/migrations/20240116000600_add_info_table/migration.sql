-- CreateTable
CREATE TABLE "Info" (
    "id" TEXT NOT NULL,
    "nrCpfCnpj" TEXT NOT NULL,
    "vlPresta" DECIMAL(65,30) NOT NULL,
    "vlMora" DECIMAL(65,30) NOT NULL,
    "qtPrestacoes" DECIMAL(65,30) NOT NULL,
    "vlMovimento" DECIMAL(65,30) NOT NULL,
    "vlPag" DECIMAL(65,30) NOT NULL,
    "vlTotal" DECIMAL(65,30) NOT NULL,
    "dtContrato" TIMESTAMP(3) NOT NULL,
    "dtVctPre" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Info_pkey" PRIMARY KEY ("id")
);
