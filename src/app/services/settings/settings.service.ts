import { Injectable } from '@angular/core';

let SETTINGS = {
      projects: {
        visibility: true
      }
};

@Injectable()
export class SettingsService {

      constructor(){}

      getSettings() {
        return SETTINGS;
      }
}
