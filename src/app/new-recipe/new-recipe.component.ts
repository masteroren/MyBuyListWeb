import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {RecipeService} from "../shared/services/recipe-service.service";
import {HttpService} from "../shared/services/http-service.service";
import {ICategory} from "../shared/interfaces/category";
import {TreeNode} from "primeng/primeng";
import {isNullOrUndefined} from "util";

@Component({
  selector: 'new-recipe',
  templateUrl: './new-recipe.component.html',
  styleUrls: ['./new-recipe.component.scss'],
  providers: [HttpService, RecipeService]
})
export class NewRecipeComponent implements OnInit {
  display: boolean = false;
  prepareUnit: number = 0;
  cookUnit: number = 0;

  form: FormGroup;
  timeUnits: any[] = [
    {
      label: "דקות",
      value: 0
    },
    {
      label: "שעות",
      value: 1
    }
  ];
  categories: TreeNode[] = [];
  flatCategories: string;

  @ViewChild('categoriesInput') categoriesInput: ElementRef;

  constructor(private fb: FormBuilder, private recipeService: RecipeService, private httpService: HttpService) {
    this.form = fb.group({
      name: ['', Validators.required],
      description: '',
      category: ['', Validators.required],
      tags: [],
      photo: '',
      link: '',
      prepareFor: '',
      prepareUnit: 0,
      cookFor: '',
      cookUnit: 0,
      servings: '',
      level: '',
      tools: '',
      instructions: ['', Validators.required],
      comments: ''
    });
  }

  ngOnInit() {
    this.httpService.get('api/recipes/categories').subscribe((categories: ICategory[]) => {
      categories.forEach(item => {
        if (!item.parentId) {
          this.categories = [...this.categories, {
            label: item.name,
            data: item.id,
            children: []
          }]
        }
      });

      this.categories.forEach(item => this.addChildrenTo(item, categories));
    })
  }

  submit() {
    console.log(this.form.value);
    if (this.form.valid) {
      this.recipeService.addRecipe(this.form.value);
    } else {
      console.log('form no valid');
    }
  }

  nodeUnSelect (e) {
    e.node.partialSelected = null;
  }

  setSelectedNodes() {
    let flatCategories: string[] = [];
    this.setFlatCategories(flatCategories, this.categories);
    console.log(flatCategories);
    this.categoriesInput.nativeElement.value = flatCategories.join();
    this.display = false;
  }

  private setFlatCategories(flatCategories: string[], categories: TreeNode[]) {

    categories.forEach((item: TreeNode) => {
      if (!isNullOrUndefined(item.partialSelected)) {
        if (item.partialSelected == true) {
          this.setFlatCategories(flatCategories, item.children)
        } else {
          flatCategories = [...flatCategories, item.label];
        }
      }
    });

  }

  private addChildrenTo(treeNode: TreeNode, categories: ICategory[]) {

    let children = categories.filter(item => item.parentId === treeNode.data);
    children.forEach(item => {
      treeNode.children = [...treeNode.children, {
        label: item.name,
        data: item.id,
        children: []
      }];
    });

    treeNode.children.forEach(item => this.addChildrenTo(item, categories))
  }

}
