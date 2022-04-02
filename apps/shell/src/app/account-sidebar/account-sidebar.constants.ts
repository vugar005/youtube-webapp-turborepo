import { ISelectOption, YoutubeApiServiceType } from '@youtube/common-ui';

export const API_SELECT_OPTIONS: ISelectOption<YoutubeApiServiceType>[] = [
  {
    value: YoutubeApiServiceType.EXTERNAL_API_V1,
    label: 'External API V1 (Slow)',
  },
  {
    value: YoutubeApiServiceType.EXTERNAL_API_V2,
    label: 'External API V2 (Slow)',
  },
  {
    value: YoutubeApiServiceType.DATA_API_V3,
    label: 'Youtube Data API v3 (Fast)',
    disabled: true,
  },
];
