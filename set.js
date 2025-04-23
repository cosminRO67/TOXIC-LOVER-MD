


const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiY0YwNG1KZXNkYWxFRkczeWx6bkp3ZEFLS1dYZ2ZQdGJ2RU45MUxhV0ZFZz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoieVl1djgxRVJpaEMvYndOZVR6QlQyck01RjhhTXBVd25jNFNOZjE1N09rOD0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJzRUltSVp6WWNsNlhsRFJoYWk0MVlNZGcydm15SnlqT3pTbEtZTGVieEZBPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJrenFaYUgxYXJ5eXRLUktEMUFRcTRKRkY0RUFIZkFFSGRnTHJRYnZqSVNvPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkVFbEFSem90V2hvaVdaM1VSMFZiZDA5QzF1SkV0K21ua0Q1TE52VDdGbXM9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjNFVGNrVDcxYm9pc1JreG54NUtKWkJlY3dLVVNyMXZ4djNvdThyMUdLUTg9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZ01yWGF4OG5PTnlSNFBQcW9GOWhVTncwOXdOUU4zaWhlREJKNnRHU2tGYz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQVRmL1M2eUpwQWVrV2FqbE93eHZJMm8xREhRTXFKa2R1MTc1Q3pFVmFHYz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlRUYndOeU5ydUZvK1gzbkVMRUtXYzNjOTVqbSs3UDhmdmZQd2lKT0lSUVBLMGY0RHUvSlYyMjNJcldsNUZMaVd2Z2Y5OUM2Mm95Y2IxZlhXU2NHWmlnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTYxLCJhZHZTZWNyZXRLZXkiOiJvN25DVGpNMGFKSWhuaG9ubVZkNHh2OWtnbmQ1U1BYSEo5MW9Lbm1yUndNPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjQwNzg0ODU4NDMzQHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IjAzMDEyMkE3RTFBNUE5RkE5MEFDMTY1REIwQzAxOUJEIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NDQ4MjkzMjZ9LHsia2V5Ijp7InJlbW90ZUppZCI6IjQwNzg0ODU4NDMzQHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IkVFNkE3NDAxNDBFOTcyQTJDQ0RGM0E0QzVEM0ZFNjIzIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NDQ4MjkzMjZ9LHsia2V5Ijp7InJlbW90ZUppZCI6IjQwNzg0ODU4NDMzQHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IkEwMTUxRERGNDMyRDhBMDQxNEVDQjU4REMxMEVDRTZFIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NDQ4MjkzNDh9LHsia2V5Ijp7InJlbW90ZUppZCI6IjQwNzg0ODU4NDMzQHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6Ijk3RDdDOTczMUY2N0E5NTRBMDAzNDkyNzIwNkVBOENCIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NDQ4MjkzNTF9LHsia2V5Ijp7InJlbW90ZUppZCI6IjQwNzg0ODU4NDMzQHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IkUwQzVERkM2RjE4OTAxMDYzODM1MTQxMjhDOTBGQUYyIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NDQ4MjkzNjJ9LHsia2V5Ijp7InJlbW90ZUppZCI6IjQwNzg0ODU4NDMzQHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IjA4NDk3QTk1ODlCNzY5ODUzNzg1NTI4MkRDQzQzNTg5In0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NDQ4MjkzNzJ9XSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjEsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6IjFJUVV6bERRVFhlcGZWMTh2ZldPblEiLCJwaG9uZUlkIjoiZWU3ZWQ3MjAtMTM1ZC00YTQzLWFmMzAtMWM0OTQwMzdiOTliIiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlIzZHB6c0ZyTlJ5cmJSRDNuK2NNRWhnejk5VT0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJoRWgyNG1JemZ3THltY3pUeVVESkZoaWh1bGs9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiQThLMTk2UzUiLCJtZSI6eyJpZCI6IjQwNzg0ODU4NDMzOjIyQHMud2hhdHNhcHAubmV0IiwibmFtZSI6IvCdkILhtI9z4bSNyarJtCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDTmlDdktzRkVQMzIvNzhHR0FNZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiNGM4TnFwWjdLVU16c1JGYnFNaTFOZFpxMWkyZ3JMOTNUNFRNbVdQWjREbz0iLCJhY2NvdW50U2lnbmF0dXJlIjoiY2lYQkR2Mmx4WTNSaS80TFYvcTkrUFpLdUlIYlkyYllSVHFMbmRDNGtseTBZdGxFVEg4UUNEMUJBTk1hMlVsTnlxTU5RM3VyYmJQbGVxZHR6cTdVQXc9PSIsImRldmljZVNpZ25hdHVyZSI6IlhFZ0VPM01TM3gwbE5VTUJFYlJhSXFTekE4emJ4MjJIN005WlN4dVBhc0JrS0dBak9PTzBpRGd2VkFXWEZQUnF5enJ0VEt5UFp5UlhUaWJQcW1ZS2d3PT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiNDA3ODQ4NTg0MzM6MjJAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCZUhQRGFxV2V5bERNN0VSVzZqSXRUWFdhdFl0b0t5L2QwK0V6SmxqMmVBNiJ9fV0sInBsYXRmb3JtIjoic21iYSIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTc0NDgyOTMyMiwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFBcWgifQ==',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "cosmin",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "40784858433",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'toxic-lover-MD',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/17c83719a1b40e02971e4.jpg',
    MODE: process.env.PUBLIC_MODE || "public",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    CHATBOT1 : process.env.AUDIO_CHATBOT || "no",
    CHATBOT2 : process.env.CHATBOT || "yes",
    ANTIDELETE1 : process.env.ANTI_DELETE_MESSAGE || 'no',
    ANTICALL : process.env.ANTICALL || 'no',
                  AUTO_REACT_STATUS : process.env.AUTO_REACT_STATUS || 'yes',
                  AUTO_READ : process.env.AUTO_READ || 'yes',
                  CHATBOT : process.env.CHATBOT || "yes",
                  AUTO_BIO : process.env.AUTO_BIO || "yes",
                  AUTO_REACT : process.env.AUTO_REACT || "yes",
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
