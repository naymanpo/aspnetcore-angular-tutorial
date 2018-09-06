import { AuthGuard } from './_guard/auth.guard';
import { MemberListComponent } from './member-list/member-list.component';
import { HomeComponent } from './home/home.component';
import { Routes } from '@angular/router';
import { MessageComponent } from './message/message.component';
import { ListsComponent } from './lists/lists.component';

export const appRoutes: Routes = [
    {
        path: 'home' , component: HomeComponent
    } , {
        path: '',
        runGuardsAndResolvers: 'always',
        canActivate: [ AuthGuard ],
        children: [
            {
                path: 'members', component: MemberListComponent, canActivate: [AuthGuard]
            }, {
                path: 'messages', component: MessageComponent
            }, {
                path: 'lists', component: ListsComponent
            }
        ]
    }, {
        path: '**', redirectTo: 'home', pathMatch: 'full'
    }
];
