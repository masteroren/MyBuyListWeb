import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {IIngredient} from "../shared/interfaces/ingredient";
import {HttpService} from "../shared/services/http-service.service";
import {ILabelValue} from "../shared/interfaces/labelValue";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'ingredients',
  templateUrl: './ingredients.component.html',
  styleUrls: ['./ingredients.component.scss']
})

export class IngredientsComponent implements OnInit {

  ingredients: IIngredient[] = [];
  ingredient: IIngredient = {
    quantity: '',
    name: '',
    measureUnit: '',
    fraction: null,
    handling: ''
  };
  fractions: ILabelValue[] = [];
  measureUnits: ILabelValue[] = [];
  results: any[] = [];

  form: FormGroup;

  constructor(private httpService: HttpService, private fb: FormBuilder) {
    this.form = fb.group({
      quantity: ['', Validators.required],
      name: ['', Validators.required],
      measureUnit: ['', Validators.required],
      fraction: '',
      handling: ''
    })
  }

  ngOnInit() {
    this.httpService.get('api/recipes/fractions')
      .subscribe(data => {
        this.fractions = data;
      });

    this.httpService.get('api/recipes/measure-units')
      .subscribe(data => this.measureUnits = data);
  }

  search(event) {
    this.httpService.get('api/recipes/ingredients/' + event.query)
      .subscribe(data => {
        this.results = data.map(item => item.label);
      });
  }

  add() {

    if (!this.form.valid) {
      console.log('Not valid');
      return;
    }

    this.ingredients = [...this.ingredients, this.form.value];
  }

  update(index: number) {
    this.ingredient = this.ingredients[index];
  }

  remove(index: number) {
    this.ingredients.splice(index, 1);
  }

}
