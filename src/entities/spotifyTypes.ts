export interface Playlist {
  collaborative: boolean;
  description: null;
  external_urls: ExternalUrls;
  followers: Followers;
  href: string;
  id: string;
  images: Image[];
  name: string;
  owner: Owner;
  public: boolean;
  snapshot_id: string;
  tracks: Tracks;
  type: string;
  uri: string;
}

export interface Owner {
  external_urls: ExternalUrls;
  display_name: string;
  href: string;
  id: string;
  type: string;
  uri: string;
}

export interface Tracks {
  href: string;
  items: { track: Track }[];
  limit: number;
  next: null;
  offset: number;
  previous: null;
  total: number;
}

export interface Track {
  added_at: string;
  album: Album;
  artists: Artist[];
  available_markets?: string[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_ids: ExternalIDS;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  is_local: boolean;
  name: string;
  popularity: number;
  preview_url: string | null;
  track_number: number;
  type: string;
  uri: string;
}

export interface UserProfile {
  country: string;
  display_name: string;
  email: string;
  external_urls: ExternalUrls;
  followers: Followers;
  href: string;
  id: string;
  images: Image[];
  product: string;
  type: string;
  uri: string;
}

export interface Followers {
  href: null;
  total: number;
}

export interface Image {
  url: string;
  height: number | null;
  width: number | null;
}

export interface Album {
  album_type: string;
  total_tracks: number;
  artists: Artist[];
  available_markets?: string[];
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: Image[];
  name: string;
  release_date: string | Date;
  release_date_precision: string;
  type: string;
  uri: string;
  genres: string[];
  label: string;
  popularity: number;
  album_group: string;
  tracks: { items: Track[] };
}

export interface Artist {
  external_urls: ExternalUrls;
  followers: Followers;
  genres: string[];
  href: string;
  id: string;
  images: Image[];
  name: string;
  type: string;
  uri: string;
}

export interface ExternalUrls {
  spotify: string;
}

export interface ExternalIDS {
  isrc: string;
}

export interface TrackItems {
  added_at: string;
  added_by: {
    external_urls: ExternalUrls;
    followers: Followers;
    href: string;
    id: string;
    type: string;
    uri: string;
  };
  is_local: boolean;
  track: Track;
}
