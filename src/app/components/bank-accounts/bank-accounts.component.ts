import { Component, OnInit } from '@angular/core';
import { BankAccount } from 'src/app/interfaces/bankAccount';
import { BankAccountsService } from 'src/app/services/bank-accounts.service';

@Component({
  selector: 'app-bank-accounts',
  templateUrl: './bank-accounts.component.html',
  styleUrls: ['./bank-accounts.component.css']
})
export class BankAccountsComponent implements OnInit {

  bankAccounts: BankAccount[] = [];

  filterAccounts: BankAccount[] = [];
  
  search:string='';

  constructor(private bankAccountsService: BankAccountsService) {

  }

  ngOnInit(): void {
    this.bankAccountsService.getAccounts().subscribe((data: any) => {
      this.bankAccounts = data;
      this.filterAccounts=data;
    }, error => {
      return;
    })
  }

  onAccountSearch(e: string) {

    let searchInput: string = e;

    this.filterAccounts = this.bankAccounts.filter(account => {
      return account.accountNumber.toString().includes(searchInput);
    })
  }

  getBankName(bankNumber: number) {

    switch (bankNumber) {

      case 0:
        return "Leumi";

      case 1:
        return "Boalim";

      case 2:
        return "Discont";

      case 3:
        return "Masad";

      case 4:
        return "Mezrahi";

      default:
        return "";
    }

  }

}
