import { InjectionToken } from '@angular/core';
import { IAppConfig } from '../models';

export const APP_CONFIG = new InjectionToken<IAppConfig>('APP_CONFIG');
