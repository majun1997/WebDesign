import { MemberService } from './../../services/member.service';
import { Member } from './../../models/members';
import { Component, OnInit, Input } from '@angular/core';
import { NbAuthService, NbAuthJWTToken } from '@nebular/auth';
import {artwork} from '../../models/artworkmodel'
import videojs from "video.js"
import { NbSidebarModule, NbLayoutModule, NbButtonModule } from '@nebular/theme';
import {ArtworksService} from '../../services/artworks.service'
import {Router} from '@angular/router'
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-member-space',
  templateUrl: './member-space.component.html',
  styleUrls: ['./member-space.component.scss']
})
export class MemberSpaceComponent implements OnInit {

  @Input() myProfile: Member = {
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
  artworklist:Array<artwork>;
  constructor(private router: Router,public sanitizer: DomSanitizer,private memberService: MemberService, private authService: NbAuthService,private listservice:ArtworksService) {
    this.authService.onTokenChange()
    .subscribe((token: NbAuthJWTToken) => {
      if (token.isValid()) {
        this.requestID = token.getPayload()._id;
        this.getmywork(this.requestID)
      }
    });
    
  }

  ngOnInit() {
    this.getMyProfile();
    
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
  getMyProfile(): void {
    this.memberService.getMemberInfo(this.requestID)
      .subscribe(memberInfo => this.myProfile = memberInfo);
  }
  getmywork(id:string):void{
    this.listservice.getAuthArtwork(id).toPromise().then(artworklist=>this.artworklist=artworklist)
  }
  deleteartwork(artwork:artwork):void{
    console.log(artwork.artworkdetail.url.replace("http://localhost:3000/","./"))
    this.artworklist.splice(this.artworklist.indexOf(artwork),1);
    this.listservice.deleteartwork(artwork).toPromise().then();
  }
}
