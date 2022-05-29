import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HelperText {
  // Permet d'afficher un nombre bien defini de caractere dans un texte
  strcut(text: string, wordCount: number) {
    let text1 = this.fromHtmlStringToText(text);
    // if text's length lower than wordCound(nbre of word we want), simply return the text
    if (text1 && text1.length < wordCount) {
      return text1 || '';
    }

    // Else if text's length greater than wordCount, return the cutted text with three dots wich is mean text's cutted before the end
    return `${text.substring(0, wordCount)}...`;
  }

  fromHtmlStringToText(htmlString: string): string | null {
    return new DOMParser().parseFromString(htmlString, 'text/html')
      .documentElement.textContent;
  }

  moneyFormat(item: number) {
    const money = new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'XOF',
    });

    return money.format(item);
  }

  urlify(text: string) {
    const urlRegex =
      /(https?:\/\/)?[\w\-~]+(\.[\w\-~]+)+(\/[\w\-~@:%]*)*(#[\w\-]*)?(\?[^\s]*)?/gi;
    if (text) {
      return text.replace(
        urlRegex,
        (url: string) => '<a href="' + url + '">' + url + '</a>'
      );
    } else {
      return text;
    }
  }

  private serializeString = (item: string) => {
    return item.toLocaleLowerCase().replace(' ', '_');
  };

  serializeObjectPropertyKey(object: any) {
    const renamedObject: any = {};

    Object.keys(object).forEach((key) => {
      renamedObject[`${this.serializeString(key)}`] = object[key];
    });

    return renamedObject;
  }

  addPrefixToObjectPropertyKey(object: any, prefix: string) {
    const renamedObject: any = {};

    Object.keys(object).forEach((key) => {
      renamedObject[`${prefix}${key}`] = object[key];
    });

    return renamedObject;
  }

  stringify(element: object) {
    return JSON.stringify(element);
  }
}
