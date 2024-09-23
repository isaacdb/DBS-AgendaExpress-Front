
import { Confirmation } from 'primeng/api';

            
export const DialogUtil = { getConfirmationDialog }

type AcceptCallback = () => void;
type DeclineCallback = () => void;

function getConfirmationDialog(
  msg: string, 
  onAccept: AcceptCallback, 
  onDecline?: DeclineCallback
): Confirmation {
    return {
        target: event.target as EventTarget,
        message: msg,
        header: 'Confirmação',
        icon: 'pi pi-exclamation-triangle',
        acceptIcon:"none",
        rejectIcon:"none",
        rejectButtonStyleClass:"p-button-text",
        accept: () => onAccept(),
        reject: () => onDecline()
    }
}


// @Component({
//     selector: 'confirm-dialog-basic-demo',
//     templateUrl: './confirm-dialog-basic-demo.html',
//     standalone: true,
//     imports: [ConfirmDialogModule, ToastModule, ButtonModule],
//     providers: [ConfirmationService, MessageService]
// })
// export class ConfirmDialogBasicDemo {
//     constructor(private confirmationService: ConfirmationService, private messageService: MessageService) {}

//     confirm1(event: Event) {
//         this.confirmationService.confirm({
//             target: event.target as EventTarget,
//             message: 'Are you sure that you want to proceed?',
//             header: 'Confirmation',
//             icon: 'pi pi-exclamation-triangle',
//             acceptIcon:"none",
//             rejectIcon:"none",
//             rejectButtonStyleClass:"p-button-text",
//             accept: () => {
//                 this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted' });
//             },
//             reject: () => {
//                 this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
//             }
//         });
//     }

//     confirm2(event: Event) {
//         this.confirmationService.confirm({
//             target: event.target as EventTarget,
//             message: 'Do you want to delete this record?',
//             header: 'Delete Confirmation',
//             icon: 'pi pi-info-circle',
//             acceptButtonStyleClass:"p-button-danger p-button-text",
//             rejectButtonStyleClass:"p-button-text p-button-text",
//             acceptIcon:"none",
//             rejectIcon:"none",

//             accept: () => {
//                 this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Record deleted' });
//             },
//             reject: () => {
//                 this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
//             }
//         });
//     }
// }