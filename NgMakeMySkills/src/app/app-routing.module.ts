import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './Components/Home/home.component';
import { NotFoundComponent } from './Components/Common/not-found.component';
import { CreateTestComponent } from './Components/Test/create-test.component';
import { UpdateTestComponent } from './Components/Test/update-test.component';
import { PublishTestComponent } from './Components/Test/publish-test.component';
import { UserHomeComponent } from './Components/Users/user-home.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'create-test', component: CreateTestComponent },
  { path: 'update-test', component: UpdateTestComponent },
  { path: 'publish-test', component: PublishTestComponent },
  { path: 'user-home', component: UserHomeComponent },
  { path: 'not-found', component: NotFoundComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
