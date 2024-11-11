import { Injectable } from '@angular/core';
import * as jsPDF from 'jspdf'; 

@Injectable({
  providedIn: 'root'
})
export class PdfGeneratorService {

  constructor() { }
  generatePDF(event: any): void {
    const doc = new jsPDF.default();

    // Ajoutez les détails de l'événement au PDF
    doc.text(`Title: ${event.title}`, 10, 10);
    doc.text(`Topic: ${event.topic}`, 10, 20);
    doc.text(`Type Event: ${event.type}`, 10, 30);
    doc.text(`Date: ${event.date}`, 10, 40);
    doc.text(`Location: ${event.location}`, 10, 50);
  
    // Télécharger le PDF
    doc.save('event_details.pdf');
  }
}
