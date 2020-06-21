import { environment } from './../../../environments/environment';
import { Component, OnInit } from '@angular/core';
import { ReceitaService } from './receita.service';
import { PageNotificationService } from '@components/page-notification/page-notification.service';

@Component({
  selector: 'safi-receita-lista',
  templateUrl: './receita-lista.component.html'
})
export class ReceitaListaComponent implements OnInit {
  public readonly api = `${environment.apiUrl}/receitas`;
  private receitas: any[];

  constructor(private receitaService: ReceitaService) {}

  ngOnInit(): void {
    this.refreshReceitas();
  }

  public onDatabaseButtonClick(event): void {
    console.log(event);
  }

  public refreshReceitas(): void {
    this.receitaService.getReceitas().subscribe((receitas) => {
      this.receitas = receitas;
    });
  }

  public getReceitas(): any[] {
    return this.receitas;
  }
}
