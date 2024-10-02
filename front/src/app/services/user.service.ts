import { Injectable } from '@angular/core';
import axios from 'axios';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormField } from '../app.component';
import { Environment } from '../../environments/environment';
import { SessionService } from './session.service';
import { TeamService, Team } from './team.service';

export interface UserResponse {
  id: number;
  username: string;
  email: string;
  password: string;
  team?: Team | null;
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

  async generateUserFields(user: UserResponse): Promise<FormField[]> {
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

  async getUserDataAndFields(): Promise<{
    user: UserResponse;
    fields: FormField[];
  }> {
    const userId = this.sessionService.getUserId();
    if (!userId) throw new Error('User ID not found');
    const user = await this.getUser(Number(userId));
    const fields = await this.generateUserFields(user);
    return { user, fields };
  }

  async getUser(userId: number): Promise<UserResponse> {
    try {
      const token = localStorage.getItem('access_token');
      const response = await axios.get(
        `${this.envService.base_url}/users/${userId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching user:', error);
      throw error;
    }
  }

  async getAllUsers(): Promise<UserResponse[]> {
    try {
      const response = await axios.get(`${this.envService.base_url}/users`);
      return response.data;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  }

  async getUpdateForm(userId: number): Promise<FormField[]> {
    try {
      const response = await axios.get(
        `${this.envService.base_url}/users/${userId}`
      );
      const userData = response.data.data;
      return Object.keys(userData).map((key) => ({
        type: typeof userData[key] === 'number' ? 'number' : 'text',
        name: key,
        id: key,
        placeholder: `Enter ${key}`,
        value: userData[key],
      }));
    } catch (error) {
      console.error('Error fetching user data:', error);
      throw error;
    }
  }

  async updateUser(userId: number, data: any): Promise<void> {
    try {
      const token = localStorage.getItem('access_token');
      await axios.put(`${this.envService.base_url}/users/${userId}/`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      this.snackBar.open('User updated successfully', 'Close', {
        duration: 5000,
      });
      setTimeout(() => window.location.reload(), 500);
    } catch (error) {
      console.error('Error updating user:', error);
      this.snackBar.open('Error updating user', 'Close', { duration: 5000 });
      throw error;
    }
  }

  async deleteUser(userId: string): Promise<void> {
    try {
      await axios.delete(`${this.envService.base_url}/users/${userId}`);
      setTimeout(
        () =>
          this.snackBar.open('User deleted successfully', 'Close', {
            duration: 5000,
          }),
        500
      );
    } catch (error) {
      console.error('Error deleting user:', error);
      this.snackBar.open('Error deleting user', 'Close', { duration: 5000 });
      throw error;
    }
  }

  async getUserTeamDetails(userId: number): Promise<any> {
    const user = await this.getUser(userId);
    if (!user.team || !user.team.id) {
      return {
        error: 'No team ID found for the user. Please join or create a team.',
      };
    }
    try {
      const teamDetails = await this.teamService.getTeam(user.team.id);
      return teamDetails;
    } catch (error) {
      console.error('Error fetching team details:', error);
      throw error;
    }
  }

  async userHaveTeam(userId: number): Promise<boolean> {
    const user = await this.getUser(userId);
    return Boolean(user.team && user.team.id);
  }
}
