import { Component, OnInit } from '@angular/core';
import { CreditCard } from 'src/app/interfaces/creditCard';
import { CreditCardsService } from 'src/app/services/credit-cards.service';

@Component({
  selector: 'app-credit-cards',
  templateUrl: './credit-cards.component.html',
  styleUrls: ['./credit-cards.component.css']
})
export class CreditCardsComponent implements OnInit {

  creditCards:CreditCard[]=[];
  filteredCards:CreditCard[]=[];

  constructor(private creditCardsService:CreditCardsService) { 

  }

  ngOnInit(): void {
    this.creditCardsService.getCards().subscribe((data:any)=>{
      this.creditCards=data;
      this.filteredCards=data;
    },error=>{
      if(error)
      return;
    })
  }

  onCardSearch(e: any) {

    let searchInput: number = e.target.value;

    this.filteredCards = this.creditCards.filter(card => {
      return card.number==searchInput;
    })
  }


}
