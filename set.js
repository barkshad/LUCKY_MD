const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiR0F5TzczRlNQVlFneFdqcHhLRW54U0l6V2U0ZlNudFN5Rlo1ajNYTU1sbz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiczV0b01RdEpJdWU5eHBIbzRzYWVEaDVrTlhYV09GTUlZZTNKNUVseGpscz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJNTHBDVkluZTB6MFJZZWorNDVQV1ZrcWh4UEhtanpzOUpHTGhxQ0lSM2x3PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI0SmhhWUhBSEtVY2lTWkYyamVKakJtbWkxOXpQd0VVSG5aeEkwMit2cHpZPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IklMaFRickx5WU1VdDFTTVVzeUhSaWJXOFZ3aytncU0xNEF0YWt0eHZGMzA9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjBTVGlzWW5YbWVMVzNwdThtR2NFTzU2V0lpSjFvWmNZTElkMjM0Smc2VTA9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiU0xVbFNCaWdjY0VhbGFhenFrMVZ3M3A5KzVhenVCcHA2OUtrVmYwQW8zWT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiejJIV0lnSnpXbVRVM28vRGkrK09OcWU2Ulp2aUZSbURwNkt3UWgyWXhSUT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkdsV01LWUxORlBVLy9iSkJBMFc0ZENsam1jQWNqNVg3VnI3OXdpc1V2alNPTVZQaUUzczFoQW52b0o4MHMzOUFoZ1dWZWUramE3Q0hNR1VWYXVQSGpBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTksImFkdlNlY3JldEtleSI6IjloZ2hzVHRscFhVenRnVHYwczBNRWNUWFllb0NGRDJrK0tBYkd1cFVWK009IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6Imhsc0p6S1NBUnpXNnZNVWxJVDZkc2ciLCJwaG9uZUlkIjoiOTA2YzdmNjgtMGU4Ni00Njg2LTk3NzYtY2ExYzA3ZDk1YmQ1IiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlZCUnNKN1VGOXhCd0UvVXQ0UmQyYWJZYWtQbz0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIyR0UrbXlEMDlCaGFyMXNVZ3lLVkJCdnBHdzA9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiNjg4WFFKVlEiLCJtZSI6eyJpZCI6IjI1NDcyMzQxMzk3MzoxN0BzLndoYXRzYXBwLm5ldCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDTDMvejhjR0VMR2YyNzBHR0E0Z0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiWXBrMmhVLzFKK0dmZ1NRalZkYmJhNTRaSkoxZmNHeWFTcWxsVExtdm55QT0iLCJhY2NvdW50U2lnbmF0dXJlIjoiZFBVd0Uxdlhnd2VtWTdGb3NwWGhZYVJTc2ZaYllxa2FsTloybXhndHpFNEoySzJ1N1hhbXJQMHFNdzViWi9Rd1Y3eEZzUmlmTXN1SUsrUlpEdlRLQ3c9PSIsImRldmljZVNpZ25hdHVyZSI6InVWTmRwUkFuTjNMbkpmRWxHUDBRMTZwc0puSjMvSDlZMEk1MU5vL2k1bFlnc29HbUx0TkJISEhuUnJENzVoTGRBWWdjUkh5NThDcEMvTDZTQW1lVmdBPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjU0NzIzNDEzOTczOjE3QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQldLWk5vVlA5U2ZobjRFa0kxWFcyMnVlR1NTZFgzQnNta3FwWlV5NXI1OGcifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3NDAwMzM5ODN9',
    PREFIXE: process.env.PREFIX || "+",
    GITHUB : process.env.GITHUB|| 'https://github.com/Fred1e/LUCKY_MD',
    OWNER_NAME : process.env.OWNER_NAME || "sheddy",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "254723413973",  
              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    AUTO_REACT: process.env.AUTO_REACTION || "non",  
     AUTO_SAVE_CONTACTS : process.env.AUTO_SAVE_CONTACTS || 'no',
    URL: process.env.URL || "https://files.catbox.moe/7irwqn.jpeg",  
    AUTO_REACT_STATUS: process.env.AUTO_REACT_STATUS || 'non',              
    CHAT_BOT: process.env.CHAT_BOT || "on",              
    AUTO_READ_MESSAGES: process.env.AUTO_READ_MESSAGES || "no",
    AUTO_BLOCK: process.env.AUTO_BLOCK || 'no', 
    GCF: process.env.GROUP_HANDLE || 'yes', 
    AUTO_REPLY : process.env.AUTO_REPLY || "yes", 
    AUTO_STATUS_TEXT: process.env.AUTO_STATUS_TEXT || 'viewed by alpha md',   
    AUTO_STATUS_REPLY: process.env.AUTO_STATUS_REPLY || 'no',
    AUTO_BIO: process.env.AUTO_BIO || 'yes',       
    ANTI_CALL_TEXT : process.env.ANTI_CALL_TEXT || 'yes',             
    GURL: process.env.GURL  || "https://whatsapp.com/channel/0029VaihcQv84Om8LP59fO3f",
    WEBSITE :process.env.GURL || "https://whatsapp.com/channel/0029VaihcQv84Om8LP59fO3f",
    CAPTION : process.env.CAPTION || "✧⁠LUCKY_MD✧",
    BOT : process.env.BOT_NAME || '✧⁠LUCKY_MD✧⁠',
    MODE: process.env.PUBLIC_MODE || "yes",              
    TIMEZONE: process.env.TIMEZONE || "Africa/Nairobi", 
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME || null,
    HEROKU_API_KEY : process.env.HEROKU_API_KEY || null,
    WARN_COUNT : process.env.WARN_COUNT || '4' ,
    ETAT : process.env.PRESENCE || '1',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ANTI_DELETE_MESSAGE : process.env.ANTI_DELETE_MESSAGE || 'yes',
    ANTI_CALL: process.env.ANTI_CALL || 'yes', 
    AUDIO_REPLY : process.env.AUDIO_REPLY || 'yes',             
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, 
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});

