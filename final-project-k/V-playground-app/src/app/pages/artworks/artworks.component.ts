import { Component, OnInit,ChangeDetectionStrategy  } from '@angular/core';
import {artwork} from '../../models/artworkmodel'
import videojs from "video.js"
import { NbSidebarModule, NbLayoutModule, NbButtonModule } from '@nebular/theme';
import {ArtworksService} from '../../services/artworks.service'
import {Router} from '@angular/router'
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-artworks',
  templateUrl: './artworks.component.html',
  styleUrls: ['./artworks.component.scss'],
  
})

/**
 * @auth junma
 * @init input array<artworks>
 * @artworks
 */
export class ArtworksComponent implements OnInit {
  artworklist:Array<artwork>

  constructor(private listServices:ArtworksService,private router: Router,public sanitizer: DomSanitizer) {
    


  }
 

  ngOnInit() {
    this.listServices.list().toPromise().then(artworklist=>{this.artworklist=artworklist;
    console.log(this.artworklist)});
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
