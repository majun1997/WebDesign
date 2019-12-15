
import { MemberSpaceOtherComponent } from './member-space-other/member-space-other.component';
import { PatatapComponent } from './patatap/patatap.component';
import { ArtworkUploadComponent } from './artwork-upload/artwork-upload.component';
import { MemberProfileEditComponent } from './member-profile-edit/member-profile-edit.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { MemberProfileComponent } from './member-profile/member-profile.component';
import { MemberSpaceComponent } from './member-space/member-space.component';
import { SocialComponent } from './social/social.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArtworksComponent } from './artworks/artworks.component'
import { ArtworkdetailComponent } from './artworkdetail/artworkdetail.component'
export const routes: Routes = [
  {
    path: '',
    component: NavbarComponent,
    children: [
      {
        path:'',
        component: ArtworksComponent,
      },
      {
        path: 'artworks',
        component: ArtworksComponent,
      },
      {
        path: 'artworks/:id',
        component: ArtworkdetailComponent,
      },
      {
        path: 'upload-artwork',
        component: ArtworkUploadComponent,
      },
      {
        path: 'social',
        component: SocialComponent,
      },
      {
        path: 'favorites',
        component: FavoritesComponent,
      },
      {
        path: 'member-space',
        component: MemberSpaceComponent,
      },
      {
        path: 'other-space/:id',
        component: MemberSpaceOtherComponent,
      },
      {
        path: 'profile',
        component: MemberProfileComponent,
      },
      {
        path: 'profile/edit',
        component: MemberProfileEditComponent,
      },
      {
        path: 'patatap',
        component: PatatapComponent,
      }
    ]
  }
];
@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
