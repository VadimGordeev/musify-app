import { type UserProfile } from '../../entities/spotifyTypes';
import { type STATUS } from '../../entities/status';

export interface UserSlice {
  currentUser:
    | { status: typeof STATUS.IDLE }
    | { status: typeof STATUS.LOADING; isLoading: boolean }
    | { status: typeof STATUS.SUCCESS; data: UserProfile }
    | { status: typeof STATUS.ERROR; error: string };
  deviceId: string;
}
