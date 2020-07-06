import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

import { ServerResponse, ConfigService } from '@sunbird/shared';
import { HttpHeaders, HttpClient } from '@angular/common/http';

import { of as observableOf, throwError as observableThrowError, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { ShikshalokamService } from '../shikshalokam/shikshalokam.service';
import { slConfig } from './slConfig';

@Injectable({
  providedIn: 'root'
})
export class SlUtilsService {

  allOrganizations = {};

  constructor(
    private slService: ShikshalokamService,
    private http: HttpClient, private configService: ConfigService) { }

  syncBatchApi(payload): Observable<any> {
    const option = {
      url: 'kendra',
      data: {
        method: "POST",
        url: slConfig.BASE_URL + slConfig.API_URL.SYNC_COURSE,
        body: payload
      },
    };
    return this.slService.post(option).pipe(map((response: ServerResponse) => {
      return response;
    }));
  }

  getAllOrganizations(): Observable<any> {
    const option = {
      url: 'kendra',
      data: {
        method: "GET",
        url: slConfig.BASE_URL + slConfig.API_URL.GET_ORGANIZATION_LIST,
      },
    };
    return this.slService.post(option).pipe(map((response: ServerResponse) => {
      if (response.result.result) {
        for (const org of response.result.result) {
          this.allOrganizations[org.id] = org;
        }
        localStorage.setItem('allOrganization', JSON.stringify(this.allOrganizations));
      }
      return response;
    }));
  }

  filterOrgName(orgDetails, createdFor) {
    debugger
    if (orgDetails && orgDetails.orgName) {
      if (createdFor && createdFor.length > 1) {
        const filteredOrgs = createdFor.filter(org => org != "0124487522476933120")
        const orgName = [];
        for (const org of filteredOrgs) {
          this.allOrganizations[org] ?  orgName.push(this.allOrganizations[org].name) : "";
        }
        orgDetails.orgName = orgName;
      }
    } else {
      orgDetails.orgName = "Ekstep Channel"
    }
    return orgDetails
  }

}
