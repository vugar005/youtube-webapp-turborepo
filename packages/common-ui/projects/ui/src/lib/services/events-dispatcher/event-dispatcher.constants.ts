export interface CustomEventConfig {
  detail?: any;
  view?: boolean;
  bubbles?: boolean;
  cancelable?: boolean;
}

export enum GlobalCustomEvent {
  ADD_VIDEO_TO_WATCH_HISTORY = `GLOBAL: Add video to watch history`,
  WATCH_VIDEO = `GLOBAL: Watch Video`,
  NAVIGATE = 'GLOBAL: Navigate',
}
export enum WatchAPPEvents {
  TOGGLE_LIKE_VIDEO = `WATCH_APP: Toggle Like Video`,
  TOGGLE_DISLIKE_VIDEO = `WATCH_APP: Toggle Dislike Video`,
  ENABLE_MINIPLAYER = `WATCH:APP: Enable MiniPlayer`,
}

export enum HistoryAppEvent {
  TOGGLE_IS_WATCH_HISTORY_ENABLED = `HISTORY_APPP: Toggle Is Watch History Enabled`,
  CLEAR_WATCH_HISTORY = `HISTORY_APPP: Clear Watch History`,
}
