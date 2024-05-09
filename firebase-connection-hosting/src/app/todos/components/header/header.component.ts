import { Component, inject } from '@angular/core';
import { TodosService } from '../../services/todos.service';
import { TodosFirebaseService } from '../../services/todosFirebase.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  todosService = inject(TodosService);
  todosFirebaseService = inject(TodosFirebaseService);
  text: string = '';

  changeText(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.text = target.value;
  }

  addTodo(): void {
    this.todosFirebaseService.addTodo(this.text).subscribe((addedTodoId) => {
      this.todosService.addTodo(this.text, addedTodoId);
      this.text = '';
    });
  }
}
