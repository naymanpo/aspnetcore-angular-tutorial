import { ListsResolver } from './_resolvers/lists.resolver';
import { PreventUnsaveChangesGuard } from './_guard/prevent-unsave-changes.gaurd';
import { MemberEditResolver } from './_resolvers/member-edit.resolver';
import { MemberDetailResolver } from './_resolvers/member-detail.resolver';

import { MemberDetailComponent } from './member-detail/member-detail.component';
import { AuthGuard } from './_guard/auth.guard';
import { MemberListComponent } from './member-list/member-list.component';
import { HomeComponent } from './home/home.component';
import { Routes } from '@angular/router';
import { MessageComponent } from './message/message.component';
import { ListsComponent } from './lists/lists.component';
import { MemberEditComponent } from './member-edit/member-edit.component';
import { MemberListResolver } from './_resolvers/member-list.resolver';

export const appRoutes: Routes = [
    {
        path: 'home' , component: HomeComponent
    } , {
        path: '',
        runGuardsAndResolvers: 'always',
        canActivate: [ AuthGuard ],
        children: [
            { path: '', component: HomeComponent},
            {
                path: 'members', component: MemberListComponent,  resolve: { users: MemberListResolver }
            }, {
                path: 'members/:id', component: MemberDetailComponent, resolve: {user: MemberDetailResolver }
            }, {
                path: 'member/edit', component: MemberEditComponent,
                resolve: {user: MemberEditResolver}, canDeactivate: [PreventUnsaveChangesGuard]
            }, {
                path: 'messages', component: MessageComponent
            }, {
                path: 'lists', component: ListsComponent, resolve: { users: ListsResolver }
            }
        ]
    }, {
        path: '**', redirectTo: 'home', pathMatch: 'full'
    }
];
