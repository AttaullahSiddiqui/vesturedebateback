import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: "sortStores" })
export class SortStoresPipe implements PipeTransform {
  transform(value: any, args: Number): any {
    return value.sort((a, b) => {
      return a.key - b.key;
      // return (a.value.name - b.value.name);
    });
  }
}
