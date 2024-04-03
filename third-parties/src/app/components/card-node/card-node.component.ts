import { Component, Input } from '@angular/core';
import { DiagramService } from 'src/app/services/diagram.service';

@Component({
  selector: 'app-card-node',
  templateUrl: './card-node.component.html',
  styleUrls: ['./card-node.component.css']
})
export class CardNodeComponent {
  @Input() dataIn: any;
  constructor(private diagramService: DiagramService) { }

  ngOnInit(): void {
  }

  callChilds(src: string, action: string): void {
    switch (action) {
      case 'youtubers':
        this.diagramService.setDataYoutubers(src)
        break;
      default:
        this.diagramService.setDataFromChild(src)
        break
    }
  }
}
