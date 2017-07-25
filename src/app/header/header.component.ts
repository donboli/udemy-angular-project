import {
  Component,
  Output,
  EventEmitter
} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  @Output() navigate: EventEmitter<string> = new EventEmitter();

  onNavigate(option) {
    this.navigate.emit(option);
  }
}
