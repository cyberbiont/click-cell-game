import { Component, input, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-game-controls',
  imports: [FormsModule],
  templateUrl: './game-controls.html',
  styleUrl: './game-controls.css'
})
export class GameControls {
  gameActive = input.required<boolean>();
  playerScore = input.required<number>();
  computerScore = input.required<number>();
  start = output<number>();

  timeInput = signal(1000);

  onStart() {
    if (this.timeInput() <= 0) {
      alert('Please enter a valid time in milliseconds (greater than 0)');
      return;
    }
    this.start.emit(this.timeInput());
  }
}
