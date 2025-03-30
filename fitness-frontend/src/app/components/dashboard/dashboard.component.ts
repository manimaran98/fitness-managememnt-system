import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { JwtService } from '../../service/jwt.service';
import { Member } from '../../Member';
import { HttpErrorResponse } from '@angular/common/http';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  NgForm,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  [x: string]: any;
  message?: string;
  public member: Member | undefined;
  public members: Member[] = [];
  public filteredMembers: Member[] = [];
  public editMember: any = {
    membershipType: '',
    active: '',
  };
  public deleteMember?: Member;
  searchKey: any;
  isLoggedIn = false;
  memberForm!: FormGroup;

  public addImageUrl: any = 'https://www.w3schools.com/howto/img_avatar.png';

  constructor(private jwtService: JwtService, private router: Router) {
    this.memberForm = new FormGroup({
      imageUrl: new FormControl(this.addImageUrl),
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      membershipType: new FormControl('', Validators.required),
      active: new FormControl('', Validators.required),
      dateJoined: new FormControl(new Date().toISOString().split('T')[0]), // Default to today
    });
  }

  ngOnInit() {
    this.getMembers();
    this.loadMembers();
    this.checkLoginStatus();
  }

  checkLoginStatus() {
    this.isLoggedIn = this.jwtService.isLoggedIn();
  }

  logout() {
    this.jwtService.logout();
    this.isLoggedIn = false;
    this.router.navigate(['/login']); // Redirect to login after logout
  }

  private loadMembers(): void {
    this.jwtService.getMember().subscribe(
      (response: Member[]) => {
        this.members = response;
        this.filteredMembers = [...response]; // Default: Show all members
      },
      (error: HttpErrorResponse) => {
        console.error('Error fetching members:', error);
        alert(error.message);
      }
    );
  }

  public getMembers(key: string = ''): void {
    this.jwtService.getMember().subscribe(
      (response: Member[]) => {
        this.members = response;
        this.filteredMembers = key
          ? this.members.filter((member) =>
              member.name.toLowerCase().includes(key.toLowerCase())
            )
          : [...this.members];
      },
      (error: HttpErrorResponse) => {
        console.error('Error fetching members:', error);
        alert(error.message);
      }
    );
  }

  public onAddMember(form: FormGroup): void {
    this.jwtService.addMember(form.value).subscribe(
      (response: Member) => {
        response;
        this.getMembers();
        form.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        form.reset();
      }
    );
  }

  public onUpdateMember(member?: Member): void {
    if (!member) {
      console.error('Member is undefined.');
      return;
    }

    this.jwtService.updateMember(member).subscribe(
      (response: Member) => {
        response;
        this.getMembers();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeleteMember(memberId?: number): void {
    if (memberId === undefined) {
      console.error('Cannot delete member. ID is undefined.');
      return;
    }
    this.jwtService.deleteMember(memberId).subscribe(
      () => {
        `Deleted member with ID: ${memberId}`;
        this.getMembers();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onOpenModal(member: Member | null, mode: string): void {
    if (mode === 'edit' && !member) {
      console.error('Error: No member provided for editing.');
      return;
    }

    let modalId = '';

    if (mode === 'add') {
      modalId = 'addMemberModal';
    } else if (mode === 'edit') {
      this.editMember = member!;
      modalId = 'editMemberModal';
    } else if (mode === 'delete') {
      this.deleteMember = member!;
      modalId = 'deleteMemberModal';
    }

    if (modalId) {
      const modalElement = document.getElementById(modalId);
      if (modalElement) {
        const modalInstance = new bootstrap.Modal(modalElement);
        modalInstance.show();
      } else {
        console.error(`Modal with ID '${modalId}' not found.`);
      }
    }
  }
}
