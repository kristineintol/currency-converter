import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
interface Currency {
  code: string;
  name: string;
}
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  amount!: number;
  fromCurrency!: string;
  toCurrency!: string;
  convertedAmount!: number;
  currencies: Currency[] = [
    { code: 'USD', name: 'United States Dollar' },
    { code: 'EUR', name: 'Euro' },
    { code: 'GBP', name: 'British Pound Sterling' },
    { code: 'JPY', name: 'Japanese Yen' },
    { code: 'AUD', name: 'Australian Dollar' }
  ];
  conversionRateAPI = 'https://api.exchangerate-api.com/v4/latest/'; // Replace with your preferred currency conversion API

  constructor(private http: HttpClient) {}

  convertCurrency() {
    if (this.amount && this.fromCurrency && this.toCurrency) {
      const url = `${this.conversionRateAPI}${this.fromCurrency}`;
      this.http.get<any>(url).subscribe((data) => {
        if (data.rates && data.rates[this.toCurrency]) {
          const rate = data.rates[this.toCurrency];
          this.convertedAmount = this.amount * rate;
        }
      });
    }
  }

}
