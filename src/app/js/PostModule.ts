import { NgModule }      from "@angular/core";
import { HttpModule } from "@angular/http";
import { BrowserModule } from "@angular/platform-browser";
import { PostComponent }   from "./PostComponent";
@NgModule({
  imports:      [ BrowserModule, HttpModule ],
  providers: [],
  declarations: [ PostComponent ],
  bootstrap:    [ PostComponent ]
})
export class PostModule { }

