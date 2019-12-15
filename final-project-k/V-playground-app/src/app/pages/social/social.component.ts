import { MemberService } from './../../services/member.service';
import { Member } from './../../models/members';
import { Component, OnInit, Input } from '@angular/core';
import { NbAuthService, NbAuthJWTToken } from '@nebular/auth';
import { Location } from '@angular/common';
import { ActivatedRoute,Router } from '@angular/router';
import { NbSidebarService } from '@nebular/theme';
@Component({
  selector: 'app-social',
  templateUrl: './social.component.html',
  styleUrls: ['./social.component.scss']
})
export class SocialComponent implements OnInit {
  @Input() myProfile: Member = {
    favorites:[],
    id:"",
    name: '',
    email: '',
    password: '',
    bio: '',
    profileImg: '',
    location: '',
    follower:[],
    following:[]
  };
  requestID: string;
  titleName: string;
  titleImg: string;
  follower:[];
  following:[];
  public test=["YUCHEN","nihao","wohao"];
  follower_name:Array<string>;
  following_name:Array<string>;
  follower_info:Array<Member>;
  following_info:Array<Member>;
  following_info1:Array<Member>;
  following_name1:Array<string>;
  following1_name: string[];
  constructor(
    private memberService: MemberService,
    private authService: NbAuthService,
    private route: ActivatedRoute,
    private location: Location,
    private sidebarService: NbSidebarService,
    private router: Router,
    ) {
     this.follower_name=new Array;
     this.follower_info=new Array;
     this.following_name=new Array;
     this.following_info=new Array;
     this.following_name1=new Array;
    this.authService.onTokenChange()
    .subscribe((token: NbAuthJWTToken) => {
      if (token.isValid()) {
        this.requestID = token.getPayload()._id;
      }
    });
  }

  ngOnInit() {
   this.getMyFollow();


  }
 getMyFollow(): void {
    this.memberService.getMemberInfo(this.requestID)
      .subscribe(memberInfo => {
        this.myProfile = memberInfo;
        this.titleName = memberInfo.name;
        this.titleImg = memberInfo.profileImg;
        this.follower=memberInfo.follower;
        this.following=memberInfo.following;
      this.follower.forEach(item => {

        this.memberService.getMemberInfo(item).subscribe(memberInfo=>{
                this.follower_info.push(memberInfo);
                this.follower_name.push(memberInfo.name);

              })

       // console.log(this.follower);
       // console.log(this.following);
      });
    this.following.forEach(item=>{
      this.memberService.getMemberInfo(item).subscribe(memberInfo=>{
      //  this.follower_info.push(memberInfo);
      // this.follower_name.push(memberInfo.name);
        this.following_info.push(memberInfo);
        this.following_name.push(memberInfo.name)
       this.following1_name=Array.from(new Set(this.following_name))

      })




});




    })}

  //getMyFollowerName():void{

    //this.follower.forEach(item => {

      //  this.memberService.getMemberInfo(item).subscribe(memberInfo=>{
        //        this.follower_name.push(memberInfo.name);
          //   }
        //)});

        gotomember(id:string){

          this.router.navigate([`pages/other-space/${id}`], {
            queryParams: {
              id: id
            }
          });

        }

     getMyFollowName():void {
      this.follower.forEach(item => {

        this.memberService.getMemberInfo(item).subscribe(memberInfo=>{
                  this.follower_name.push(memberInfo.name);
                  console.log(this.follower_name);
                })
            }
      )}}




  //getMyFollowingName():void{
  // this.following_name=["WangTao"];
   //this.following.forEach(item => {

     //this.memberService.getMemberInfo(item).subscribe(memberInfo=>{
     //        this.following_name.push(memberInfo.name);

       //     }
  //   )});
