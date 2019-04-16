export class Vacancy {
    constructor(public title: string, public amount: number, public qualification_required: string,
        public due_date:number
        ){}
  }

  export class StudentBio{
      constructor(public latest_qualification:string, public skillset:any[] ){}
  }
