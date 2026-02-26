import { Component, output } from '@angular/core';

@Component({
  selector: 'app-modal-wrapper',
  templateUrl: './modal-wrapper.html',
  styleUrl: './modal-wrapper.css',
  host: {
    '(click)': 'onOverlayClick()'
  }
})
export class ModalWrapper {
  closeRequested = output<void>();

  onOverlayClick() {
    this.closeRequested.emit();
  }
}
