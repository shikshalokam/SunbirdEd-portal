import { IImpressionEventInput, IInteractEventEdata } from '@sunbird/telemetry';
import { ToasterService } from '@sunbird/shared';
import { Component, OnInit, Output, OnDestroy, Input, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { ResourceService } from '@sunbird/shared';
import * as _ from 'lodash-es';
import { OnboardingService } from './../../services';

@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.component.html',
  styleUrls: ['./onboarding.component.scss']
})
export class OnboardingComponent implements OnInit {

  slide = 'location';
  telemetryImpressionData: IImpressionEventInput;
  telemetryInteractEdata: IInteractEventEdata;
  constructor(private router: Router, public toasterService: ToasterService,
    public activatedRoute: ActivatedRoute, public resourceService: ResourceService,
    public onboardingService: OnboardingService) {
  }

  ngOnInit() {
  }

  handleLocationSaveEvent() {
    this.slide = 'contentPreference';
  }

  handleContentPreferenceSaveEvent() {
    this.onboardingService.onboardCompletion.emit('SUCCESS');
  }

  setTelemetryData() {
   return {
      context: { env: 'onboarding' },
      edata: {
        type: 'view',
        pageid: 'onboarding_location_setting',
        uri: this.router.url
      }
    };
  }

}
