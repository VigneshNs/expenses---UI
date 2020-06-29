import {environment} from '../../environments/environment';
import { AppSettingType } from './AppSettingType';

export const AppSetting: AppSettingType = {
    customerServiceUrl: environment.customerServiceUrl,
    customerImageUrl: environment.customerImageUrl
};
