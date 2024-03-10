import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { of, delay } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { ArticleDataSource } from './article.datasource';
import { SearchResult } from 'src/models/SearchResult';
let ArticleService = class ArticleService {
    constructor(httpClient) {
        this.httpClient = httpClient;
    }
    getDataSource() {
        return new ArticleDataSource(this);
    }
    getAll() {
        var x = this.httpClient.get('/api/Article/GetAll');
        return x;
    }
    search(sortField, direction, pageIndex, pageSize, filter) {
        var x = this.httpClient.get('api/Article/Search', {
            params: new HttpParams()
                .set('sortField', sortField)
                .set('direction', direction)
                .set('pageIndex', pageIndex)
                .set('pageSize', pageSize)
                .set('filter', filter)
        });
        console.log(x);
        return x;
    }
};
ArticleService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], ArticleService);
export { ArticleService };
let ArticleMockService = class ArticleMockService {
    constructor() {
        this.samples = [{
                number: "103001",
                name: "GENO-EFK 50 µm",
                description: "GENO-EFK 50 µm mit:\r\n2 x Filterkerze (50 µm)\r\n2 x Filterglocke\r\n1 x Dichtungsgummi"
            },
            {
                number: "103002",
                name: "GENO-EFK 80 µm",
                description: "GENO-EFK 50 µm mit:\r\n2 x Filterkerze (80 µm)\r\n2 x Filterglocke\r\n1 x Dichtungsgummi"
            },
            {
                number: "189100",
                name: "Enthärtungsanlage Typ softliQ:SD18",
                description: "Enthärtungsanlage Typ softliQ:SD18\r\nNennkapazität: 18 m³"
            },
            {
                number: "189200",
                name: "Enthärtungsanlage Typ softliQ:SD21",
                description: "Enthärtungsanlage Typ softliQ:SD21\r\nNennkapazität: 21 m³"
            },
            {
                number: "189300",
                name: "Enthärtungsanlage Typ softliQ:SD23",
                description: "Enthärtungsanlage Typ softliQ:SD2\r\nNennkapazität: 23 m³"
            }];
        this.filterSamples = [{
                number: "82-730-8312",
                name: "TITANIUM DIOXIDE",
                description: "Computerized Tomography (CT Scan) of Left Femur"
            }, {
                number: "24-557-6636",
                name: "Risperidone",
                description: "Excision of Epiglottis, Percutaneous Approach, Diagnostic"
            }, {
                number: "06-233-2580",
                name: "ALCOHOL",
                description: "Drainage of L Hand Bursa/Lig with Drain Dev, Perc Approach"
            }, {
                number: "05-485-1195",
                name: "Antimonium tartaricum, Carbo vegetabilis, Mercurius corrosivus, Mucosa nasalis suis, Quebracho, Sticta pulmonaria, Teucrium marum",
                description: "Repair Bladder, Open Approach"
            }, {
                number: "84-410-2579",
                name: "Rosuvastatin calcium",
                description: "Removal of Synth Sub from L Femur Shaft, Open Approach"
            }, {
                number: "30-532-1210",
                name: "Rivastigmine Tartrate",
                description: "Dilation of Thoracic Aorta, Descending, Perc Endo Approach"
            }, {
                number: "70-197-5561",
                name: "HYDROGEN PEROXIDE",
                description: "Release Celiac Artery, Open Approach"
            }, {
                number: "04-061-5358",
                name: "tramadol hydrochloride",
                description: "Replacement of Skull with Autol Sub, Perc Endo Approach"
            }, {
                number: "85-126-6685",
                name: "OCTINOXATE and TITANIUM DIOXIDE",
                description: "Removal of Synth Sub from R Scapula, Perc Endo Approach"
            }, {
                number: "70-721-6522",
                name: "MINOCYCLINE HYDROCHLORIDE",
                description: "Dilate Up Art, Bifurc, w 4+ Intralum Dev, Open"
            }, {
                number: "54-653-5258",
                name: "Cetirizine HCl, Pseudoephedrine HCl",
                description: "Ultraviolet Light Therapy of Skin, Multiple"
            }, {
                number: "98-741-4527",
                name: "Levothyroxine sodium",
                description: "Occlusion R Cephalic Vein w Intralum Dev, Perc"
            }, {
                number: "40-137-6918",
                name: "Dextromethorphan HBr",
                description: "Reposition Thoracolumbar Vertebral Joint, External Approach"
            }, {
                number: "90-108-5253",
                name: "NOT APPLICABLE",
                description: "Dilation of Intracranial Artery, Perc Endo Approach"
            }, {
                number: "60-461-2250",
                name: "Dimethicone, Octinoxate, Oxybenzone, and Lanolin",
                description: "Dilation of Right Ureter, Endo"
            }, {
                number: "07-979-8264",
                name: "dexamethasone",
                description: "Supplement Sigmoid Colon with Nonaut Sub, Perc Endo Approach"
            }, {
                number: "25-025-8990",
                name: "CAFFEINE CITRATE",
                description: "Reposition Left Lower Femur with Intramed Fix, Perc Approach"
            }, {
                number: "93-045-6122",
                name: "ARSENIC TRIOXIDE - HISTAMINE DIHYDROCHLORIDE - DERMATOPHAGOIDES PTERONYSSINUS - MAGNESIUM PHOSPHATE, DIBASIC TRIHYDRATE - STRYCHNOS NUX-VOMICA SEED - ASPIDOSPERMA QUEBRACHO-BLANCO BARK - SUPLHUR -",
                description: "Revision of Spacer in R Sternoclav Jt, Perc Endo Approach"
            }, {
                number: "25-362-4254",
                name: "Hydrochlorothiazide",
                description: "Reposition Colic Vein, Open Approach"
            }, {
                number: "69-911-5231",
                name: "TITANIUM DIOXIDE, OCTINOXATE, ZINC OXIDE",
                description: "Restriction of Cecum with Intraluminal Device, Endo"
            }, {
                number: "96-658-2705",
                name: "divalproex sodium",
                description: "Remove of Autol Sub from R Sacroiliac Jt, Perc Endo Approach"
            }, {
                number: "57-825-4050",
                name: "buckwheat",
                description: "Repair Right Abdomen Muscle, Perc Endo Approach"
            }, {
                number: "45-836-9314",
                name: "Pseudoephedrine HCl",
                description: "Repair Right Trunk Tendon, Percutaneous Approach"
            }, {
                number: "58-178-0937",
                name: "Ropinirole Hydrochloride",
                description: "Reposition Left Tibia with Hybrid Ext Fix, Perc Approach"
            }, {
                number: "99-696-9848",
                name: "Divalproex Sodium",
                description: "Stereotactic Gamma Beam Radiosurgery of Thorax Lymphatics"
            }, {
                number: "66-848-2573",
                name: "betamethasone valerate",
                description: "Change Splint on Right Foot"
            }, {
                number: "73-088-3780",
                name: "meloxicam",
                description: "Supplement Left Neck Lymphatic with Synth Sub, Open Approach"
            }, {
                number: "60-076-9165",
                name: "Buspirone Hydrochloride",
                description: "Dilation of L Popl Art with Intralum Dev, Perc Approach"
            }, {
                number: "29-869-3180",
                name: "CAMPHOR",
                description: "Release Right Shoulder Muscle, Open Approach"
            }, {
                number: "20-811-2167",
                name: "fentanyl citrate",
                description: "Supplement L Trunk Bursa/Lig w Autol Sub, Perc Endo"
            }, {
                number: "69-236-0945",
                name: "Octinoxate and Octocrylene",
                description: "Replace of L Finger Phalanx with Synth Sub, Perc Approach"
            }, {
                number: "87-260-1626",
                name: "candida albicans, candida parapsilosis and penicillium roqueforti",
                description: "Repair Right Vocal Cord, Percutaneous Endoscopic Approach"
            }, {
                number: "07-248-7288",
                name: "Arsenicum Album, Belladonna, Blatta Orientalis, Ipecacuanha, Kali Carbonicum, Lobelia Inflata, Natrum Sulphuricum, Silicea",
                description: "Bypass L Ext Jugular Vein to Up Vein w Autol Vn, Perc Endo"
            }, {
                number: "71-867-4567",
                name: "Calcium Acetate",
                description: "LDR Brachytherapy of Bronchus using Oth Isotope"
            }, {
                number: "79-828-9494",
                name: "Prednisone",
                description: "Destruction of Right Frontal Sinus, Perc Endo Approach"
            }, {
                number: "37-437-7870",
                name: "benztropine mesylate",
                description: "Removal of Autol Sub from Fem Perineum, Perc Approach"
            }, {
                number: "59-201-2752",
                name: "Aluminum Zirconium Tetrachlorohydrex GLY",
                description: "Reposition Left Knee Bursa and Ligament, Perc Endo Approach"
            }, {
                number: "26-959-0566",
                name: "Escitalopram Oxalate",
                description: "Drainage of Perineum Bursa and Ligament, Open Approach"
            }, {
                number: "44-518-9149",
                name: "Avobenzone, Homosalate, Octisalate, Octocrylene, and Oxybenzone",
                description: "Insertion of Radioactive Element into Rectum, Open Approach"
            }, {
                number: "48-184-0629",
                name: "calcium carbonate",
                description: "Revision of Synth Sub in L Up Extrem, Extern Approach"
            }, {
                number: "59-377-5034",
                name: "Paroxetine hydrochloride hemihydrate",
                description: "Revision of Ext Fix in L Humeral Shaft, Open Approach"
            }, {
                number: "12-909-6948",
                name: "Petasites Plantago",
                description: "Release Celiac Artery, Percutaneous Approach"
            }, {
                number: "54-038-7140",
                name: "Ciprofloxacin Hydrochloride",
                description: "Excision of Right Lower Femur, Open Approach, Diagnostic"
            }, {
                number: "46-409-3359",
                name: "Cuprum Metallicum",
                description: "Reposition Right Knee Joint, Percutaneous Approach"
            }, {
                number: "83-127-6761",
                name: "Oxygen",
                description: "Restriction of Ascending Colon, Perc Endo Approach"
            }, {
                number: "47-523-6055",
                name: "Nitrogen",
                description: "Dilate L Axilla Art w 3 Intralum Dev, Perc Endo"
            }, {
                number: "12-600-4934",
                name: "Botrytis cinerea",
                description: "Destruction of Splenic Artery, Percutaneous Approach"
            }, {
                number: "85-137-6788",
                name: "Ampicillin and Sulbactam",
                description: "Drainage of L Ext Carotid with Drain Dev, Open Approach"
            }, {
                number: "91-674-6251",
                name: "OCTINOXATE and TITANIUM DIOXIDE",
                description: "Reposition Left Ulna with Hybrid Ext Fix, Perc Endo Approach"
            }, {
                number: "46-633-9990",
                name: "Dextroamphetamine Sulfate, Dextroamphetamine Saccharate, Amphetamine Sulfate and Amphetamine Aspartate",
                description: "Dilate L Brach Art, Bifurc, w 3 Drug-elut, Perc Endo"
            }, {
                number: "08-754-8353",
                name: "ETHYL ALCOHOL",
                description: "Drainage of Left Ovary, External Approach"
            }, {
                number: "07-709-4412",
                name: "OXYGEN",
                description: "Introduction of Liquid Brachy into Resp Tract, Via Opening"
            }, {
                number: "07-129-4379",
                name: "diphenoxylate hydrochloride and atropine sulfate",
                description: "Reposition Left Lower Femur with Ring Ext Fix, Perc Approach"
            }, {
                number: "80-881-7101",
                name: "Arsenicum 30c, Bryonia 30c, Carbo Animalis 30c, Carbo Veg 30c, Nat Phos 30c, Nux Vomica 30c, Mag Phos 30c, Pulsatilla 30c, Sepia 30c",
                description: "Dilation of Gastric Vein with Intralum Dev, Perc Approach"
            }, {
                number: "55-865-5328",
                name: "enoxaparin sodium",
                description: "Introduction of Oxazolidinones into GU Tract, Via Opening"
            }, {
                number: "17-978-2508",
                name: "Alcohol",
                description: "Plain Radiography of Bi Int Carotid using L Osm Contrast"
            }, {
                number: "07-650-8500",
                name: "ENALAPRIL MALEATE",
                description: "Reposition R Temporal Bone with Int Fix, Perc Endo Approach"
            }, {
                number: "29-368-4007",
                name: "Glycerin",
                description: "Stereotactic Particulate Radiosurgery of Bronchus"
            }, {
                number: "13-218-6515",
                name: "Bryonia Stannum",
                description: "Supplement R Humeral Head with Synth Sub, Perc Endo Approach"
            }, {
                number: "67-186-3023",
                name: "Nicotine Polacrilex",
                description: "Release Right Innominate Vein, Perc Endo Approach"
            }, {
                number: "07-938-8577",
                name: "Magnesium hydroxide",
                description: "Supplement L Up Arm Tendon w Autol Sub, Perc Endo"
            }, {
                number: "52-413-3766",
                name: "Tall Ragweed",
                description: "Insertion of Infusion Device into R Knee, Perc Approach"
            }, {
                number: "87-735-2388",
                name: "Dexamethasone",
                description: "Bypass 3 Cor Art from Thor Art w Autol Vn, Perc Endo"
            }, {
                number: "27-089-0032",
                name: "oxcarbazepine",
                description: "Extirpation of Matter from Sacrococcygeal Jt, Open Approach"
            }, {
                number: "31-375-8421",
                name: "ALCOHOL",
                description: "Removal of Autol Sub from R Thumb Phalanx, Open Approach"
            }, {
                number: "44-417-1536",
                name: "topiramate",
                description: "Bypass Bi Ureter to Ileocutan with Synth Sub, Open Approach"
            }, {
                number: "82-221-4020",
                name: "LEVOTHYROXINE SODIUM",
                description: "Bypass Abdominal Aorta to Lower Artery, Open Approach"
            }, {
                number: "86-217-6861",
                name: "Polyethylene Glycol 3350",
                description: "Fusion of Right Temporomandibular Joint, Open Approach"
            }, {
                number: "71-625-0896",
                name: "Lorazepam",
                description: "Replacement of L Lacrimal Bone with Autol Sub, Perc Approach"
            }, {
                number: "44-365-6316",
                name: "Diphenhydramine Hydrochloride",
                description: "Bypass L Ext Iliac Art to Foot Art w Synth Sub, Open"
            }, {
                number: "46-684-3338",
                name: "Pyrithione Zinc",
                description: "Replace of R Brach Vein with Synth Sub, Perc Endo Approach"
            }, {
                number: "25-477-0116",
                name: "Olanzapine",
                description: "Supplement Mesentery with Nonaut Sub, Perc Endo Approach"
            }, {
                number: "92-704-5480",
                name: "Menthol",
                description: "Insert of Int Fix into L Parietal Bone, Perc Endo Approach"
            }, {
                number: "93-138-0604",
                name: "MENTHOL, CAMPHOR",
                description: "Drainage of Inferior Mesenteric Vein, Perc Endo Approach"
            }, {
                number: "03-384-7730",
                name: "Bumetanide",
                description: "Repair Left Toe Phalanx, Percutaneous Approach"
            }, {
                number: "95-483-1871",
                name: "Menthol",
                description: "Drainage of Left Buttock, Open Approach"
            }, {
                number: "16-130-4995",
                name: "Triclosan",
                description: "Dilate R Brach Art w 4+ Intralum Dev, Perc Endo"
            }, {
                number: "54-936-4605",
                name: "Ethyl Alcohol",
                description: "Supplement Left Diaphragm with Nonaut Sub, Open Approach"
            }, {
                number: "40-980-4475",
                name: "Paroxetine hydrochloride hemihydrate",
                description: "Restriction of Right Colic Artery, Open Approach"
            }, {
                number: "33-090-6938",
                name: "Avobenzone, Octinoxate, Octisalate, Octocrylene, and Oxybenzone",
                description: "Motor Functn Trmt Neuro Head, Neck w Assist Equip"
            }, {
                number: "08-867-0046",
                name: "OCTINOXATE",
                description: "Drainage of Cervical Vertebra, Perc Endo Approach, Diagn"
            }, {
                number: "12-616-2036",
                name: "Eucalyptol, Menthol, Methyl Salicylate, and Thymol",
                description: "Bypass 1 Cor Art from R Int Mammary w Autol Art, Open"
            }, {
                number: "81-663-1565",
                name: "Water",
                description: "Removal of Synth Sub from L Acetabulum, Open Approach"
            }, {
                number: "31-474-0266",
                name: "Levisticum Quercus",
                description: "Supplement Left 4th Toe with Synth Sub, Perc Endo Approach"
            }, {
                number: "08-671-3469",
                name: "Ibuprofen",
                description: "Introduction of Oth Antineoplastic into Up GI, Perc Approach"
            }, {
                number: "76-121-0006",
                name: "Cypress Bald",
                description: "Dilate L Verteb Art, Bifurc, w 3 Drug-elut, Perc Endo"
            }, {
                number: "36-735-7090",
                name: "salicylic acid",
                description: "Restrict Cisterna Chyli w Intralum Dev, Perc Endo"
            }, {
                number: "36-860-4983",
                name: "Prednisone",
                description: "Destruction of Right Wrist Bursa and Ligament, Open Approach"
            }, {
                number: "57-809-1533",
                name: "AVOBENZONE, HOMOSALATE, OCTOCRYLENE, OXYBENZONE",
                description: "Bypass L Com Iliac Art to B Femor A, Perc Endo Approach"
            }, {
                number: "27-197-2298",
                name: "hydrocodone bitartrate and acetaminophen",
                description: "Destruction of Gallbladder, Percutaneous Endoscopic Approach"
            }, {
                number: "42-997-1148",
                name: "Agrimonia eupatoria, flos, Arsenicum album, Ceratostigma willmottianum, flos, cuprum metallicum, Cyclamen europaeum, Digitalis purpurea, Ignatia amara, Juglans regia, flos, Millefolium, Natrum muriaticum, Phosphoricum acidum, Pinus sylvestris, flos, Thuja occidentalis, Verbascum thapsus",
                description: "Fusion of Left Ankle Joint with Ext Fix, Perc Approach"
            }, {
                number: "44-507-4910",
                name: "Octinoxate and Oxybenzone",
                description: "Imaging, Axial Skel, Exc Skull Facial, CT Scan"
            }, {
                number: "80-951-9061",
                name: "TITANIUM DIOXIDE, ZINC OXIDE",
                description: "Inspection of Products of Conception, Ectopic, Perc Approach"
            }, {
                number: "29-094-6788",
                name: "Zidovudine",
                description: "Drainage of R Low Arm & Wrist Muscle, Perc Endo Approach"
            }, {
                number: "31-645-7301",
                name: "Sotalol Hydrochloride",
                description: "Bypass Portal Vein to Low Vein with Autol Sub, Open Approach"
            }, {
                number: "45-693-4268",
                name: "ETODOLAC",
                description: "Extirpation of Matter from Facial Nerve, Perc Endo Approach"
            }, {
                number: "45-097-3823",
                name: "EUCALYPTOL",
                description: "Occlusion of Left Femoral Vein, Percutaneous Approach"
            }, {
                number: "39-579-9955",
                name: "Calcium Gluconate",
                description: "Supplement Hymen with Autol Sub, Via Opening"
            }, {
                number: "88-816-6931",
                name: "Fluoride Toothpaste",
                description: "Coord/Dexterity Treatment of Musculosk Whole using Orthosis"
            }, {
                number: "14-676-6111",
                name: "Caulphyllum thalictroides, Pulsatilla, Sepia,",
                description: "Change Pressure Dressing on Right Thumb"
            }];
    }
    getDataSource() {
        return new ArticleDataSource(this);
    }
    getAll() {
        return of(this.samples).pipe(delay(1000));
    }
    search(sortField, direction, pageIndex, pageSize, filter) {
        var filtered = filter ? this.filterSamples.filter((article) => article.number.includes(filter) || article.name.includes(filter)) : this.filterSamples;
        var sorted = filtered.sort(this.by(sortField, direction));
        var res = new SearchResult();
        res.pageIndex = pageIndex;
        res.pageCount = sorted.length / pageSize;
        res.pageSize = pageSize;
        res.recordCount = sorted.length;
        res.records = sorted.slice(pageIndex * pageSize, (pageIndex * pageSize) + pageSize);
        return of(res).pipe(delay(100));
    }
    by(property, order) {
        return (a, b) => {
            if (a[property] > b[property]) {
                if (order == 0) {
                    return 1;
                }
                else {
                    return -1;
                }
            }
            else if (a[property] < b[property]) {
                if (order == 0) {
                    return -1;
                }
                else {
                    return 1;
                }
            }
            return 0;
        };
    }
};
ArticleMockService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], ArticleMockService);
export { ArticleMockService };
//# sourceMappingURL=article.service.js.map