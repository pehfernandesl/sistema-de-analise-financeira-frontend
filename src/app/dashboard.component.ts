import { Component, OnInit } from '@angular/core';

import { OPERACAO_LOOKUP_TABLE } from './extratos/relatorio/tp-operacao.pipe';
import { RelatorioService } from './extratos/relatorio/relatorio.service';

@Component({
  selector: 'safi-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  dados: any[];

  constructor(private relatorioService: RelatorioService) {}

  ngOnInit(): void {
    this.relatorioService.getTransacoesForChart().subscribe((dados) => {
      this.dados = this.createChartFromRawData(dados);
    });
  }

  public createChartFromRawData(rawData: any[]): any {
    const labels = [];
    const values = [];
    const bgColors = [];
    const hoverBgColors = [];

    rawData.forEach((data) => {
      labels.push(OPERACAO_LOOKUP_TABLE[`value_${data.tipo}_`].label);
      values.push(data.valor);
      bgColors.push(OPERACAO_LOOKUP_TABLE[`value_${data.tipo}_`].color);
      hoverBgColors.push('#FFFFFF');
    });

    return {
      labels,
      datasets: [
        {
          data: values,
          backgroundColor: bgColors,
          hoverBackgroundColor: hoverBgColors
        }
      ]
    };
  }
}
// this.data = {
//   labels: ['A', 'B', 'C'],
//   datasets: [
//     {
//       data: [300, 50, 100],
//       backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
//       hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
//     }
//   ]
// };
