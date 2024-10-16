export class Athlete {
    id: string;
    name: string;
    age: number;
    team: string;
    createdAt: Date;
  
    constructor(id: string, name: string, age: number, team: string, createdAt: Date) {
      this.id = id;
      this.name = name;
      this.age = age;
      this.team = team;
      this.createdAt = createdAt;
    }
  }
  