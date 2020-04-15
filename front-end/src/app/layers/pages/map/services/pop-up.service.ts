import { Injectable } from '@angular/core';
import { LanguageService } from 'src/app/services/language.service';

// number with comma
function numberWithCommas(x) {
  var parts = x.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
}

@Injectable({
  providedIn: 'root'
})
export class PopUpService {

  constructor(public languageService: LanguageService) {}

  makeCapitalTooltip(name: string, cases: number, deaths: number, recovered: number, text: string[]): string {
    cases = numberWithCommas(cases);
    deaths = numberWithCommas(deaths);
    recovered = numberWithCommas(recovered);


    // let x = toString(cases);
    return `
    <p style="text-align: center;font-size:110%;font-weight:bold;">${name}</p>
    <hr>
    <ul>
      <li style="color: gray;">${text[0]}: ${cases}</li>
      <li style="color: red;">${text[1]}: ${deaths}</li>
      <li style="color: green;">${text[2]}: ${recovered}</li>
    </ul>
    `
  }
}
