#!/usr/bin/env node

import("./scripts/generate-localized.mjs").catch((error) => {
  console.error(error);
  process.exit(1);
});
