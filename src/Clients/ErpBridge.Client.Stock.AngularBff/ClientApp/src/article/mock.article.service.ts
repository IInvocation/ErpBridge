import { Injectable } from '@angular/core';
import { Article } from 'src/models/Article';
import { ModelDataSource } from 'src/datasources/model.datasource';
import { ArticleDataSource } from './article.datasource';
import { MockDataService } from 'src/dataServices/MockDataService';

@Injectable({
  providedIn: 'root'
})
export class ArticleMockService extends MockDataService<Article> {
  override filter(records: Article[], filterValue: string): Article[] {
    return records.filter((article) => article.number.includes(filterValue) || article.name.includes(filterValue));
  }

  getDataSource(): ModelDataSource<Article> {
    return new ArticleDataSource(this);
  }
  
  samples_efk: Article[] = [
    {
      number: "103001",
      name: "GENO-EFK 50 µm",
      description: "GENO-EFK 50 µm mit:\r\n2 x Filterkerze (50 µm)\r\n2 x Filterglocke\r\n1 x Dichtungsgummi",
      stockLocation: "1, 1, 1"
    },
    {
      number: "103002",
      name: "GENO-EFK 80 µm",
      description: "GENO-EFK 50 µm mit:\r\n2 x Filterkerze (80 µm)\r\n2 x Filterglocke\r\n1 x Dichtungsgummi",
      stockLocation: "1, 1, 2"
    }
  ]

  samples_softeners: Article[] = [
    {
      number: "189100",
      name: "Enthärtungsanlage Typ softliQ:SD18",
      description: "Enthärtungsanlage Typ softliQ:SD18\r\nNennkapazität: 18 m³",
      stockLocation: "2, 1, 1"
    },
    {
      number: "189200",
      name: "Enthärtungsanlage Typ softliQ:SD21",
      description: "Enthärtungsanlage Typ softliQ:SD21\r\nNennkapazität: 21 m³",
      stockLocation: "2, 1, 2"
    },
    {
      number: "189300",
      name: "Enthärtungsanlage Typ softliQ:SD23",
      description: "Enthärtungsanlage Typ softliQ:SD23\r\nNennkapazität: 23 m³",
      stockLocation: "2, 1, 3"
    },
    {
      number: "187400",
      name: "Enthärtungsanlage Typ softliQ:MD32",
      description: "Enthärtungsanlage Typ softliQ:MD32\r\nNennkapazität: 32 m³",
      stockLocation: "2, 2, 1"
    },
    {
      number: "187450",
      name: "Enthärtungsanlage Typ softliQ:MD38",
      description: "Enthärtungsanlage Typ softliQ:MD38\r\nNennkapazität: 38 m³",
      stockLocation: "2, 2, 2"
    }
  ];

  samples_add: Article[] = [
    {
      number: "56606",
      name: "CO²-Flaschenfüllung Mietflasche Abholung",
      description: "CO² von Westfalen",
      stockLocation: "AG"
    },
    {
      number: "200200",
      name: "Mischbettharz Entsalzung",
      description: "Mischbettharz Entsalzung, 25L  Sack",
      stockLocation: "NS"
    }
  ]

  samples: Article[] = this.samples_efk.concat(this.samples_softeners, this.samples_add);
}