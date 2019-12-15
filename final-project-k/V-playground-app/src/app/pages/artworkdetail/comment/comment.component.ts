import { Component, OnInit, Input } from '@angular/core';
import { artwork, comment } from 'src/app/models/artworkmodel';
import { Member } from 'src/app/models/members';
import { displaycomment } from '../artworkdetail.component'
import { ArtworksService } from 'src/app/services/artworks.service';
import { stringify } from 'querystring';
@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {

  constructor() {
    this.displaycomment = new Array();
  }
  @Input() artwork: artwork;
  @Input() memberID: string;
  @Input() member: Member;
  @Input() commentsUser: Array<Member>;
  @Input() listServices: ArtworksService;
  displaycomment: Array<displaycomment>;
  ngOnInit() {

  }
  ngOnChanges() {
    this.getcomment(this.artwork);
    console.log(this.artwork)
  }
  submitcommenttest() {
    console.log(document.getElementById("input-content").textContent)
  }

  submitcomment() {
    console.log()
    let com = { "comid": this.memberID, "comment": document.getElementById("input-content").textContent } as comment
    document.getElementById("input-content").textContent = ``
    this.artwork.comments.push(com)
    this.commentsUser.push(this.member)
    this.listServices.update_artwork(this.artwork).toPromise().then()
    this.displaycomment.length = 0
    this.getcomment(this.artwork)
  }
  getcomment(artwork: artwork) {
    console.log(artwork)
    for (let comment of artwork.comments) {
      //console.log(comment.comid)
      this.listServices.getAuthor(comment.comid).toPromise().then(member => {
        let com = { "member": member, "comment": comment.comment } as displaycomment
        this.displaycomment.push(com)
      })

    }
  }

}
