import { Component, OnInit, Input } from '@angular/core';
import { IPerson } from '../../models/person';
import { PersonlistService } from '../../services/personlist.service';

@Component({
  selector: 'app-personlist',
  templateUrl: './personlist.component.html',
  styleUrls: ['./personlist.component.scss'],
  providers: [PersonlistService]
})
export class PersonlistComponent implements OnInit {
  protected componentTitle: string = 'Persone';
  protected isOpenedDropdown: boolean = false;
  protected arrayListPersons: IPerson[] = [];
  protected isEditingSinglePerson: boolean = true;
  protected isOpenedModal: boolean = false;
  protected arrEditPerson: IPerson[] = [];
  protected defaultSelectEntry: string = "";
  protected modalTitle: string = 'Inserisci una nuova persona';
  protected selectedValue: IPerson;
  protected actualID: number;
  protected focusActiveLi: number = 0;
  protected focusStateSelect: number = 0;


  public handlingControl(event: KeyboardEvent) {
    const arrayLength = this.arrayListPersons.length - 1;
    //ENTER KEY
    if (event.which === 13) {
      this.selectedValue = this.arrayListPersons[this.focusStateSelect];
    }
    //TABKEY
    if (event.which === 9) {
      event.preventDefault();
      if (this.focusStateSelect < arrayLength) {
        this.focusStateSelect++;
      }
      else {
        this.focusStateSelect = 0;
      }
    }
  }

  //Gets Li DOM element

  public select(item: IPerson) {
    this.selectedValue = item;
  }

  //Gets Li DOM element and assigns to dropdown the value of selectedValue item and sets Active to Element
  public isActive(item: IPerson) {
    this.defaultSelectEntry = this.selectedValue['surname'] + " " + this.selectedValue['name'] + " " + new Date(this.selectedValue['birthDate']).toLocaleString('it-IT', { 'month': '2-digit', 'day': '2-digit', 'year': 'numeric' });
    return this.selectedValue === item;
  }

  constructor(private _personlistService: PersonlistService) { }

  ngOnInit(): void {
    this.arrayListPersons = this._personlistService.getListPerson();
    this.select(this.arrayListPersons[0]);  //Sets to first element of array
  }

  //Sets Dropdown Open/Closed

  public toggleList(): void {
    this.isOpenedDropdown = !this.isOpenedDropdown;
  }

  // Alt+Arrow Command Press -> Opens/Close Dropdown

  public onAltArrow(): void {
    this.isOpenedDropdown = !this.isOpenedDropdown;
  }

  // If outside target dropdown click is performed while dropdown is open, close dropdown.

  public clickOutsideFunc(targetElement: MouseEvent): void {
    if (this.isOpenedDropdown) {
      this.isOpenedDropdown = !this.isOpenedDropdown;
    }

  }


  // ArrowDown Command Press -> creates new array from Node elements
  //if dropdown is closed triggers click to next LI element
  //if dropdown is open selects its focus with data-focus custom attribute

  public onArrowDown(): void {
    const arrayLength = this.arrayListPersons.length - 1;
    if (!this.isOpenedDropdown) {
      if (this.focusActiveLi < arrayLength) {
        this.focusActiveLi++;
      }
      else {
        this.focusActiveLi = 0;
      }
      this.selectedValue = this.arrayListPersons[this.focusActiveLi];
    }
    else {
      if (this.focusStateSelect < arrayLength) {
        this.focusStateSelect++;
      }
      else {
        this.focusStateSelect = 0;
      }
    }
  }

  // ArrowUp Command Press -> creates new array from Node elements
  //if dropdown is closed triggers click to previous LI element
  //if dropdown is open selects its focus with data-focus custom attribute

  public onArrowUp(): void {
    const arrayLength = this.arrayListPersons.length - 1;
    if (!this.isOpenedDropdown) {
      if (this.focusActiveLi === 0) {
        this.focusActiveLi = arrayLength;
        this.selectedValue = this.arrayListPersons[this.focusActiveLi];
      }
      else {
        this.focusActiveLi--;
        this.selectedValue = this.arrayListPersons[this.focusActiveLi];
      }
    }
    else {
      if (this.focusStateSelect === 0) {
        this.focusStateSelect = arrayLength;
      }
      else {
        this.focusStateSelect--;
      }
    }
  }

  // Canc/Delete Command Press : Delete Current Focused Element

  public onCanc(focusStateSelect: number): void {
    this.arrayListPersons.splice(focusStateSelect, 1);
  }

  // Pencil Icon Click : This function retrieves already set datas, sets an array to empty, opens modal, pushes Datas to array.

  public editThisElement(ID: number, surname: string, name: string, birthDate: Date): void {
    this.arrEditPerson = [];
    this.isOpenedModal = !this.isOpenedModal;
    this.isEditingSinglePerson = !this.isOpenedModal;
    birthDate = new Date(birthDate);
    this.arrEditPerson.push({ ID, surname, name, birthDate });
  }

  // This function sets the data retrieved from editThisElement/onShiftEnter function

  public confirmEditPerson(): void {
    let IDtoMatch = this.arrEditPerson[0].ID;
    this.arrayListPersons.find(item => item.ID === IDtoMatch).name = this.arrEditPerson[0].name;
    this.arrayListPersons.find(item => item.ID === IDtoMatch).surname = this.arrEditPerson[0].surname;
    this.arrayListPersons.find(item => item.ID === IDtoMatch).birthDate = this.arrEditPerson[0].birthDate;
    this.isOpenedModal = !this.isOpenedModal;
    this.isEditingSinglePerson = !this.isOpenedModal;
  }

  // Trash Icon Click : Delete Current Element

  public deleteThisElement(index: number): void {
    this.arrayListPersons.splice(index, 1);
  }

  // Shift+Enter Command Press : This function retrieves already set datas, sets an array to empty, opens modal, pushes Datas to array.

  public onShiftEnter(ID: number, surname: string, name: string, birthDate: Date): void {
    this.isOpenedModal = !this.isOpenedModal;
    this.isEditingSinglePerson = !this.isOpenedModal;
    birthDate = new Date(birthDate);
    this.arrEditPerson.push({ ID, surname, name, birthDate });
  }

  //Sets modal State and opens it

  public openModal(): void {
    this.isOpenedModal = !this.isOpenedModal;
  }

  //Close modal from Cancel button in its view

  public closeModal(): void {
    this.isOpenedModal = !this.isOpenedModal;
    this.isEditingSinglePerson = !this.isOpenedModal;
  }

  //Function that inserts Person through click on Circle button with Plus

  public insertPerson(surname: string, name: string, birthDate: Date): void {
    let arrayLength = this.arrayListPersons.length;
    this.actualID = arrayLength;
    let ID: number = this.actualID;
    if (birthDate && surname && name) {
      birthDate = new Date(birthDate);
      this.arrayListPersons.push({ ID, surname, name, birthDate });
      this.isOpenedModal = !this.isOpenedModal;
    }
    else {
      alert('Compila tutti i campi');
    }
  }

}