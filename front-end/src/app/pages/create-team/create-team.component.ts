import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { NgForOf } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TeamService } from '../../../team.service';
import { TeamListComponent } from '../../shared/team-list/team-list.component';
import { NavbarComponent } from '../../shared/navbar/navbar.component';

@Component({
  selector: 'app-create-team',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    NgForOf,
    TeamListComponent,
    NavbarComponent,
  ],
  templateUrl: './create-team.component.html',
  styleUrls: ['./create-team.component.css'],
})
export class CreateTeamComponent {
  teamName = '';
  selectedEmployees: string[] = [];
  employees: string[] = [];

  constructor(private teamService: TeamService, private snackBar: MatSnackBar) {
    this.employees = this.teamService.getEmployees();
  }

  createTeam(): void {
    if (this.teamName && this.selectedEmployees.length > 0) {
      const team = {
        name: this.teamName,
        employees: this.selectedEmployees,
        statuses: this.selectedEmployees.map(() => 'offline'),
      };
      this.teamService.saveTeam(team);
      this.teamName = '';
      this.selectedEmployees = [];

      this.snackBar.open(`Team "${team.name}" created successfully!`, 'Close', {
        duration: 2000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
      });
    } else {
      this.snackBar.open(
        'Please provide a team name and select at least one employee.',
        'Close',
        {
          duration: 2000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        }
      );
    }
  }
}
