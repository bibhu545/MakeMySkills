import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './Components/Home/home.component';
import { NotFoundComponent } from './Components/Common/not-found.component';
import { CreateTestComponent } from './Components/Test/create-test.component';
import { UpdateTestComponent } from './Components/Test/update-test.component';
import { PublishTestComponent } from './Components/Test/publish-test.component';
import { UserHomeComponent } from './Components/Users/user-home.component';
import { OnlineTestComponent } from './Components/OnlineTest/online-test.component';
import { RouteGuardService } from './Services/route-guard.service';
import { AdminDashboardComponent } from './Components/Admin/admin-dashboard/admin-dashboard.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'create-test', component: CreateTestComponent, canActivate: [RouteGuardService] },
  { path: 'update-test/:testGuid', component: UpdateTestComponent },
  { path: 'publish-test', component: PublishTestComponent },
  { path: 'user-home', component: UserHomeComponent },
  { path: 'online-test', component: OnlineTestComponent },
  { path: 'admin', component: AdminDashboardComponent },
  { path: 'not-found', component: NotFoundComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
