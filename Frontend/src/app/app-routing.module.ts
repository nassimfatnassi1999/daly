import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeForumComponent } from './components/forum-compo/home-forum/home-forum.component';
import { PostComponent } from './components/forum-compo/post/post.component';
import { CreatePostComponent } from './components/forum-compo/create-post/create-post.component';
import { HomeComponent } from './components/home/home.component';
import { SignupComponent } from './components/signup/signup.component';
import { ContactComponent } from './components/contact/contact.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { MenuComponent } from './components/menu/menu.component';
import { RestaurantComponent } from './components/restaurant/restaurant.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { RegisterFormComponent } from './components/register-form/register-form.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { NewsComponent } from './components/nassim/news/news.component';
import { AddNewsComponent } from './components/nassim/add-news/add-news.component';
import { AddAllergieComponent } from './components/achref-allergie/add-allergie/add-allergie.component';

import { AddFeedbackComponent } from './components/aladin-feedback/add-feedback/add-feedback.component';
import { GetFeedbackComponent } from './components/aladin-feedback/get-feedback/get-feedback.component';
import { FindFeedbackComponent } from './components/aladin-feedback/find-feedback/find-feedback.component';

import { DetailAllergieComponent } from './components/achref-allergie/detail-allergie/detail-allergie.component';


import { AdminComponent } from './components/admin/admin.component';
import { AllergyAdminComponent } from './components/achref-allergie/allergy-admin/allergy-admin.component';
import { AddEventComponent } from './components/noursine-event/add-event/add-event.component';
import { ListEventComponent } from './components/noursine-event/list-event/list-event.component';
import { ListBackEventComponent } from './components/noursine-event/list-back-event/list-back-event.component';
import { EventUpdateFormComponent } from './components/noursine-event/event-update-form/event-update-form.component';
import { DetailseventfrontComponent } from './components/noursine-event/detailseventfront/detailseventfront.component';
import { UserFeedbackComponent } from './components/aladin-feedback/user-feedback/user-feedback.component';
import { UsercrudFeedbackComponent } from './components/aladin-feedback/usercrud-feedback/usercrud-feedback.component';
import { RestaurantListComponent } from './components/admin/restaurant-list/restaurant-list.component';
import { RestaurantDetailsComponent } from './components/admin/restaurant-details/restaurant-details.component';
import { RestaurantCreateComponent } from './components/admin/restaurant-create/restaurant-create.component';
import { RestaurantEditComponent } from './components/admin/restaurant-edit/restaurant-edit.component';
import { AddDishComponent } from './components/admin/add-dish/add-dish.component';
import { DishListComponent } from './components/admin/dish-list/dish-list.component';
import { CancelComponent } from './components/stripe/cancel/cancel.component';
import { SuccessComponent } from './components/stripe/success/success.component';
import { CheckoutComponent } from './components/stripe/checkout/checkout.component';
import { OrdersComponent } from './components/admin/orders/orders.component';
import { DishEditComponent } from './components/admin/dish-edit/dish-edit.component';
import { RestaurantStatisticsComponent } from './components/statistics/restaurant-statistics/restaurant-statistics.component';
import { DishDetailsComponent } from './components/admin/dish-details/dish-details.component';
import { DishCreateComponent } from './components/admin/dish-create/dish-create.component';


const routes: Routes = [
  {path:'', component:HomeComponent},
  {path:'signup', component:SignupComponent},
  {path:'contact', component:ContactComponent},
  { path: '', redirectTo: '/restaurants', pathMatch: 'full' },
  { path: 'restaurants', component: RestaurantComponent },
  { path: 'menu/:id', component: MenuComponent },
  { path: 'login', component: LoginFormComponent },
  { path: 'register', component: RegisterFormComponent },
  { path: 'resetpassword/:token', component: ResetPasswordComponent },
  {path:'news', component:NewsComponent},
  {path:'addNews', component:AddNewsComponent},
  {path:'add-allergie', component:AddAllergieComponent},
  {path:'show-allergie',component:DetailAllergieComponent},
  {path:'add-feedback',component:AddFeedbackComponent},
  {path:'restaurants/add-feedback/:id_restaurant',component:AddFeedbackComponent},
  {path:'get-feedback',component:GetFeedbackComponent},
  {path:'find-feedback',component:FindFeedbackComponent},
  {path:'user-feedback',component:UserFeedbackComponent},
  {path:'usercrud-feedback',component:UsercrudFeedbackComponent},
  { path: '', redirectTo: '/restaurants', pathMatch: 'full' },
  { path: 'restaurants', component: RestaurantComponent },
  { path: 'menu/:id', component: MenuComponent },
  { path: 'login', component: LoginFormComponent },
  { path: 'register', component: RegisterFormComponent },  
  { path: 'admin', component: AdminComponent },
  {path:'addevent', component:AddEventComponent},
  {path:'listevent', component:ListEventComponent},
  {path:'listbackevent', component:ListBackEventComponent},
  { path: 'admin/update/:id', component: EventUpdateFormComponent }, // Route avec un paramètre ":id"
  { path: 'detail/:id', component: DetailseventfrontComponent }, // Route avec un paramètre ":id"
  {path:'admin',component:AdminComponent},
  { path: 'admin/restaurants', component: RestaurantListComponent },
  { path: 'admin/dishes', component: DishListComponent },
  { path: 'admin/dishes/edit/:id', component: DishEditComponent },
  { path: 'admin/dishes/:id', component: DishDetailsComponent },
  { path: 'admin/dish/create', component: DishCreateComponent },
  { path: 'admin/restaurants/create', component: RestaurantCreateComponent },
  { path: 'admin/restaurants/:id', component: RestaurantDetailsComponent },
  { path: 'admin/restaurants/edit/:id', component: RestaurantEditComponent },
    { path: 'admin/restaurants/edit/:id', component: RestaurantEditComponent },
    { path: 'admin/restaurants/:id/addDish', component: AddDishComponent },
    { path: 'admin/orders', component: OrdersComponent },
    {path: 'admin/statistics/restaurants', component: RestaurantStatisticsComponent},
    {
      path: 'checkout',   component: CheckoutComponent,
    },
  { path: 'forum', component: HomeForumComponent },
  { path: 'post/:id', component: PostComponent },
  { path: 'create-post', component: CreatePostComponent },
  // path notfound  (" dima 5alouha louta e5er wa7da et merci ")
    { path: 'cancel', component: CancelComponent },
    { path: 'success', component: SuccessComponent },
  {path:'**', component:NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
