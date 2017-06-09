import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {IIngredient} from "../shared/interfaces/ingredient";
import {HttpService} from "../shared/services/http-service.service";
import {ILabelValue} from "../shared/interfaces/labelValue";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {isNullOrUndefined} from "util";

@Component({
  selector: 'ingredients',
  templateUrl: './ingredients.component.html',
  styleUrls: ['./ingredients.component.scss']
})

export class IngredientsComponent implements OnInit {

  ingredients: IIngredient[] = [];
  ingredient: IIngredient = {
    quantity: 1,
    measureUnit: 0,
    fraction: 0,
    name: '',
    text: ''
  };
  fractions: ILabelValue[] = [];
  measureUnits: ILabelValue[] = [];
  results: any[] = [];
  isNew: boolean = true;

  form: FormGroup;

  constructor(private httpService: HttpService, private fb: FormBuilder) {
    this.form = fb.group({
      quantity: [1, Validators.required],
      measureUnit: ['', Validators.required],
      fraction: '',
      name: ['', Validators.required],
      text: ''
    })
  }

  ngOnInit() {
    this.httpService.get('api/recipes/fractions')
      .subscribe((data: ILabelValue[]) => {
        this.fractions = data;
        this.ingredient.fraction = data[0].value;
        this.ingredient.fractionText = data[0].label;
      });

    this.httpService.get('api/recipes/measure-units')
      .subscribe(data => {
        this.measureUnits = data;
        this.ingredient.measureUnit = data[0].value;
        this.ingredient.measureUnitText = data[0].label;
      });
  }

  search(event) {
    this.httpService.get('api/recipes/ingredients/' + event.query)
      .subscribe(data => {
        this.results = data.map(item => item.label);
      });
  }

  add() {
    if (this.form.valid) {
      let index = this.ingredients.findIndex(item => item.name === this.ingredient.name);

      if (index !== -1){
        this.removeIngredient(index);
      }

      this.ingredients = [...this.ingredients, {
        quantity: this.ingredient.quantity,
        fraction: this.ingredient.fraction,
        fractionText: this.fractions.find(item => item.value == this.ingredient.fraction).label,
        measureUnit: this.ingredient.measureUnit,
        measureUnitText: this.measureUnits.find(item => item.value == this.ingredient.measureUnit).label,
        name: this.ingredient.name,
        text: this.ingredient.text
      }];

      // this.ingredient = {
      //   quantity: 1,
      //   measureUnit: 0,
      //   fraction: 0,
      //   name: '',
      //   text: ''
      // };
    }
  }

  updateIngredient(item: IIngredient) {
    this.ingredient = {
      quantity: item.quantity,
      fraction: item.fraction,
      measureUnit: item.measureUnit,
      name: item.name,
      text: item.text
    };
  }

  removeIngredient(index: number) {
    this.ingredients.splice(index, 1);
  }

}
