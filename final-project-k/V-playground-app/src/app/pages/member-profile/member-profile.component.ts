import { MemberService } from './../../services/member.service';
import { Member } from './../../models/members';
import { Component, OnInit, Input } from '@angular/core';
import { NbAuthService, NbAuthJWTToken } from '@nebular/auth';

@Component({
  selector: 'app-member-profile',
  templateUrl: './member-profile.component.html',
  styleUrls: ['./member-profile.component.scss']
})
export class MemberProfileComponent implements OnInit {
  @Input() myProfile: Member = {
    id: '',
    name: '',
    email: '',
    password: '',
    bio: '',
    profileImg: '',
    location: '',
   follower:[],
   following:[],
   favorites:[],
  };
  requestID: string;

  constructor(private memberService: MemberService, private authService: NbAuthService) {
    this.authService.onTokenChange()
    .subscribe((token: NbAuthJWTToken) => {
      if (token.isValid()) {
        this.requestID = token.getPayload()._id;
      }
    });
  }

  ngOnInit() {
    this.getMyProfile();
  }

  getMyProfile(): void {
    this.memberService.getMemberInfo(this.requestID)
      .subscribe(memberInfo => this.myProfile = memberInfo);
  }
}
