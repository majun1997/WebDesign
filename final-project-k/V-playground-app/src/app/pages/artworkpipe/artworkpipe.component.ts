import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Pipe({ name: 'ArtworkpipeComponent' })
export class ArtworkpipeComponent implements PipeTransform {
    constructor(private sanitizer:DomSanitizer){

    }
    transform(linkedVideo:string):SafeUrl {
        linkedVideo=linkedVideo.replace('watch?v=', 'embed/');
        return this.sanitizer.bypassSecurityTrustResourceUrl(linkedVideo);
    }
}