import { Component } from '@angular/core';
import { DiagramComponent } from '../diagram/diagram.component';
import { DiagramService } from 'src/app/services/diagram.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  menu: Array<any> = []
  constructor(private diagramService: DiagramService) { }

  ngOnInit(): void {
    this.menu = [
      {
        name: 'ANGULAR',
        action: 'get_angular_team'
      },
      {
        name: 'REACT',
        action: 'get_react_team'
      },
      {
        name: 'GENERAL',
        action: 'get_general_team'
      }
    ]
  }

  callSource(): void {
    this.diagramService.setDataFrom('angular')
  }

  callChild(): void {
    this.diagramService.setDataFromChild('angular')
  }

}
