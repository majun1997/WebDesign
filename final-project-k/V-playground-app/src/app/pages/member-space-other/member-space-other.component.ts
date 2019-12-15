import { MemberService } from './../../services/member.service';
import { Member } from './../../models/members';
import { Component, OnInit, Input } from '@angular/core';
import { NbAuthService, NbAuthJWTToken } from '@nebular/auth';
import {artwork} from '../../models/artworkmodel'
import videojs from "video.js"
import { NbSidebarModule, NbLayoutModule, NbButtonModule } from '@nebular/theme';
import {ArtworksService} from '../../services/artworks.service'
import {Router, ActivatedRoute} from '@angular/router'
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-member-space-other',
  templateUrl: './member-space-other.component.html',
  styleUrls: ['./member-space-other.component.scss']
})
export class MemberSpaceOtherComponent implements OnInit {
  flag:boolean;
  @Input() memberProfile: Member = {
    id: '',
    name: '',
    email: '',
    password: '',
    bio: '',
    profileImg: '',
    location: '',
    follower:[] ,
    following:[],
    favorites:[],
  };
  requestID: string;
  memberID: string;
  following_email:Array<string>;
  artworklist:Array<artwork>;
  constructor (private router: Router,
    private activatedRoute: ActivatedRoute,
    public sanitizer: DomSanitizer,
    private memberService: MemberService,
    private authService: NbAuthService,
    private listservice:ArtworksService) {
    this.following_email=new Array();
    this.flag=true;
    activatedRoute.queryParams.subscribe(queryParams => {
      this.memberID = queryParams.id;
      });

    this.authService.onTokenChange()
    .subscribe((token: NbAuthJWTToken) => {
      if (token.isValid()) {
        this.requestID = token.getPayload()._id;
      }
    });
    this.memberService.getMemberInfo(this.requestID)
    .subscribe(memberInfo => {

memberInfo.following.forEach(item => {
        this.memberService.getMemberInfo(item).subscribe(memberInfo => {
          //  this.follower_info.push(memberInfo);
          // this.follower_name.push(memberInfo.name);

          this.following_email.push(memberInfo.email)
        
        this.memberService.getMemberInfo(this.memberID).subscribe(otherInfo=>{
          console.log(this.following_email);
         if (this.following_email.includes(otherInfo.email)) {
            this.flag = false;
          } else {
            this.flag = true;
          }
        console.log(this.flag);
        })
        })
    })}

  )}

  ngOnInit() {
    this.getMemberProfile();
    this.getmywork(this.memberID);

  }

  handleclick(id:string){

    this.router.navigate([`pages/artworks/${id}`], {
      queryParams: {
        id: id
      }
    });

  }
  getTrustedYouTubeUrl(linkedVideo:string) {
    linkedVideo=linkedVideo.replace('watch?v=', 'embed/');
    return this.sanitizer.bypassSecurityTrustResourceUrl(linkedVideo);
  }
  getMemberProfile(): void {
    this.memberService.getMemberInfo(this.memberID)
      .subscribe(memberInfo => this.memberProfile = memberInfo);
  }
  getmywork(id:string):void{
    this.listservice.getAuthArtwork(id).toPromise().then(artworklist=>this.artworklist=artworklist)
  }
  addfollowing() {
    //     console.log(this.Author.id);
    this.memberService.getMemberInfo(this.memberID).subscribe(memberInfo=>{

      this.memberService.addFollowing(memberInfo).subscribe(res => {
       if (res.msg === 'OK') {
         this.flag = false;
       }
     }

  )})
    //  console.log(this.memberID);
    // console.log(this.Author.id);

  }
  unfollowing() {
    //     console.log(this.Author.id);
     this.memberService.getMemberInfo(this.memberID).subscribe(memberInfo=>{

         this.memberService.unFollowing(memberInfo).subscribe(res => {
          if (res.msg === 'OK') {
             this.flag=true;
          }
        }

     )}


     )


     }

}



