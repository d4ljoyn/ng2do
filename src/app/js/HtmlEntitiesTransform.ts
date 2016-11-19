import { Pipe, PipeTransform } from "@angular/core";

@Pipe({name: "htmlEntities"})
export class HtmlEntitiesTransform implements PipeTransform {
  transform(value: string): string {
      return value.replace(/\n/mg, "<br/>");
  }
}
