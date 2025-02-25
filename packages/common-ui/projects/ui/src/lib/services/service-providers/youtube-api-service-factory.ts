import { isPlatformServer } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injector, PLATFORM_ID } from '@angular/core';
import { LocalStorageEnum } from '../../constants/local-storage.constants';
import { IYoutubeService } from '../../models';
import { APP_CONFIG } from '../../tokens';
import { YoutubeServiceV1 } from '../youtube-v1';
import { YoutubeServiceV2 } from '../youtube-v2';
import { YoutubeService } from '../youtube-v3';
import { YoutubeApiServiceType } from './youtube-api-service-type';

export const youtubeApiServiceFactory = (injector: Injector): IYoutubeService => {
  const platformId = injector.get(PLATFORM_ID);
  if (!isPlatformServer(platformId)) {
    const selectedService = sessionStorage.getItem(LocalStorageEnum.SELECTED_API_SERVICE);
    switch (selectedService) {
      case YoutubeApiServiceType.EXTERNAL_API_V1:
        return new YoutubeServiceV1(injector.get(APP_CONFIG), injector.get(HttpClient));

      case YoutubeApiServiceType.EXTERNAL_API_V2:
        return new YoutubeServiceV2(injector.get(APP_CONFIG), injector.get(HttpClient));

      case YoutubeApiServiceType.DATA_API_V3:
        return new YoutubeService(injector.get(APP_CONFIG), injector.get(HttpClient));
      default:
        return new YoutubeServiceV2(injector.get(APP_CONFIG), injector.get(HttpClient));
    }
  } else {
    return new YoutubeServiceV2(injector.get(APP_CONFIG), injector.get(HttpClient));
  }
};
