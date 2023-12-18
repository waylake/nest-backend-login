import { compare, genSalt, hash } from 'bcrypt';
import { generate } from 'randomstring';
import { sign as JwtSign } from 'jsonwebtoken';
import { TokenPayload } from './interfaces';

export async function generatePassword(password: string): Promise<string> {
  const salt = await genSalt(13);
  return hash(password, salt);
}

export function validatePassword(
  inputPassword: string,
  storedPassword: string,
): Promise<boolean> {
  return compare(inputPassword, storedPassword);
}

export function randomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Function to generate a random numeric string of a given length
export function numericRandom(length: number): string {
  const result = generate({
    length,
    charset: 'numeric',
  });
  return result;
}

// Function to generate a random alphanumeric string of a given length
export function generateRandom(length: number): string {
  const result = generate({
    length,
    charset: 'alphanumeric',
  });
  return result;
}

export function generateToken(payload: TokenPayload): string {
  const accessToken: string = JwtSign(payload, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });
  return accessToken;
}
