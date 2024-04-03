import { Component } from '@angular/core';
import { DiagramService } from 'src/app/services/diagram.service';
import { AfterViewInit, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  @ViewChild('zoneFlowChart') zoneFlowChart: ElementRef = new ElementRef('')

  constructor(private diagramService: DiagramService) {}  

  ngAfterViewInit(): void {
    const el = this.zoneFlowChart.nativeElement
    this.diagramService.calculateDimensions(el)
  }
}
