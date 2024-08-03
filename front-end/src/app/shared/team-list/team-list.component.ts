import { Component } from '@angular/core';
import { NgForOf, NgClass, NgIf, CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TeamService } from '../../../team.service';

@Component({
  selector: 'app-team-list',
  standalone: true,
  imports: [
    NgForOf,
    NgClass,
    NgIf,
    CommonModule,
    MatSelectModule,
    MatOptionModule,
    FormsModule,
  ],
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.css'],
})
export class TeamListComponent {
  teams: any[] = [];

  constructor(private teamService: TeamService, private snackBar: MatSnackBar) {
    this.teams = this.teamService.getTeams().map((team: any) => ({
      ...team,
      showDetails: false,
    }));
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'online':
        return 'status-online';
      case 'away':
        return 'status-away';
      default:
        return 'status-offline';
    }
  }

  updateTeams(): void {
    localStorage.setItem('teams', JSON.stringify(this.teams));
  }

  removeTeam(index: number): void {
    this.teams.splice(index, 1);
    this.updateTeams();

    this.snackBar.open('Team removed successfully!', 'Close', {
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }

  toggleTeamDetails(index: number): void {
    this.teams[index].showDetails = !this.teams[index].showDetails;
  }

  addEmployee(index: number): void {
    const newEmployee = prompt('Enter the name of the new employee:');
    if (newEmployee) {
      this.teams[index].employees.push(newEmployee);
      this.teams[index].statuses.push('offline');
      this.updateTeams();

      this.snackBar.open(`Added ${newEmployee} to the team.`, 'Close', {
        duration: 2000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
      });
    }
  }

  changeStatus(index: number, employeeIndex: number, status: string): void {
    const employeeName = this.teams[index].employees[employeeIndex];
    this.teams[index].statuses[employeeIndex] = status;
    this.updateTeams();

    this.snackBar.open(`${employeeName} is now ${status}.`, 'Close', {
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }
}
