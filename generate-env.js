const fs = require("fs");
const targetPath = "./src/environments/environment.prod.ts";
const envConfigFile = `
export const environment = {
  production: true,
  SUPABASE_URL: '${process.env.SUPABASE_URL}',
  SUPABASE_ANON_KEY: '${process.env.SUPABASE_ANON_KEY}',
  SUPABASE_JWT_SECRET: '${process.env.SUPABASE_JWT_SECRET}',
};
`;
fs.writeFileSync(targetPath, envConfigFile);
