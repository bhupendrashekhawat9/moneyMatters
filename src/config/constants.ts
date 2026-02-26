import * as path from 'path';
import * as dotenv from 'dotenv';

// Load env early (resolve to project root .env)
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

export const JWT_SECRET: string = process.env.JWT_SECRET || 'your-secret-key';
export const JWT_EXPIRE: string = process.env.JWT_EXPIRE || '30d';
export const PORT: number = Number(process.env.PORT || 9000);
export const NODE_ENV: string = process.env.NODE_ENV || 'development';
