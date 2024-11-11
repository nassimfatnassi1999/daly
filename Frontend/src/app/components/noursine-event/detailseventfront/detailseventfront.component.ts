import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventservicesService } from 'src/app/services/event/eventservices.service';
import { Event } from 'src/app/models/event';
import * as QRCode from 'qrcode';
import { PdfGeneratorService } from 'src/app/services/event/pdf-generator.service';

@Component({
  selector: 'app-detailseventfront',
  templateUrl: './detailseventfront.component.html',
  styleUrls: ['./detailseventfront.component.css']
})
export class DetailseventfrontComponent {
  eventId!: number;
  event!: Event;
  @ViewChild('qrcode', { static: false }) qrcode!: ElementRef;

  constructor( private route: ActivatedRoute,private pdfGeneratorService: PdfGeneratorService, private router :Router,private eventService: EventservicesService) { }

  ngOnInit(): void {
    // Récupérer l'ID de l'événement à partir des paramètres de route
    this.route.params.subscribe(params => {
      this.eventId = params['id'];
      // Utilisez cet ID pour récupérer les détails de l'événement à mettre à jour
      this.eventService.getEventById(this.eventId).subscribe(event => {
        this.event = { ...event };
        console.log("Événement récupéré :", this.event);
      });
    });
  }
  generatePDF(): void {
    this.pdfGeneratorService.generatePDF(this.event);
  }

  ngAfterViewInit(): void {
    const qrData = this.constructQRData(this.event);
    this.generateQRCode(qrData);
  }

  constructQRData(product: Event): string {
    const productId = this.eventId; // Récupérer l'ID d'event
    const url = `http://localhost:4200/detail/${productId}`; // Construire l'URL avec l'ID d'event
    return url;
  }

  generateQRCode(qrData: string): void {
    QRCode.toCanvas(this.qrcode.nativeElement, qrData, (error:any) => {
      if (error) {
        console.error('Erreur lors de la génération du code QR:', error);
      }
    });
  }
}
