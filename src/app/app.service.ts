

export interface Students {
  GPA?: number,
  email: string,
  name: string
}


export interface initialDataofCompany {
  name: string,
  email: string

}

export interface CompanyDataOfFirebase {
  email: string,
  name: string,
  amount: number;
  due_date: string,
  applicants?: string[],
  qualification_required: string,
  title: string
}
export interface Company {
  email: string,
  name: string,
  job?: string,
  salary?: number,
  qualification?: string,
  applicants?: string[]
}

import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

import { Vacancy } from './shared/companydata.models';
import { Observable, from, pipe } from 'rxjs';
import { map, retry, take, switchMap } from 'rxjs/operators';
import { Injectable, OnInit } from '@angular/core';
import * as CompanyData from './companyprofile/store/company.reducers';
import { Title } from '@angular/platform-browser';

@Injectable()
export class DataService implements OnInit {
  CompanyDataforApplicants:Observable<CompanyDataOfFirebase>;
  CompanyDatafromFirebase: Observable<any>;
  Update: Observable<any>;
  //CompanyDataInUserFormat:Observable<CompanyData.State[]>
  Companies: AngularFirestoreCollection<Company>;
  Students: AngularFirestoreCollection<Students>;
  IdOfCompany: any;
  dataofCompanyfromFirebase: CompanyDataOfFirebase;
  initialDataofCompany: initialDataofCompany;


  constructor(private db: AngularFirestore,
  ) {

    this.Companies = this.db.collection('Company');
    this.Students = this.db.collection('Students');

    this.CompanyDatafromFirebase = this.Companies.valueChanges();

  }

  ngOnInit() {
    // this.CompanyDataInUserFormat = this.CompanyDatafromFirebase.pipe(
    //     map(courses=>courses.filter(courses=>courses.type == 'birthday'))
    //   );
  }

  addUser(docdata: { accountType: string, user: string, email: string, password: string,GPA?:number }) {
    if(docdata.accountType == 'Students'){
    this.db.collection(docdata.accountType).add({
      name: docdata.user,
      email: docdata.email,
      GPA:docdata.GPA
    })
  }
else{
  this.db.collection(docdata.accountType).add({
    name: docdata.user,
    email: docdata.email,
    
  })
}
  }

  saveVacancies(vacancies: Vacancy, useremail: string) {
    let job = {
      title: vacancies.title,
      amount: vacancies.amount,
      qua: vacancies.qualification_required,
      date: vacancies.due_date,
      applicants: ['']

    }
    this.db.collection('Company', ref => ref.where('email', '==', useremail)).snapshotChanges(

    ).pipe(
      take(1),
      map(actions => actions.map(a => {

        const id = a.payload.doc.id;
        this.initialDataofCompany = a.payload.doc.data() as initialDataofCompany;
        //   const data = a.payload.doc.data() as CompanyDataOfFirebase;
        return id;
      }))
    ).subscribe(id => {
      console.log(id);
      this.IdOfCompany = id.toString();
      console.warn('about to write', this.initialDataofCompany);
      this.db.collection('Company').doc(this.IdOfCompany).update({ ...this.initialDataofCompany, ...vacancies });

    }, () => console.log('error getting id'),
      () => {
        //    console.warn('about to write',this.dataofCompanyfromFirebase);
        //     this.db.collection('Company').doc(this.IdOfCompany).update({...this.dataofCompanyfromFirebase,applicants:[...this.dataofCompanyfromFirebase.applicants,applicant]});

      });




    // this.itemsCollection.add(vacancies);

  }

  getStudents() {
    return this.Students.valueChanges();
  }

  removeFaultyStudents(id: string) {
    this.db.doc('').delete()
  }


  getApplicants() {
    this.db.collection('')

    // this.todo$ = this.itemsCollection.valueChanges();
  }

  ApplyforJob(user, applicant: string) {
    this.db.collection('Company', ref => ref.where('name', '==', user)).snapshotChanges(

    ).pipe(
      take(1),
      map(actions => actions.map(a => {
        // const data = a.payload.doc.data() as Shirt;
        const id = a.payload.doc.id;
        this.dataofCompanyfromFirebase = a.payload.doc.data() as CompanyDataOfFirebase;
        //   const data = a.payload.doc.data() as CompanyDataOfFirebase;
        return id;
      }))
    ).subscribe(id => {
      console.log(id);
      this.IdOfCompany = id.toString();
      console.warn('about to write', this.dataofCompanyfromFirebase);
      this.db.collection('Company').doc(this.IdOfCompany).update({ ...this.dataofCompanyfromFirebase, applicants: [...this.dataofCompanyfromFirebase.applicants, applicant] });

    }, () => console.log('error getting id'),
      () => {
        //    console.warn('about to write',this.dataofCompanyfromFirebase);
        //     this.db.collection('Company').doc(this.IdOfCompany).update({...this.dataofCompanyfromFirebase,applicants:[...this.dataofCompanyfromFirebase.applicants,applicant]});

      });
  }

  ViewAppliedStudents(email:string){
   return this.db.collection('Company', ref => ref.where('email', '==', email)).valueChanges();
  }


}