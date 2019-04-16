import { Component, OnInit } from '@angular/core';
import { DataService } from '../app.service';
import {Students} from '../app.service';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';



@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

StudentsData:Observable<any>;
StudentsCollections:AngularFirestoreCollection<Students>;

  constructor(private dataService:DataService,private db:AngularFirestore) {
    this.StudentsCollections = this.db.collection('Students');
   }

  ngOnInit() {

    this.StudentsData = this.StudentsCollections.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          return {
            id: a.payload.doc.id,
            ...a.payload.doc.data()
          } as Students
        })
      })
    )
    
  
  }
  

  getStudents(){

  }

  Remove(id:string){
    this.StudentsCollections.doc(id).delete();
console.warn(id);
  }

}
