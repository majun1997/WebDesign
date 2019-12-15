import { NbToastrService } from '@nebular/theme';
import { environment } from './../../../environments/environment';
import { ArtworksService } from './../../services/artworks.service';
import { artwork, artworkdetail } from './../../models/artworkmodel';
import { Component, OnInit, Input } from '@angular/core';
import { NbAuthService, NbAuthJWTToken } from '@nebular/auth';
import { UploadService } from './../../services/upload.service';
import { MemberService } from './../../services/member.service';
import { Member } from './../../models/members';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable, fromEvent } from 'rxjs';
import { map, debounceTime, distinctUntilChanged } from 'rxjs/operators';

/**
 *
 *
 * @export
 * @class ArtworkUploadComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-artwork-upload',
  templateUrl: './artwork-upload.component.html',
  styleUrls: ['./artwork-upload.component.scss']
})
export class ArtworkUploadComponent implements OnInit {
  @Input() newPictureDetail: artworkdetail = {
    url: '', // link
    artworktype: 'input-photo', // (support) youtube,local video,photo
    poster: '', // the cover
  };

  @Input() newPicture: artwork = {
    id: '',
    name: '',
    createdate: new Date(),
    description: '',
    auth: '', // author
    artworkdetail: this.newPictureDetail,
    like: [], // likes members' id
    comments: [],
  };

  /*****************************************************/

  @Input() newVideoDetail: artworkdetail = {
    url: '', // link
    artworktype: 'input-youtube', // (support) youtube,local video,photo
    poster: '', // the cover
  };

  @Input() newVideo: artwork = {
    id: '',
    name: '',
    createdate: new Date(),
    description: '',
    auth: '', // author
    artworkdetail: this.newVideoDetail,
    like: [], // likes members' id
    comments: [],
  };

  requestID: string;
  previewUrl = `${environment.serverBaseURL}/images/cloud-upload-outline.png`;


  constructor(
    private toastrService: NbToastrService,
    private authService: NbAuthService,
    private uploadService: UploadService,
    private artworksService: ArtworksService,
    private route: ActivatedRoute,
    private location: Location
  ) {
    this.authService.onTokenChange()
      .subscribe((token: NbAuthJWTToken) => {
        if (token.isValid()) {
          this.requestID = token.getPayload()._id;
        }
      });
  }

  ngOnInit() {
  }

  goBack(): void {
    this.location.back();
  }

  showToast(position, status) {
    this.toastrService.show(
      status || 'Success',
      `Upload Success`,
      { position, status });
  }

  publishToast(position, status) {
    this.toastrService.show(
      status || 'Success',
      `Publish Success!`,
      { position, status });
  }

  errorToast(position, status) {
    this.toastrService.show(
      status,
      `Please fill every Blank`,
      { position, status });
  }

  /**
   *
   *
   * @param {artwork} newArtwork
   * @memberof ArtworkUploadComponent
   */
  publishArtwork(newArtwork: artwork): void {
    newArtwork.auth = this.requestID;
    if(!(newArtwork.name && newArtwork.description && newArtwork.artworkdetail.url)){
      this.errorToast('top-up', 'danger');
      return;
    }
    this.artworksService.publishArtwork(newArtwork)
      .subscribe(res => {
        if (res.msg === 'OK') {
          this.goBack();
          this.publishToast('top-up', 'success');
        }
      });
  }

  /**
   *
   *
   * @param {*} event
   * @memberof ArtworkUploadComponent
   */
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
      // replace blank
      postData.name = postData.name.replace(/\s/g,"&nbsp;");
      // get base64
      postData.base64 = a.result as string;
      // upload the image

      this.uploadService.uploadArtworkPic(postData)
        .subscribe(res => {
          if (res.code === 0) {
            // success code
            if (this.previewUrl !== `${environment.serverBaseURL}/images/cloud-upload-outline.png`) {
              this.uploadService.delete(this.previewUrl).toPromise().then();
            }
            this.showToast('top-up', 'success');
            this.newPictureDetail.url = res.data.url;
            this.previewUrl = res.data.url;
          } else {
            // err code
          }
        });
    };
    a.readAsDataURL(imgFile);
  }

}
