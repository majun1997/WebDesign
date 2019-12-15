import { clipPipe } from './../pipe/common.pipe';

import { NbUserModule, NbTabsetModule, NbMenuModule, NbRouteTabsetModule, NbContextMenuComponent, NbContextMenuModule, NbInputModule, NbActionsComponent, NbActionsModule, NbTooltipModule, NbToastComponent } from '@nebular/theme';
import { NbLayoutModule,NbCardModule } from '@nebular/theme';
// basic
import { NavbarComponent } from './navbar/navbar.component';
import { PagesRoutingModule } from './pages-routing.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { SocialComponent } from './social/social.component';
import { ArtworksComponent } from './artworks/artworks.component';
import { ArtworkdetailComponent } from './artworkdetail/artworkdetail.component'
import { NbEvaIconsModule  } from '@nebular/eva-icons';
import { NbIconModule } from '@nebular/theme';
import { NbSidebarModule, NbButtonModule,NbListModule  } from '@nebular/theme';
import { NbIconConfig } from '@nebular/theme';

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MemberSpaceComponent } from './member-space/member-space.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { MemberProfileComponent } from './member-profile/member-profile.component';
import { MemberProfileEditComponent } from './member-profile-edit/member-profile-edit.component';
import { ArtworkpipeComponent } from './artworkpipe/artworkpipe.component';
import { ArtworkUploadComponent } from './artwork-upload/artwork-upload.component';
import { PatatapComponent } from './patatap/patatap.component';

import { SharedModule } from "./artworkpipe/shared.module";
import { CommentComponent } from './artworkdetail/comment/comment.component';
import { MemberSpaceOtherComponent } from './member-space-other/member-space-other.component';
import { ChatComponent } from './member-profile/chat/chat.component';


@NgModule({
  imports: [

    NbButtonModule,
    NbListModule,
    CommonModule,
    FormsModule,
    RouterModule,
    PagesRoutingModule,
    NbLayoutModule,
    NbUserModule,
    NbCardModule,
    NbEvaIconsModule,
    NbIconModule,
    NbInputModule,
    NbSidebarModule.forRoot(),
    NbButtonModule,
    NbTabsetModule,
    NbMenuModule.forRoot(),
    NbSidebarModule,
    NbRouteTabsetModule,
    NbContextMenuModule,
    NbSidebarModule,
    NbTooltipModule,

    NbInputModule,
    NbButtonModule,
    NbActionsModule,
    SharedModule,

  ],
  declarations: [

    //ArtworkpipeComponent,
    NavbarComponent,
    SocialComponent,
    ArtworksComponent,
    ArtworkdetailComponent,
    MemberSpaceComponent,
    FavoritesComponent,
    MemberProfileComponent,
    MemberProfileEditComponent,
    ArtworkUploadComponent,
    PatatapComponent,
    CommentComponent,
    MemberSpaceOtherComponent,
    clipPipe,
    ChatComponent,
  ],
})
export class PagesModule {
}
