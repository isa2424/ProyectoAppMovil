import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StarRatingPageModule } from './Components/star-rating/star-rating/star-rating.module';



@NgModule({
  imports: [StarRatingPageModule],
  exports: [StarRatingPageModule]
})
export class StarModule { }
