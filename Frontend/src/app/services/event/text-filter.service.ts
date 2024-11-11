import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class TextFilterService {

  constructor() { }
  filterText(text: string): string {
    const badWords = ['badword', 'badword2', 'badword3'];
    let filteredText = text;
    for (const word of badWords) {
      filteredText = filteredText.replace(new RegExp(word, 'gi'), '*'.repeat(word.length));
    }
    return filteredText;
  }
  
}
