import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [FormsModule],
  selector: 'app-labs',
  styleUrl: './labs.scss',
  templateUrl: './labs.html',
})
export class Labs {
    protected readonly name = 'Nicolas Delgado';
  protected readonly age = 24;
  protected readonly email = 'nicolas@ejemplo.com';
  protected readonly number1: number = 10;
  protected readonly number2: number = 20;
  protected readonly nombreCampo = 'nombre';
  protected nombreValor = '';

  protected showSumAlert(): void {
    alert(`La suma es: ${this.number1 + this.number2}`);
  }
}
