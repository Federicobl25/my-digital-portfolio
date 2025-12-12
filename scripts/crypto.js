#!/usr/bin/env node
/**
 * HERRAMIENTA DE ENCRIPTACIÓN PARA DOCUMENTOS PRIVADOS
 * 
 * Encripta/desencripta archivos en docs/private/ con AES-256
 * Solo el dueño del proyecto puede acceder a ellos
 * 
 * USO:
 *   node scripts/crypto.js encrypt docs/private/SECURITY_AUDIT.md
 *   node scripts/crypto.js decrypt docs/private/SECURITY_AUDIT.md.enc
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const readline = require('readline');

// Colores para terminal
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
};

/**
 * Lee contraseña de la terminal de forma segura (sin mostrarla)
 */
function readPassword(prompt) {
  return new Promise((resolve) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
      terminal: false,
    });

    process.stdout.write(prompt);

    let password = '';
    process.stdin.setRawMode(true);
    process.stdin.on('data', (char) => {
      const charCode = char.toString().charCodeAt(0);
      
      if (charCode === 3) {
        process.exit();
      }
      
      if (charCode === 13) {
        process.stdin.setRawMode(false);
        process.stdout.write('\n');
        resolve(password);
      } else if (charCode === 127) {
        password = password.slice(0, -1);
      } else {
        password += char.toString();
      }
    });
  });
}

/**
 * Derivar clave desde contraseña usando PBKDF2
 */
function deriveKey(password, salt) {
  return crypto.pbkdf2Sync(password, salt, 100000, 32, 'sha256');
}

/**
 * Encriptar archivo
 */
async function encryptFile(filePath, password) {
  try {
    // Verificar que el archivo existe
    if (!fs.existsSync(filePath)) {
      throw new Error(`Archivo no encontrado: ${filePath}`);
    }

    // Leer contenido del archivo
    const fileContent = fs.readFileSync(filePath, 'utf8');

    // Generar salt aleatorio (16 bytes)
    const salt = crypto.randomBytes(16);

    // Derivar clave desde contraseña
    const key = deriveKey(password, salt);

    // Generar IV aleatorio (16 bytes)
    const iv = crypto.randomBytes(16);

    // Crear cipher AES-256-CBC
    const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);

    // Encriptar contenido
    let encrypted = cipher.update(fileContent, 'utf8', 'hex');
    encrypted += cipher.final('hex');

    // Combinar: salt + iv + encrypted
    const encryptedBuffer = Buffer.concat([
      salt,
      iv,
      Buffer.from(encrypted, 'hex'),
    ]);

    // Guardar archivo encriptado
    const outputPath = `${filePath}.enc`;
    fs.writeFileSync(outputPath, encryptedBuffer);

    console.log(`${colors.green}✓ Archivo encriptado exitosamente${colors.reset}`);
    console.log(`   ${colors.blue}${outputPath}${colors.reset}`);
    console.log(`${colors.yellow}⚠ Original aún existe. Borralo manualmente si quieres.${colors.reset}`);
  } catch (error) {
    console.error(`${colors.red}✗ Error encriptando:${colors.reset} ${error.message}`);
    process.exit(1);
  }
}

/**
 * Desencriptar archivo
 */
async function decryptFile(filePath, password) {
  try {
    // Verificar que el archivo existe
    if (!fs.existsSync(filePath)) {
      throw new Error(`Archivo no encontrado: ${filePath}`);
    }

    // Leer archivo encriptado
    const encryptedBuffer = fs.readFileSync(filePath);

    // Extraer salt (primeros 16 bytes)
    const salt = encryptedBuffer.slice(0, 16);

    // Extraer IV (siguientes 16 bytes)
    const iv = encryptedBuffer.slice(16, 32);

    // Extraer contenido encriptado (resto)
    const encrypted = encryptedBuffer.slice(32).toString('hex');

    // Derivar clave desde contraseña y salt
    const key = deriveKey(password, salt);

    // Crear decipher AES-256-CBC
    const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);

    // Desencriptar contenido
    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');

    // Guardar archivo desencriptado
    const outputPath = filePath.replace('.enc', '');
    fs.writeFileSync(outputPath, decrypted, 'utf8');

    console.log(`${colors.green}✓ Archivo desencriptado exitosamente${colors.reset}`);
    console.log(`   ${colors.blue}${outputPath}${colors.reset}`);
  } catch (error) {
    if (error.message.includes('Unsupported state or unable to authenticate data')) {
      console.error(`${colors.red}✗ Contraseña incorrecta o archivo corrupto${colors.reset}`);
    } else {
      console.error(`${colors.red}✗ Error desencriptando:${colors.reset} ${error.message}`);
    }
    process.exit(1);
  }
}

/**
 * Mostrar ayuda
 */
function showHelp() {
  console.log(`
${colors.blue}╔════════════════════════════════════════════════════════════╗${colors.reset}
${colors.blue}║  HERRAMIENTA DE ENCRIPTACIÓN PARA DOCUMENTOS PRIVADOS      ║${colors.reset}
${colors.blue}║  (AES-256 con PBKDF2)                                     ║${colors.reset}
${colors.blue}╚════════════════════════════════════════════════════════════╝${colors.reset}

${colors.yellow}USO:${colors.reset}
  node scripts/crypto.js <comando> <archivo>

${colors.yellow}COMANDOS:${colors.reset}
  encrypt <archivo>    Encriptar archivo
  decrypt <archivo>    Desencriptar archivo

${colors.yellow}EJEMPLOS:${colors.reset}
  node scripts/crypto.js encrypt docs/private/SECURITY_AUDIT.md
  node scripts/crypto.js decrypt docs/private/SECURITY_AUDIT.md.enc

${colors.yellow}NOTAS:${colors.reset}
  • Archivos encriptados terminan con .enc
  • Necesitas una contraseña fuerte
  • Solo el dueño debe conocer la contraseña
  • Guarda la contraseña en un lugar seguro
  • NUNCA commitees archivos .enc al público

  `);
}

/**
 * Main
 */
async function main() {
  const args = process.argv.slice(2);

  if (args.length < 2) {
    showHelp();
    process.exit(0);
  }

  const comando = args[0].toLowerCase();
  const archivo = args[1];

  if (!['encrypt', 'decrypt'].includes(comando)) {
    console.error(`${colors.red}✗ Comando no válido: ${comando}${colors.reset}`);
    console.error(`   Usa 'encrypt' o 'decrypt'`);
    process.exit(1);
  }

  try {
    // Lee contraseña
    const password = await readPassword(
      `${colors.yellow}Ingresa contraseña:${colors.reset} `
    );

    if (password.length < 8) {
      console.error(
        `${colors.red}✗ Contraseña debe tener al menos 8 caracteres${colors.reset}`
      );
      process.exit(1);
    }

    if (comando === 'encrypt') {
      await encryptFile(archivo, password);
    } else if (comando === 'decrypt') {
      await decryptFile(archivo, password);
    }
  } catch (error) {
    console.error(`${colors.red}✗ Error:${colors.reset} ${error.message}`);
    process.exit(1);
  }
}

main();
