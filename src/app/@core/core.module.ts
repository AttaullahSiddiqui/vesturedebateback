import {
  ModuleWithProviders,
  NgModule,
  Optional,
  SkipSelf,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  NbAuthModule
} from "@nebular/auth";
import { NbSecurityModule, NbRoleProvider } from "@nebular/security";
import { of as observableOf } from "rxjs";

import { throwIfAlreadyLoaded } from "./module-import-guard";
import { LayoutService, StateService } from "./utils";
import { DataService } from "./utils/data.service";
import { UtilityService } from "./utils/utility.service";
import { MockDataModule } from "./mock/mock-data.module";
import { TemperatureHumidityData } from "./data/temperature-humidity";
import { TemperatureHumidityService } from "./mock/temperature-humidity.service";

export class NbSimpleRoleProvider extends NbRoleProvider {
  getRole() {
    // here you could provide any role based on any auth flow
    return observableOf("guest");
  }
}

const DATA_SERVICES = [
  { provide: TemperatureHumidityData, useClass: TemperatureHumidityService },
];

export const NB_CORE_PROVIDERS = [
  ...MockDataModule.forRoot().providers,
  ,
  ...DATA_SERVICES,
  DataService,
  UtilityService,
  ...NbAuthModule.forRoot({}).providers,

  NbSecurityModule.forRoot({
    accessControl: {
      guest: {
        create: "*",
        edit: "*",
        remove: "*",
      },
      user: {
        create: "*",
        edit: "*",
        remove: "*",
      },
    },
  }).providers,

  {
    provide: NbRoleProvider,
    useClass: NbSimpleRoleProvider,
  },
  LayoutService,
  StateService,
];

@NgModule({
  imports: [CommonModule],
  exports: [NbAuthModule],
  declarations: [],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, "CoreModule");
  }

  static forRoot(): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule,
      providers: [...NB_CORE_PROVIDERS],
    };
  }
}
