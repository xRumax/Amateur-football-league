import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { SessionService } from '../../services/session.service';

export interface UserResponse {
  id: number;
  username: string;
  email: string;
  password: string;
  is_superuser: boolean;
}
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent {
  displayedColumns: string[] = ['login', 'email', 'password', 'isAdmin'];

  user: UserResponse | null = null;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getUserId().then((data) => {
      console.log(data);
      const userId = data.user_id.user_id; // Get the user id
      console.log(userId);

      // Now make another request to get the full user data
      this.userService.getUser(userId).then((userData) => {
        console.log(userData);
        this.user = userData; // Assign the user data to this.user
      });
    });
  }
}
