import { hash, compare } from 'bcrypt';

const password = 'dan1dani1';
const hashSalt = Number(process.env.HASH_SALT) || 10;

async function testHash() {
  // Generar hash
  const hashed = await hash(password, hashSalt);
  console.log('Hash generado:', hashed);

  // Comparar el password con el hash generado
  const isValid = await compare(password, hashed);
  console.log('¿Password válido?:', isValid);
}

testHash();
