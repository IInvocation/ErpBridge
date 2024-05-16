import {Component, Injectable} from '@angular/core';
import {MatPaginatorIntl, MatPaginatorModule} from '@angular/material/paginator';
import {Subject} from 'rxjs';

@Injectable()
export class GerPaginatorIntl implements MatPaginatorIntl {
  changes = new Subject<void>();

  // For internationalization, the `$localize` function from
  // the `@angular/localize` package can be used.
  firstPageLabel = $localize`Erste Seite`;
  itemsPerPageLabel = $localize`Einträge pro Seite:`;
  lastPageLabel = $localize`Letzte Seite`;

  // You can set labels to an arbitrary string too, or dynamically compute
  // it through other third-party internationalization libraries.
  nextPageLabel = 'Nächste Seite';
  previousPageLabel = 'Vorherige Seite';

  getRangeLabel(page: number, pageSize: number, length: number): string {
    if (length === 0) {
      return $localize`Seite 1 von 1`;
    }
    const amountPages = Math.ceil(length / pageSize);
    return $localize`Seite ${page + 1} von ${amountPages}`;
  }
}