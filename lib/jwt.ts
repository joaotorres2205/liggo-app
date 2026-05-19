import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET || process.env.NEXTAUTH_SECRET || 'dev-secret';

export function signToken(payload: object, expiresIn = '30d') {
  return jwt.sign(payload, SECRET, { expiresIn });
}

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, SECRET) as any;
  } catch (e) {
    return null;
  }
}
