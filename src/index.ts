import { sign } from './jwt/sign';
import { verifyJwt } from './jwt/verify';

const token = sign({ payload: { userId: 123, cargo:'admin' } });
const verified = verifyJwt(token);

console.log("Generated JWT:", token);
console.log("Verified JWT:", verified);