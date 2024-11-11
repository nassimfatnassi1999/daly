import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SignupComponent } from './components/signup/signup.component';
import { ContactComponent } from './components/contact/contact.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { RestaurantComponent } from './components/restaurant/restaurant.component';
import { MenuComponent } from './components/menu/menu.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { RegisterFormComponent } from './components/register-form/register-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatExpansionModule } from '@angular/material/expansion';
import { AuthInterceptorService } from './services/Auth/auth-interceptor.service';
import { MatDialogModule } from '@angular/material/dialog';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component'; 
import { NewsComponent } from './components/nassim/news/news.component';
import { AddNewsComponent } from './components/nassim/add-news/add-news.component';
import { AdminComponent } from './components/admin/admin.component';
import { AddAllergieComponent } from './components/achref-allergie/add-allergie/add-allergie.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { DetailAllergieComponent } from './components/achref-allergie/detail-allergie/detail-allergie.component';
import { FindFeedbackComponent } from './components/aladin-feedback/find-feedback/find-feedback.component';
import { GetFeedbackComponent } from './components/aladin-feedback/get-feedback/get-feedback.component';
import { AddFeedbackComponent } from './components/aladin-feedback/add-feedback/add-feedback.component';
import { MatIconModule } from '@angular/material/icon';
import { AllergyAdminComponent } from './components/achref-allergie/allergy-admin/allergy-admin.component';
import { UserAdminComponent } from './components/admin/user-admin/user-admin.component';
import { ListcontactComponent } from './components/admin/contact-Admin/listcontact/listcontact.component';
import { AddEventComponent } from './components/noursine-event/add-event/add-event.component';
import { ListEventComponent } from './components/noursine-event/list-event/list-event.component';
import { ListBackEventComponent } from './components/noursine-event/list-back-event/list-back-event.component';
import { EventUpdateFormComponent } from './components/noursine-event/event-update-form/event-update-form.component';
import { DetailseventfrontComponent } from './components/noursine-event/detailseventfront/detailseventfront.component';
import { UserFeedbackComponent } from './components/aladin-feedback/user-feedback/user-feedback.component';
import { UsercrudFeedbackComponent } from './components/aladin-feedback/usercrud-feedback/usercrud-feedback.component';
import { NewsAdminComponent } from './components/nassim/news-admin/news-admin.component';
import { RestaurantListComponent } from './components/admin/restaurant-list/restaurant-list.component';
import { RestaurantDetailsComponent } from './components/admin/restaurant-details/restaurant-details.component';
import { RestaurantCreateComponent } from './components/admin/restaurant-create/restaurant-create.component';
import { RestaurantEditComponent } from './components/admin/restaurant-edit/restaurant-edit.component';
import { SafeUrlPipe } from './services/SafeUrlPipe';
import { DishDetailsComponent } from './components/admin/dish-details/dish-details.component';
import { DishEditComponent } from './components/admin/dish-edit/dish-edit.component';
import { DishListComponent } from './components/admin/dish-list/dish-list.component'; 
import { ToastrModule } from 'ngx-toastr';
import { AddDishComponent } from './components/admin/add-dish/add-dish.component';
import { CancelComponent } from './components/stripe/cancel/cancel.component';
import { SuccessComponent } from './components/stripe/success/success.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CheckoutComponent } from './components/stripe/checkout/checkout.component';
import { OrdersComponent } from './components/admin/orders/orders.component';
import { RestaurantStatisticsComponent } from './components/statistics/restaurant-statistics/restaurant-statistics.component';
import { DishCreateComponent } from './components/admin/dish-create/dish-create.component';
import { CommonModule } from '@angular/common';
import { OrderListComponent } from './components/order-list/order-list.component';
import { HomeForumComponent } from './components/forum-compo/home-forum/home-forum.component';
import { EventUpdateModalComponent } from './components/noursine-event/event-update-modal/event-update-modal.component';


import { PostComponent } from './components/forum-compo/post/post.component';
import { CreatePostComponent } from './components/forum-compo/create-post/create-post.component';
@NgModule({
  declarations: [
    LoginFormComponent,
    RegisterFormComponent,
    ResetPasswordComponent,
    AddAllergieComponent,
    DetailAllergieComponent,
    AllergyAdminComponent,
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    SignupComponent,
    ContactComponent,
    NotFoundComponent,
    AddAllergieComponent,
    DetailAllergieComponent,
    AddFeedbackComponent,
    GetFeedbackComponent,
    FindFeedbackComponent,
    AddNewsComponent,
    NewsComponent,
    MenuComponent,
    LoginFormComponent,
    RegisterFormComponent,
    ResetPasswordComponent,

    AllergyAdminComponent,
    AddEventComponent,
    ListEventComponent,
    ListBackEventComponent,
    EventUpdateFormComponent,
    DetailseventfrontComponent,
    UserAdminComponent,
    UserFeedbackComponent,
    UsercrudFeedbackComponent,
    ListcontactComponent,
    NewsAdminComponent,
    RestaurantComponent,
    OrderListComponent,
    AdminComponent,
    RestaurantListComponent,
    RestaurantDetailsComponent,
    RestaurantCreateComponent,
    RestaurantEditComponent,
    SafeUrlPipe,
    DishCreateComponent,
    DishDetailsComponent,
    DishEditComponent,
    DishListComponent,
    AddDishComponent,
    CancelComponent,
    SuccessComponent,
    CheckoutComponent,
    OrdersComponent,
    RestaurantStatisticsComponent,
    HomeForumComponent,
    PostComponent,
    CreatePostComponent,
    EventUpdateModalComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatExpansionModule,
    MatDialogModule,
    MatIconModule,
    AppRoutingModule,
    NgxPaginationModule,   
    MatCardModule,
    MatButtonModule,
    ToastrModule.forRoot(),
    CommonModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
