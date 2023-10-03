import { Component } from '@angular/core';
import { CountrySidebar } from 'src/app/interfaces/CountrySidebar.interface';

@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [``]
})
export class SidebarComponent {
  private countriesSidebar : CountrySidebar[] = [
    {
      countryName: 'England',
      id: 39
    },
    {
      countryName: 'Spain',
      id: 140
    },
    {
      countryName: 'Germany',
      id: 78
    },
    {
      countryName: 'France',
      id: 61
    },
    {
      countryName: 'Italy',
      id: 135
    },
  ]

  selectedCountryId: number = 39;

  constructor() { }


  get countries() {
    return [...this.countriesSidebar];
  }

  changeSelectedCountry(countryId: number) {
    this.selectedCountryId = countryId;
  }
}
