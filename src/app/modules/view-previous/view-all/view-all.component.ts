import { Component, OnInit, inject } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs/internal/Observable';
import { CrudService } from 'src/app/services/crud.service';

@Component({
  selector: 'app-view-all',
  templateUrl: './view-all.component.html',
  styleUrls: ['./view-all.component.scss']
})
export class ViewAllComponent implements OnInit {

  private db = inject(CrudService);
  data$: Observable<FormData[]> = this.db.getFormData();

  ngOnInit(): void {
    
  }

}
