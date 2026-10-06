INSERT INTO "User" ("username", "role")
VALUES
  ('john_doe', 'user'),
  ('jane', 'user'),
  ('admin', 'admin')
ON CONFLICT ("username") DO UPDATE SET "role" = EXCLUDED."role";

INSERT INTO "Product" ("title", "price")
SELECT 'لپ‌تاپ', 1500
WHERE NOT EXISTS (SELECT 1 FROM "Product" WHERE "title" = 'لپ‌تاپ');

INSERT INTO "Product" ("title", "price")
SELECT 'ماوس', 25
WHERE NOT EXISTS (SELECT 1 FROM "Product" WHERE "title" = 'ماوس');

INSERT INTO "Product" ("title", "price")
SELECT 'کیبورد', 75
WHERE NOT EXISTS (SELECT 1 FROM "Product" WHERE "title" = 'کیبورد');
