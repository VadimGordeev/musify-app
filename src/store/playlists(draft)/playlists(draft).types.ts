import { type Playlist } from '../../entities/spotifyTypes';
import { type STATUS } from '../../entities/status';

export interface PlaylistSlice {
  playlists:
    | { status: typeof STATUS.SUCCESS; data: Playlist }
    | { status: typeof STATUS.IDLE }
    | { status: typeof STATUS.LOADING }
    | { status: typeof STATUS.ERROR; error: string };
}
