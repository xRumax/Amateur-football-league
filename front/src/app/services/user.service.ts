import { Injectable } from '@angular/core';
import axios from 'axios';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormField } from '../app.component';
import { Environment } from '../../environments/environment';
import { SessionService } from './session.service';
import { TeamService } from './team.service';

export interface UserResponse {
  id: number;
  username: string;
  email: string;
  password: string;
  team?: { team_id: number };
  is_superuser: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private snackBar: MatSnackBar,
    private envService: Environment,
    private sessionService: SessionService,
    private teamService: TeamService
  ) {}

  generateUserFields(user: UserResponse): FormField[] {
    return [
      {
        type: 'text',
        name: 'username',
        id: 'username',
        placeholder: 'Username',
        value: user.username,
      },
      {
        type: 'email',
        name: 'email',
        id: 'email',
        placeholder: 'Email',
        value: user.email,
      },
    ];
  }

  async getUserDataAndFields(): Promise<{ user: UserResponse; fields: any[] }> {
    const userId = this.sessionService.getUserId(); // Use getUserId from sessionService
    if (!userId) {
      throw new Error('User ID not found');
    }
    const user = await this.getUser(Number(userId));

    let fields: any[] = [];
    if (user !== null) {
      fields = this.generateUserFields(user);
    }

    return { user, fields };
  }
  getUser(userId: number): Promise<UserResponse> {
    return new Promise((resolve, reject) => {
      const token = localStorage.getItem('access_token'); // Get the token from localStorage
      axios
        .get(`${this.envService.base_url}/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  getAllUsers(): Promise<any> {
    return new Promise((resolve, reject) => {
      axios
        .get(`${this.envService.base_url}/users`)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  getUpdateForm(userId: number): Promise<FormField[]> {
    return axios
      .get(`${this.envService.base_url}/users/${userId}`)
      .then((response) => {
        const userData = response.data.data;

        // Generate dynamic date fields
        return Object.keys(userData).map((key) => ({
          type: typeof userData[key] === 'number' ? 'number' : 'text',
          name: key,
          id: key,
          placeholder: `Podaj ${key}`,
          value: userData[key],
        }));
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
        throw error;
      });
  }

  updateUser(userId: number, data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      const token = localStorage.getItem('access_token');
      axios
        .put(`${this.envService.base_url}/users/${userId}/`, data, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          this.snackBar.open('User updated successfully', 'Close', {
            duration: 5000,
          });
          setTimeout(() => {
            window.location.reload();
          }, 500);
          resolve(response.data);
        })
        .catch((error) => {
          console.error('Error updating user:', error);
          this.snackBar.open('Error updating user', 'Close', {
            duration: 5000,
          });
          reject(error);
        });
    });
  }
  deleteUser(userId: string): Promise<any> {
    return new Promise((resolve, reject) => {
      axios
        .delete(`${this.envService.base_url}/users/${userId}`)
        .then((response) => {
          setTimeout(() => {
            resolve(response.data);
          }, 500);
        })
        .catch((error) => {
          console.error('Error deleting user:', error);
          this.snackBar.open('Error deleting user', 'Close', {
            duration: 5000,
          });
          reject(error);
        });
    });
  }

  async getUserTeamDetails(userId: number): Promise<any> {
    const user = await this.getUser(userId); // Assuming getUser() fetches user details
    if (!user.team || !user.team.team_id) {
      // No team ID found for the user
      return {
        error: 'No team ID found for the user. Please join or create a team.',
      };
    }
    try {
      const teamDetails = await this.teamService.getTeam(user.team.team_id);
      return teamDetails;
    } catch (error) {
      console.error('Error fetching team details:', error);
      throw error;
    }
  }
}
