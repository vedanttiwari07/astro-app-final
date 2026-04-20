INSERT INTO "Service" ("id", "name", "desc", "price")
VALUES
  (
    'birth-chart-reading',
    'Birth Chart Reading',
    'A detailed reading of your natal chart, personality patterns, strengths, and key life themes.',
    999
  ),
  (
    'career-guidance',
    'Career Guidance',
    'Astrology-based guidance for career direction, timing, opportunities, and professional decisions.',
    1499
  ),
  (
    'relationship-compatibility',
    'Relationship Compatibility',
    'A compatibility reading for relationships, emotional dynamics, and long-term alignment.',
    1299
  )
ON CONFLICT ("id") DO UPDATE SET
  "name" = EXCLUDED."name",
  "desc" = EXCLUDED."desc",
  "price" = EXCLUDED."price";
