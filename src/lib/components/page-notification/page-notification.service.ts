import { ApplicationProblemType } from '../../base/error/types/application-problem.type';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng';
import { NotificationProvider } from '../../base/error/providers/notification.provider';

@Injectable({
  providedIn: 'root'
})
export class PageNotificationService extends NotificationProvider {
  private readonly successSeverity = 'success';

  private readonly infoSeverity = 'info';

  private readonly warnSeverity = 'warn';

  private readonly errorSeverity = 'error';

  private readonly createMsg = 'Registro incluído com sucesso!';

  private readonly updateMsg = 'Registro alterado com sucesso!';

  private readonly deleteMsg = 'Registro excluído com sucesso!';

  constructor(private messageService: MessageService) {
    super();
  }

  addCreateMsg(title?: string) {
    this.addSuccessMessage(this.createMsg, title);
  }

  addSuccessMessage(message: string, title?: string) {
    this.addMsg(this.successSeverity, message, title);
  }

  private addMsg(severity: string, msg: string, title?: string) {
    this.messageService.add({
      severity,
      summary: title,
      detail: msg
    });
  }

  addUpdateMsg(title?: string) {
    this.addSuccessMessage(this.updateMsg, title);
  }

  addDeleteMsg(title?: string) {
    this.addSuccessMessage(this.deleteMsg, title);
  }

  addInfoMessage(message: string, title?: string) {
    this.addMsg(this.infoSeverity, message, title);
  }

  addWarnMessage(message: string, title?: string) {
    this.addMsg(this.warnSeverity, message, title);
  }

  addErrorMessage(message: string, title?: string) {
    this.addMsg(this.errorSeverity, message, title);
  }

  addErrorProblem(problem: ApplicationProblemType): void {
    this.addMsg(this.errorSeverity, problem.detail, problem.title);
  }
}
