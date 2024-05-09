import { DiagramService } from 'src/app/services/diagram.service';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import * as shape from 'd3-shape';
import { Edge, Graph, GraphComponent, Layout } from '@swimlane/ngx-graph';
import { DagreNodesOnlyLayout } from 'src/app/services/layout.service';
import { stepRound } from 'src/app/services/stepRound';

@Component({
  selector: 'app-diagram',
  templateUrl: './diagram.component.html',
  styleUrls: ['./diagram.component.css']
})
export class DiagramComponent {
  @ViewChild('myChart') child!: GraphComponent;
  dimensions: [number, number] = [0, 0];
  showRender: boolean = false;
  dataNode: Array<any> = [] //TODO--> tarjetas
  dataLink: Array<any> = [] //TODO: ---> lineas verdes

  curve = stepRound;

  public layoutSettings = {
    orientation: 'LR' //TODO: Top-to-bottom  --> Left to Right
  };
  public layout: Layout = new DagreNodesOnlyLayout();

  constructor(private diagramService: DiagramService, private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.diagramService.zoneDimensions$.subscribe(([w, h]) => {
      if ((w) && (h)) {
        this.dimensions = [w, h]
        this.showRender = true;

        this.cd.detectChanges()
        this.callAfterLoad()
      }
    })

    this.diagramService.data$.subscribe(data => {
      if (data) {
        this.dataNode = [data] //TODO 1 valor!
      }
    })

    this.diagramService.dataChild$.subscribe(data => {
      if (data) {
        this.dataNode = [...this.dataNode, ...data.nodes]
        this.dataLink = [...this.dataLink, ...data.links]
        console.log('data childs', data)
      }
    })

    this.diagramService.dataYoutubers$.subscribe(data => {
      console.log('....', data);

      if (data) {
        this.dataNode = [...this.dataNode, ...data.nodes]
        this.dataLink = [...this.dataLink, ...data.links]
        console.log('data youtubers', data)
      }
    })

  }

  callAfterLoad(): void {

    /* Recalculate Positions of endpoints while moving / dragging, added i as an identifier that it was moved */

    // tslint:disable-next-line:only-arrow-functions
    (this.child.layout as Layout).updateEdge = function (graph: Graph, edge: Edge): Graph {

      const sourceNode: any = graph.nodes.find(n => n.id === edge.source);
      const targetNode: any = graph.nodes.find(n => n.id === edge.target);

      // centered so i do not bother if its up oder downwards bot -1
      const dir = sourceNode.position.y <= targetNode.position.y ? -1 : -1;
      // Compute positions while dragging here
      const startingPoint = {
        x: sourceNode.position.x - dir * (sourceNode.dimension.height / 2) - 50,
        i: true,
        y: sourceNode.position.y,

      };
      const endingPoint = {
        x: targetNode.position.x - dir * (targetNode.dimension.height / 2) - 300,
        i: true,
        y: targetNode.position.y,

      };

      edge.points = [startingPoint, endingPoint];
      console.log([startingPoint, endingPoint]);

      return graph;
    };

    /* Calculate Initial position of the Arrows, on first draw and add only amount of x if not modified or not dragged*/
    this.child.generateLine = function (points: any): any {

      const lineFunction = shape
        .line<any>()
        .x(d => {
          let addVal = 0;
          if (d.i === undefined) {
            addVal = 0;
          }
          const xval = d.x + addVal;
          return xval;
        })
        .y(d => d.y)
        .curve(this.curve);
      return lineFunction(points);
    };
  }
}
