import jwt, { JwtPayload } from 'jsonwebtoken';

const secretKey = '535353';

export function generateToken(user: { id: number; email: string }): string {
  return jwt.sign({ id: user.id, email: user.email }, secretKey, {
    expiresIn: '100h',
  });
}

export function authenticateToken(req: any, res: any, next: () => void): void {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, secretKey, (err: any, decoded: any) => {
    if (err) return res.sendStatus(403);

    req.user = decoded as JwtPayload;
    next();
  });
}
