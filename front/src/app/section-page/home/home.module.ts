import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsItemModule } from '../../components/atoms/news-item/news-item.module';
import { HomeRoutingModule } from './home-routing.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, HomeRoutingModule, NewsItemModule],
})
export class HomeModule {}
