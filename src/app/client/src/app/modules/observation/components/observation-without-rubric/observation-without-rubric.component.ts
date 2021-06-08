import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ConfigService, ResourceService } from '@sunbird/shared';
import { ObservationUtilService } from "../../service";
@Component({
    selector: 'observationWithoutRubric',
    templateUrl: './observation-without-rubric.component.html',
    styleUrls: ['./observation-without-rubric.component.scss']
})
export class ObservationWithoutRubricComponent implements OnInit {
    @Input() submission;
    @Input() allowMultipleAssessemts;
    showPopOver = true;
    @Output() selectedSubmission = new EventEmitter();
    @Output() onAction = new EventEmitter();
    actions;
    constructor(
        private observationUtil: ObservationUtilService,
        public resourceService: ResourceService,
    ) { }
    ngOnInit() {
        this.getMenus();
    }
    getMenus() {
        this.actions = this.observationUtil.getPopoverActions();
        console.log(this.actions, "this.actions");
    }
    open(sbnum, data) {
        data.submissionNumber = sbnum;
        this.selectedSubmission.emit(data);
    }
    actionEvent(data, type) {
        this.onAction.emit({ action: type, data: data })
    }
}