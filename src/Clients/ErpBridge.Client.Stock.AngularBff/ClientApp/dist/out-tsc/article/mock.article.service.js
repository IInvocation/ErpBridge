import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { ArticleDataSource } from './article.datasource';
import { MockDataService } from 'src/dataServices/MockDataService';
let ArticleMockService = class ArticleMockService extends MockDataService {
    constructor() {
        super(...arguments);
        this.samples_efk = [
            {
                number: "103001",
                name: "GENO-EFK 50 µm",
                description: "GENO-EFK 50 µm mit:\r\n2 x Filterkerze (50 µm)\r\n2 x Filterglocke\r\n1 x Dichtungsgummi",
                stockRow: "1",
                stockRack: "1",
                stockCase: "1"
            },
            {
                number: "103002",
                name: "GENO-EFK 80 µm",
                description: "GENO-EFK 50 µm mit:\r\n2 x Filterkerze (80 µm)\r\n2 x Filterglocke\r\n1 x Dichtungsgummi",
                stockRow: "1",
                stockRack: "1",
                stockCase: "2"
            }
        ];
        this.samples_softeners = [
            {
                number: "189100",
                name: "Enthärtungsanlage Typ softliQ:SD18",
                description: "Enthärtungsanlage Typ softliQ:SD18\r\nNennkapazität: 18 m³",
                stockRow: "2",
                stockRack: "1",
                stockCase: "1"
            },
            {
                number: "189200",
                name: "Enthärtungsanlage Typ softliQ:SD21",
                description: "Enthärtungsanlage Typ softliQ:SD21\r\nNennkapazität: 21 m³",
                stockRow: "2",
                stockRack: "1",
                stockCase: "2"
            },
            {
                number: "189300",
                name: "Enthärtungsanlage Typ softliQ:SD23",
                description: "Enthärtungsanlage Typ softliQ:SD23\r\nNennkapazität: 23 m³",
                stockRow: "2",
                stockRack: "1",
                stockCase: "3"
            },
            {
                number: "187400",
                name: "Enthärtungsanlage Typ softliQ:MD32",
                description: "Enthärtungsanlage Typ softliQ:MD32\r\nNennkapazität: 32 m³",
                stockRow: "2",
                stockRack: "2",
                stockCase: "1"
            },
            {
                number: "187450",
                name: "Enthärtungsanlage Typ softliQ:MD38",
                description: "Enthärtungsanlage Typ softliQ:MD38\r\nNennkapazität: 38 m³",
                stockRow: "2",
                stockRack: "2",
                stockCase: "2"
            }
        ];
        this.samples_add = [
            {
                number: "56606",
                name: "CO²-Flaschenfüllung Mietflasche Abholung",
                description: "CO² von Westfalen",
                stockRow: "AG",
                stockRack: null,
                stockCase: null
            },
            {
                number: "200200",
                name: "Mischbettharz Entsalzung",
                description: "Mischbettharz Entsalzung, 25L  Sack",
                stockRow: "NS",
                stockRack: null,
                stockCase: null
            }
        ];
        this.samples = this.samples_efk.concat(this.samples_softeners, this.samples_add);
    }
    filter(records, filterValue) {
        return records.filter((article) => article.number.includes(filterValue) || article.name.includes(filterValue));
    }
    getDataSource() {
        return new ArticleDataSource(this);
    }
};
ArticleMockService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], ArticleMockService);
export { ArticleMockService };
//# sourceMappingURL=mock.article.service.js.map