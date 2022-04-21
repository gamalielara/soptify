export interface Token {
  token: {
    value: string;
  };
}

export interface SongItem {
  album: {
    name: string;
    images: [
      {
        url: string;
      }
    ];
    artists: [{ name: string }];
  };
  artists: [
    {
      href: string;
      name: string;
    }
  ];
  duration: number;
  explicit: boolean;
  external_urls: {
    spotify: string;
  };
  id: string;
  name: string;
  uri: string;
}

export interface PlaylistTrackItem {
  track: SongItem;
}

export interface SelectedSongs {
  selectedSongs: {
    value: string[];
  };
}
