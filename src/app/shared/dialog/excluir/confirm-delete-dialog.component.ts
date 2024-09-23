import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-confirm-delete-dialog',
  templateUrl: './confirm-delete-dialog.component.html',
  styleUrls: ['./confirm-delete-dialog.component.css']
})
export class ConfirmDeleteDialogComponent {
  @Input() visible: boolean = false;
  @Input() itemName: string | null = null;
  @Input() itemId: string | null = null;  
  @Output() confirm = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<string>();

  onConfirm(): void {
    this.confirm.emit();
    this.visible = false;
  }

  onCancel(): void {
    this.cancel.emit(this.itemId);
    this.visible = false;
  }
}
