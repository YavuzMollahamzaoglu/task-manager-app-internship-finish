-- AlterTable
ALTER TABLE "User" ADD COLUMN "refreshToken" TEXT;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Profile" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userName" TEXT NOT NULL,
    "profileId" INTEGER NOT NULL,
    "colleague" TEXT NOT NULL,
    "workLocation" TEXT NOT NULL,
    "workTitle" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "Profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Profile" ("colleague", "id", "location", "phoneNumber", "profileId", "userId", "userName", "workLocation", "workTitle") SELECT "colleague", "id", "location", "phoneNumber", "profileId", "userId", "userName", "workLocation", "workTitle" FROM "Profile";
DROP TABLE "Profile";
ALTER TABLE "new_Profile" RENAME TO "Profile";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
