import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Article } from 'src/models/Article';
import { IDataService } from 'src/dataServices/IDataService';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-article',
  templateUrl: './edit-article.component.html',
  styleUrl: './edit-article.component.scss'
})
export class EditArticleComponent implements OnInit {
  model: Article = new Article();

  @ViewChild("articleForm")
  articleorm!: NgForm;

  isSubmitted: boolean = false;
  articleNumber: any;

  constructor(private activatedRoute: ActivatedRoute, @Inject('IArticleService') private articleService: IDataService<Article>, private _snackBar: MatSnackBar, private router: Router) { }

  ngOnInit(): void {
    this.articleNumber = this.activatedRoute.snapshot.url[1].path;;
    this.getArticleByNumber();
  }

  getArticleByNumber() {
    this.articleService.get(this.articleNumber).subscribe(res => {
      this.model.number = res.number;
      this.model.name = res.name;
      this.model.description = res.description;
      this.model.stockLocation = res.stockLocation;
      this.model.listPrice = res.listPrice;
      this.model.priceGroup = res.priceGroup;
      this.model.stockAmount = res.stockAmount;
    });
  }

  EditArticle(isValid: any) {
    if (isValid) {
      this.isSubmitted = true;
      this.articleService.update(this.model).subscribe(res => {
        console.log(res);
        this._snackBar.open('Änderungen gespeichert', 'OK')
        .onAction()
        .subscribe(() => this.router.navigateByUrl('/article'));
      });            
    }
  }
}