import * as zod from 'zod';
import { userSchema } from '../schemas/User.schema';

export type User = zod.infer<typeof userSchema>;