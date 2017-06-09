import {Component} from '@angular/core';
import {TranslateService} from "ng2-translate";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'MyBuyList!';

  constructor(translate: TranslateService) {
    translate.setDefaultLang('he');
    translate.use('he');
  }
}
