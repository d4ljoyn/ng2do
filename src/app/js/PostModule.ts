import { NgModule }      from "@angular/core";
import { HttpModule } from "@angular/http";
import { BrowserModule } from "@angular/platform-browser";
import { PostComponent }   from "./PostComponent";
import { HtmlEntitiesTransform } from "./HtmlEntitiesTransform";
@NgModule({
  imports:      [ BrowserModule, HttpModule ],
  providers: [],
  declarations: [ PostComponent, HtmlEntitiesTransform ],
  bootstrap:    [ PostComponent ]
})
export class PostModule { }

