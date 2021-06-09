import { Component, OnInit } from '@angular/core';
import { evaluate } from '../models/evaluate';
import { evaluatedUser } from '../models/evaluatedUser';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  evaluation: evaluatedUser = new evaluatedUser();
  evaluate: evaluate = new evaluate();
  constructor(private api: ApiService) { }

  ngOnInit() {
    this.api.getEvaluation(localStorage.getItem('id')).subscribe((res) => {
      console.log(res.employeeEvaluations.length)
      if (res.employeeEvaluations.length == 0) {

        this.evaluate.employeeID = res.id;
        this.evaluate.attendance = 0;
        this.evaluate.communicationSkill = 0;
        this.evaluate.initiatives = 0;
        this.evaluate.jobKnowledge = 0;
        this.evaluate.workQuality = 0;
        this.evaluate.overAllScore = 0;

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
        this.evaluate.overAllScore = res.employeeEvaluations[0].overAllScore;
      }
      this.evaluation = res;
    });
  }
}
