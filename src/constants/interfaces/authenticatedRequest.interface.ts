import { UserData } from '../types/userData.type';

export interface AuthenticatedRequest extends Request { user: UserData };
