export interface TokenPayload {
  id: number;
  email: string;
  isAdmin?: boolean;
}

export interface Token {
  accessToken: string;
  refreshToken: string;
  tokenPayload?: TokenPayload;
}
