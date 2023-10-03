import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, switchMap, map, tap } from 'rxjs';
import { Standing } from 'src/app/interfaces/ClassificationResponse.interface';
import { ClassificationService } from 'src/app/services/classification.service';

@Component({
  selector: 'app-classification',
  templateUrl: './classification.component.html',
  styleUrls: ['./classification.component.scss']
})
export class ClassificationComponent implements OnInit {

  classificationData$?: Observable<Standing[] | null>;

  constructor(private classificationService: ClassificationService, private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.classificationData$ = this.route.params.pipe(
      switchMap(params => this.classificationService.getClassification(params['leagueId'])),
      map(classification => classification.length === 0 ? null : classification)
    )
  }
}
