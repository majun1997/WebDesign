import { Component, OnInit,ChangeDetectionStrategy, Input  } from '@angular/core';
import {artwork} from '../../models/artworkmodel'
import videojs from "video.js"
import { NbSidebarModule, NbLayoutModule, NbButtonModule } from '@nebular/theme';
import {ArtworksService} from '../../services/artworks.service'
import {Router, ActivatedRoute} from '@angular/router'
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { MemberService } from './../../services/member.service';
import { Member } from 'src/app/models/members';
import { NbAuthService, NbAuthJWTToken } from '@nebular/auth';
import { Item } from 'paper';
@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})


export class FavoritesComponent implements OnInit {
  id:string
  @Input() member: Member = {
    id:'',
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
  memberID:string;
  artworklist1:Array<artwork>
  artworklist:Array<artwork>
  safeurl:SafeResourceUrl;
  constructor(private listServices:ArtworksService,private router: Router,public sanitizer: DomSanitizer, private authService: NbAuthService,
    private memberServices:MemberService,activatedRoute: ActivatedRoute) {
      this.artworklist1=new Array();
      this.artworklist=new Array();
      activatedRoute.queryParams.subscribe(queryParams => {
        this.id = queryParams.id;
        });
        this.authService.onTokenChange()
        .subscribe((token: NbAuthJWTToken) => {
  
          if (token.isValid()) {
            this.memberID = token.getPayload()._id; // here we receive a payload from the token and assigns it to our `user` variable
          
         
          }
                 
  
  
        });


  }
 

  ngOnInit() {
  
   this.memberServices.getMemberInfo(this.memberID).subscribe(
       (memberInfo)=>{
        
         memberInfo.favorites.forEach((Item)=>{
           
                 this.listServices.getone(Item).subscribe((artwork)=>{
                    this.artworklist1.push(artwork)
                    this.artworklist=Array.from(new Set(this.artworklist1))
                    
                 })
         
         
                })
      
      
      
      })
  
  
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

}
