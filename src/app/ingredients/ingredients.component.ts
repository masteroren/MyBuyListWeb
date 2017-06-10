import {Component, forwardRef, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {IIngredient} from "../shared/interfaces/ingredient";
import {HttpService} from "../shared/services/http-service.service";
import {ILabelValue} from "../shared/interfaces/labelValue";
import {ControlValueAccessor, FormBuilder, FormGroup, NG_VALUE_ACCESSOR, Validators} from "@angular/forms";
import {isNullOrUndefined} from "util";

@Component({
  selector: 'ingredients',
  templateUrl: './ingredients.component.html',
  styleUrls: ['./ingredients.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => IngredientsComponent),
      multi: true
    }
  ]
})

export class IngredientsComponent implements OnInit {

  ingredientModel: IIngredient = {
    quantity: 1,
    measureUnit: 0,
    fraction: 0,
    name: '',
    text: ''
  };

  _ingredients: IIngredient[] = [];
  @Input('ingredients')
  set ingredients(value: IIngredient[]) {
    this._ingredients = value;
    this.propagateChange(value);
  }

  get ingredients() {
    return this._ingredients;
  }

  fractions: ILabelValue[] = [];
  measureUnits: ILabelValue[] = [];
  results: any[] = [];

  form: FormGroup;

  propagateChange = (_: any) => {
  };

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
        this.ingredientModel.fraction = data[0].value;
        this.ingredientModel.fractionText = data[0].label;
      });

    this.httpService.get('api/recipes/measure-units')
      .subscribe(data => {
        this.measureUnits = data;
        this.ingredientModel.measureUnit = data[0].value;
        this.ingredientModel.measureUnitText = data[0].label;
      });
  }

  writeValue(value: any) {
    if (!isNullOrUndefined(value)) {
      this._ingredients = value;
    }
  }

  registerOnChange(fn) {
    this.propagateChange = fn;
  }

  registerOnTouched() {
  }

  search(event) {
    this.httpService.get('api/recipes/ingredients/' + event.query)
      .subscribe(data => {
        this.results = data.map(item => item.label);
      });
  }

  add() {
    if (this.form.valid) {
      let index = this.ingredients.findIndex(item => item.name === this.ingredientModel.name);

      if (index !== -1) {
        this.removeIngredient(index);
      }

      this.ingredients = [...this.ingredients, {
        quantity: this.ingredientModel.quantity,
        fraction: this.ingredientModel.fraction,
        fractionText: this.fractions.find(item => item.value == this.ingredientModel.fraction).label,
        measureUnit: this.ingredientModel.measureUnit,
        measureUnitText: this.measureUnits.find(item => item.value == this.ingredientModel.measureUnit).label,
        name: this.ingredientModel.name,
        text: this.ingredientModel.text
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
    this.ingredientModel = {
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
