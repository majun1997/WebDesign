import { Router, NavigationEnd } from '@angular/router';
import { MemberService } from './../../services/member.service';
import { Member } from './../../models/members';
import { NbAuthService, NbAuthJWTToken } from '@nebular/auth';
import { Component, OnInit, Inject } from '@angular/core';
import { ChangeDetectionStrategy} from '@angular/core';
import { NbMenuService } from '@nebular/theme';
import { filter, map } from 'rxjs/operators';
import { ChangeDetectorRef } from '@angular/core';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  items = [
    {
      title: 'Profile',
      icon: 'person-outline',
      link: '/pages/profile',
    },
    {
      title: 'Logout',
      icon: 'unlock-outline',
      link: '/auth/logout',
    },
  ];

  member: Member = {
    favorites:[],
    id: '',
    name: '',
    email: '',
    password: '',
    bio: '',
    profileImg: '',
    location: '',
   follower:[],
   following:[]
  };

  memberID: string;
  tabs: any[] = [
    {
      title: 'Home',
      route: '/pages/artworks',
      icon: 'home',
      responsive: true,
    },
    {
      title: 'My Space',
      route: `/pages/member-space`,
    },
    {
      title: 'Social',
      route: '/pages/social',
    },
    {
      title: 'Favorites',
      route: '/pages/favorites',
    },
  ];


  constructor(
    private nbMenuService: NbMenuService,
    private authService: NbAuthService,
    private memberService: MemberService,
    private router: Router,
    ) {
    this.authService.onTokenChange()
    .subscribe((token: NbAuthJWTToken) => {

      if (token.isValid()) {
        this.memberID = token.getPayload()._id; // here we receive a payload from the token and assigns it to our `user` variable
      }

    });

    this.router.events
    .pipe(
      filter((event) => event instanceof NavigationEnd)
    )
    .subscribe((event: NavigationEnd) => {
      this.getUserInfo();
    });
  }

  ngOnInit() {
  }

  getUserInfo(): void {
    this.memberService.getMemberInfo(this.memberID)
      .subscribe(memberInfo => this.member = memberInfo);
  }

}
