import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Acoes } from './modelo/acoes';
import { AcoesService } from './acoes.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { merge, Subscription } from 'rxjs';
import { debounceTime, distinct, distinctUntilChanged, filter, map, pluck, switchMap, tap } from 'rxjs/operators'

const ESPERA_DIGITACAO = 300;

@Component({
  selector: 'app-acoes',
  templateUrl: './acoes.component.html',
  styleUrls: ['./acoes.component.css'],
})
export class AcoesComponent {
  acoesInput = new FormControl();
  todasAcoes$ = this.acoesService.getAcoes().pipe(
    tap(() => console.log("fluxo inicial"))
    );

  filtroPeloInput$ = this.acoesInput.valueChanges.pipe(
    debounceTime(ESPERA_DIGITACAO),
    tap(() => console.log("fluxo do filtro")),
    filter( (valorDigitado => valorDigitado.length >= 3 || !valorDigitado.length)),
    distinctUntilChanged(),
    switchMap((valorDigitado) => this.acoesService.getAcoes(valorDigitado) )
  )

  acoes$ = merge(this.todasAcoes$,  this.filtroPeloInput$);

  constructor(private acoesService: AcoesService) {}
}
