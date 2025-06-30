import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BooksComponent } from './books/books.component';
import { CollectionComponent } from './collection/collection.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [ 
    {path: "books", component: BooksComponent}, 
    {path: "collection", component: CollectionComponent}, 
    {path: "wishlist", component: WishlistComponent}, 
    {path: "register", component: RegisterComponent}, 
    {path: "login", component: LoginComponent}, 
    {path: "", redirectTo: "login", pathMatch: "full"}, 
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
