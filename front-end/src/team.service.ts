import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TeamService {
  private localStorageKey = 'teams';

  constructor() {}

  getTeams(): any[] {
    return JSON.parse(localStorage.getItem(this.localStorageKey) || '[]');
  }

  saveTeam(team: any): void {
    const teams = this.getTeams();
    teams.push(team);
    localStorage.setItem(this.localStorageKey, JSON.stringify(teams));
  }
  getEmployees(): string[] {
    return [
      'Yavuz Mollahamzaoğlu',
      'Batuhan Ülper',
      'Onur Keniş',
      'Cihat Haktanır',
      'Fatih Toker',
      'Barış Hantaş',
      'Meriç Ünlü',
      'Hasan Denizhan',
    ];
  }
}
