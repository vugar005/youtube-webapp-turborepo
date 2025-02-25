export enum YTKeyEvent {
  TOGGLE_FULL_SCREEN = 'f',
  TOGGLE_MINI_PLAYER = 'i',
  TOGGLE_MUTE = 'm',
  CLOSE_MINI_PLAYER = 'ESCAPE',
  TOGGLE_PLAY_PAUSE = 'k',
  REWIND_10 = 'j',
  FAST_FORWARD_10 = 'l',
}

export const KeyEventOptions = {
  GENERAL: [
    {
      label: 'Toggle full screen',
      key: YTKeyEvent.TOGGLE_FULL_SCREEN,
    },
    {
      label: 'Toggle miniplayer',
      key: YTKeyEvent.TOGGLE_MINI_PLAYER,
    },
    {
      label: 'Toggle mute',
      key: YTKeyEvent.TOGGLE_MUTE,
    },
    {
      label: 'Close miniplayer',
      key: YTKeyEvent.CLOSE_MINI_PLAYER,
    },
  ],
  PLAYBACK: [
    {
      label: 'Toggle play/pause',
      key: YTKeyEvent.TOGGLE_PLAY_PAUSE,
    },
    {
      label: 'Rewind 10 seconds',
      key: YTKeyEvent.REWIND_10,
    },
    {
      label: 'Fast forward 10 seconds',
      key: YTKeyEvent.FAST_FORWARD_10,
    },
  ],
};
