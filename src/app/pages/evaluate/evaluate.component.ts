import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotficationService } from '../../services/notfication.service';
import { evaluate } from '../../models/evaluate';
import { evaluatedUser } from '../../models/evaluatedUser';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-evaluate',
  templateUrl: './evaluate.component.html',
  styleUrls: ['./evaluate.component.css']
})
export class EvaluateComponent implements OnInit {

  evaluation: evaluatedUser = new evaluatedUser();
  evaluate: evaluate = new evaluate();
  overAllScore = 0;
  id = 0;
  constructor(private route: ActivatedRoute,
    private api: ApiService,
    private notification: NotficationService, private router: Router) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['empID'] != null)
        this.id = params['empID'];
      this.getEvaluate();
      console.log(this.id);
    });
  }
  getEvaluate() {
    this.api.getEvaluation(this.id).subscribe(res => {
      console.log(res.employeeEvaluations.length)
      if (res.employeeEvaluations.length == 0) {

        this.evaluate.employeeID = res.id;
        this.evaluate.attendance = 3;
        this.evaluate.communicationSkill = 3;
        this.evaluate.initiatives = 3;
        this.evaluate.jobKnowledge = 3;
        this.evaluate.workQuality = 3;

        res.employeeEvaluations.push(this.evaluate);

        console.log(this.evaluation);

      } else {
        this.evaluate.employeeID = res.id;
        this.evaluate.evaluationID = res.employeeEvaluations[0].evaluationID;
        this.evaluate.attendance = res.employeeEvaluations[0].attendance;
        this.evaluate.communicationSkill = res.employeeEvaluations[0].communicationSkill;
        this.evaluate.initiatives = res.employeeEvaluations[0].initiatives;
        this.evaluate.jobKnowledge = res.employeeEvaluations[0].jobKnowledge;
        this.evaluate.workQuality = res.employeeEvaluations[0].workQuality;
      }
      this.evaluation = res;

      this.calculateOverAll();
    });
  }
  evaluateEmp() {

    this.api.addEvaluation(this.evaluate).subscribe((res) => {
      if (res.status == 0) {//not success
        this.notification.notfiy('error', res.message, 'top', 'right');
      } else {
        this.notification.notfiy('success', res.message, 'top', 'right');
        this.router.navigateByUrl('users');
      }
    });
  }
  calculateOverAll() {
    this.evaluate.overAllScore = Math.round(
      ((this.evaluate.workQuality * 2 + this.evaluate.jobKnowledge * 2 + this.evaluate.initiatives +
        this.evaluate.communicationSkill * 2 + this.evaluate.attendance) / 40) * 100);
  }
  close(){
    this.router.navigateByUrl('users');
  }
}

