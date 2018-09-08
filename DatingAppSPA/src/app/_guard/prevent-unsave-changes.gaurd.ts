import { CanDeactivate } from '@angular/router';
import { MemberEditComponent } from '../member-edit/member-edit.component';
import { Injectable } from '@angular/core';
@Injectable()
export class PreventUnsaveChangesGuard  implements CanDeactivate<MemberEditComponent> {
    canDeactivate(component: MemberEditComponent ) {
        if (component.editForm.dirty) {
            return confirm('Are you sure you want to confirm continue? Any unsaved changed will lost');
        }
        return true;
    }
}
