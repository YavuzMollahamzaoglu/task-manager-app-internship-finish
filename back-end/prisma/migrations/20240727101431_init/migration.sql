-- CreateTable
CREATE TABLE "Profile" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userName" TEXT NOT NULL,
    "profileId" INTEGER NOT NULL,
    "colleague" TEXT NOT NULL,
    "workLocation" TEXT NOT NULL,
    "workTitle" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "phoneNumber" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "Profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
