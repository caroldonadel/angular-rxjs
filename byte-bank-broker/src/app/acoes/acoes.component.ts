import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Acoes } from './modelo/acoes';
import { AcoesService } from './acoes.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Subscription } from 'rxjs';
import { map, pluck, switchMap, tap } from 'rxjs/operators'

@Component({
  selector: 'app-acoes',
  templateUrl: './acoes.component.html',
  styleUrls: ['./acoes.component.css'],
})
export class AcoesComponent {
  acoesInput = new FormControl();
  acoes$ = this.acoesInput.valueChanges.pipe(
    tap(console.log),
    switchMap((valorDigitado)=> this.acoesService.getAcoes(valorDigitado)),
    tap(console.log)
  );

  constructor(private acoesService: AcoesService) {}
}
