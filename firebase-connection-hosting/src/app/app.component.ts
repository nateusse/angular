import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TodoComponent } from './todos/components/todo/todo.component';
import { TodosComponent } from "./todos/todos.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, CommonModule, TodoComponent, TodosComponent]
})
export class AppComponent {
  title = 'firebase-connection-hosting';
}
