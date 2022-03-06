interface VideoId {
  videoId: string;
}

interface Default {
  url: string;
  width: number;
  height: number;
}

interface High {
  url: string;
  width: number;
  height: number;
}

interface Thumbnails {
  id: string;
  url: string;
  default: Default;
  high: High;
  height: number;
  width: number;
}

export interface VideoSnippet {
  url: string;
  duration: string;
  publishedAt: string;
  thumbnails: Thumbnails;
  title: string;
  views: string;
}

export interface IYoutubeSearchResult {
  id: VideoId;
  url: string;
  title: string;
  description: string;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  duration_raw: string;
  snippet: VideoSnippet;
  views: string;
}
