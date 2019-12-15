import { UploadService } from './../../services/upload.service';
import { MemberService } from './../../services/member.service';
import { Member } from './../../models/members';
import { Component, OnInit, Input } from '@angular/core';
import { NbAuthService, NbAuthJWTToken } from '@nebular/auth';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { NbToastrService } from '@nebular/theme';


@Component({
  selector: 'app-member-profile-edit',
  templateUrl: './member-profile-edit.component.html',
  styleUrls: ['./member-profile-edit.component.scss']
})
export class MemberProfileEditComponent implements OnInit {
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
  titleName: string;
  titleImg: string;

  constructor(
    private toastrService: NbToastrService,
    private memberService: MemberService,
    private authService: NbAuthService,
    private uploadService: UploadService,
    private route: ActivatedRoute,
    private location: Location) {

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
      .subscribe(memberInfo => {
        this.myProfile = memberInfo;
        this.titleName = memberInfo.name;
        this.titleImg = memberInfo.profileImg;
      });
  }

  updateMyProfile(): void {
    this.memberService.updateProfile(this.myProfile)
      .subscribe(res => {
        if (res.msg === 'OK') {
          this.goBack();
          this.showToast('top-right', 'success');
        }
      });
  }

  goBack(): void {
    this.location.back();
  }

  showToast(position, status) {
    this.toastrService.show(
      status || 'Success',
      `Update Success`,
      { position, status });
  }

  failToast(position, status) {
    this.toastrService.show(
      status,
      `Update Fail`,
      { position, status });
  }

  uploadImg(event) {
    const imgFile: File = event.target.files[0];
    // post data
    const postData = {
      name: imgFile.name,
      size: imgFile.size,
      type: imgFile.type,
      base64: ''
    };
    const a = new FileReader();
    a.onload = (e) => {
      // get base64
      postData.base64 = a.result as string;
      // upload the image
      this.uploadService.uploadImage(postData)
        .subscribe(res => {
          if (res.code === 0) {
            // success code
            this.showToast('top-right', 'success');
            this.myProfile.profileImg = res.data.url;
          } else {
            // err code
            this.failToast('top-right', 'danger')
          }
        });
    };
    a.readAsDataURL(imgFile);
  }
}
