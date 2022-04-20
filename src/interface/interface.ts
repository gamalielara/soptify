export interface Token {
  token: {
    value: string;
  };
}

export interface SongItem {
  id: string;
  name: string;
  title: string;
  image: string;
  album: {
    name: string;
    artists: [
      {
        name: string;
      }
    ];
    images: [
      image: {
        url: string;
      }
    ];
  };
  external_urls: {
    spotify: string;
  };
  explicit: boolean;
  uri: string;
}

export interface SelectedSongs {
  selectedSongs: {
    value: string[];
  };
}
