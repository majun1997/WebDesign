import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { artwork, artworkdetail, comment } from '../../models/artworkmodel';
import { ArtworksService } from '../../services/artworks.service';
import { NbSidebarModule, NbLayoutModule, NbButtonModule,NbToastrService, NbComponentStatus } from '@nebular/theme';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { videojs } from 'video.js'
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { Member } from '../../models/members'
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { NbAuthService, NbAuthJWTToken } from '@nebular/auth';
import { MemberService } from './../../services/member.service';
export interface displaycomment {
  member: Member
  comment: string
}
@Component({
  selector: 'app-artworkdetail',
  templateUrl: './artworkdetail.component.html',
  styleUrls: ['./artworkdetail.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,

})
/**
 * @input from rest: 1.ARTWORK 2.user+artwork
 */

export class ArtworkdetailComponent implements OnInit {
  id: string
  comment: string

  star: string

  flag: boolean
  following_email: Array<string>;

  @Input() newPictureDetail: artworkdetail = {
    url: '', // link
    artworktype: '', // (support) youtube,local video,photo
    poster: '', // the cover
  };

  @Input() artwork: artwork = {
    id: '',
    name: '',
    createdate: new Date(),
    description: '',
    auth: '', // author
    artworkdetail: this.newPictureDetail,
    like: [], // likes members' id
    comments: [],
  };
  displaycomment: Array<displaycomment>
  Author: Member = {
    id: '',
    name: '',
    email: '',
    password: '',
    bio: '',
    profileImg: '',
    location: '',
    follower: [],
    following: [],
    favorites: []
  };;
  safeurl: SafeResourceUrl;
  commentsUser: Array<Member>;
  member: Member = {
    id: '',
    name: '',
    email: '',
    password: '',
    bio: '',
    profileImg: '',
    location: '',
    follower: [],
    following: [],
    favorites: [],
  };
  like: string = 'danger';
  memberID: string;
  following: [];
  authoremail: string;
  constructor(private activatedRoute: ActivatedRoute,
    private router: Router,
    private listServices: ArtworksService,
    public sanitizer: DomSanitizer,
    private authService: NbAuthService,
    private memberServices: MemberService) {
    this.star = "star"
    this.like = "heart"
    this.commentsUser = new Array();
    this.displaycomment = new Array();
    this.flag = true;
    this.following_email = new Array();

    activatedRoute.queryParams.subscribe(queryParams => {
      this.id = queryParams.id;
    });
    this.authService.onTokenChange()
      .subscribe((token: NbAuthJWTToken) => {

        if (token.isValid()) {
          this.memberID = token.getPayload()._id; // here we receive a payload from the token and assigns it to our `user` variable


        }



      });
    this.listServices.getAuthor(this.memberID).toPromise().then(member => {
      this.member = member;


      console.log(member)

      this.listServices.getone(this.id).toPromise().then(artwork => {
        this.artwork = artwork;

        this.getfav(this.member, this.artwork)


        this.listServices.getAuthor(this.artwork.auth).toPromise().then(auth => {

          this.Author = auth;
          this.authoremail = auth.email;
          this.getauthLiked(artwork);
          this.memberServices.getMemberInfo(this.memberID)
            .subscribe(memberInfo => {


              this.following = memberInfo.following;

              this.following.forEach(item => {
                this.memberServices.getMemberInfo(item).subscribe(memberInfo => {
                  //  this.follower_info.push(memberInfo);
                  // this.follower_name.push(memberInfo.name);

                  this.following_email.push(memberInfo.email)


                  if (this.following_email.includes(this.Author.email)) {
                    this.flag = false;
                  } else {
                    this.flag = true;
                  }

                })




              });
            })





        });

      });

    })
  }

  ngOnInit() {


  }
  favourite(): void {

  }
  ngOnChange() {

  }
  setLike() {
    console.log(this.like)
    if (this.like === 'heart-outline') {//like
      this.artwork.like.push(
        this.memberID
      )
      this.listServices.update_artwork(this.artwork).toPromise().then();
      this.like = 'heart'
    }
    else {
      this.artwork.like.splice(this.artwork.like.indexOf(this.memberID), 1);
      this.listServices.update_artwork(this.artwork).toPromise().then();
      this.like = 'heart-outline'
    }
  }
  setfavorite() {
    if (this.star === 'star-outline') {//like
      this.member.favorites.push(this.artwork.id)
      console.log(this.member)
      this.memberServices.updateProfile(this.member).toPromise().then();
      this.star = 'star'
    }
    else {

      this.member.favorites.splice(this.member.favorites.indexOf(this.artwork.id), 1);
      console.log(this.member)
      this.memberServices.updateProfile(this.member).toPromise().then();
      this.star = 'star-outline'
    }
  }
  getauthLiked(artwork: artwork) {
    if (artwork.like.indexOf(this.memberID) >= 0)
      this.like = 'heart'
    else
      this.like = 'heart-outline'
  }
  getfav(member: Member, artwork: artwork) {


    if (member.favorites.indexOf(artwork.id) >= 0)
      this.star = 'star'
    else
      this.star = 'star-outline'

  }
  getTrustedYouTubeUrl(linkedVideo: string) {
    linkedVideo = linkedVideo.replace('watch?v=', 'embed/');
    return this.sanitizer.bypassSecurityTrustResourceUrl(linkedVideo);
  }
  getcomment(artwork: artwork) {

    for (let comment of artwork.comments) {
      //console.log(comment.comid)
      this.listServices.getAuthor(comment.comid).toPromise().then(member => {
        let com = { "member": member, "comment": comment.comment } as displaycomment
        this.displaycomment.push(com)
      })

    }
  }

  addfollowing() {
    //     console.log(this.Author.id);
    this.memberServices.addFollowing(this.Author).subscribe(res => {
      if (res.msg === 'OK') {

      }
    });
    //  console.log(this.memberID);
    // console.log(this.Author.id);
    this.flag = false;
  }
  unfollowing() {
    //     console.log(this.Author.id);
    this.memberServices.unFollowing(this.Author).subscribe(res => {
      if (res.msg === 'OK') {

      }
    });
    //  console.log(this.memberID);
    // console.log(this.Author.id);
    this.flag = true;
  }
  setfavourite() {
    this.memberServices.setFavourite(this.artwork).subscribe(res => {
      if (res.msg === 'OK') {

      }
    });
  }
  unfavourite() {
    this.memberServices.unFavourite(this.artwork).subscribe(res => {
      if (res.msg === 'OK') {

      }
    });
  }
  submitcomment() {
    console.log("update")
    let com = { "comid": this.memberID, "comment": document.getElementById("input-content").textContent } as comment
    this.artwork.comments.push(com)
    this.commentsUser.push(this.member)
    this.listServices.update_artwork(this.artwork).toPromise().then()
    this.ngOnInit();
  }

  getMyFollow(): void {
    this.memberServices.getMemberInfo(this.memberID)
      .subscribe(memberInfo => {


        this.following = memberInfo.following;

        this.following.forEach(item => {
          this.memberServices.getMemberInfo(item).subscribe(memberInfo => {
            //  this.follower_info.push(memberInfo);
            // this.follower_name.push(memberInfo.name);

            this.following_email.push(memberInfo.email)

            if (this.following_email.includes(this.Author.email)) {
              this.flag = false;
            } else {
              this.flag = true;
            }

          })
        });
      })
  }

  gotoMemberSpace(id:string){

    this.router.navigate([`pages/other-space/${id}`], {
      queryParams: {
        id: id
      }
    });

  }
  gotoMyspace(){
    this.router.navigate([`pages/member-space`], {

    });
  }

}
