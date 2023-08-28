import { Component } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar'; // Importe o MatSnackBar
import { Client } from 'src/app/models/client';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-form-save-client',
  templateUrl: './form-save-client.component.html',
  styleUrls: ['./form-save-client.component.css']
})
export class FormSaveClientComponent {
  form: FormGroup;
  client!: Client;

  constructor(private fb: FormBuilder, private clientService: ClientService, private snackBar: MatSnackBar) {
    this.form = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      cpf: ['', [Validators.required, this.validateCpf]]
    });
  }

  async onSubmit() {
    if (this.form.valid) {
      this.client = this.form.value;
      this.client.password = this.form.value.cpf;

      try {
        await this.saveClient(this.client);
        this.snackBar.open('Cliente salvo com sucesso!', 'Fechar', {
          duration: 3000, // Duração da mensagem em milissegundos
        });
      } catch (error) {
        console.log(error);
      }
    }
  }
  

  saveClient(client: Client) {
    return this.clientService.saveClient(client).subscribe(data => {

    }); 
  }



  validateCpf(control: any) {
    const cpf = control.value.replace(/\D/g, ''); // Remove caracteres não numéricos
    if (cpf.length !== 11) {
      return { invalidCpf: true };
    }

    let sum = 0;
    let remainder;

    for (let i = 1; i <= 9; i++) {
      sum += parseInt(cpf.substring(i - 1, i), 10) * (11 - i);
    }

    remainder = (sum * 10) % 11;

    if ((remainder === 10) || (remainder === 11)) {
      remainder = 0;
    }

    if (remainder !== parseInt(cpf.substring(9, 10), 10)) {
      return { invalidCpf: true };
    }

    sum = 0;
    for (let i = 1; i <= 10; i++) {
      sum += parseInt(cpf.substring(i - 1, i), 10) * (12 - i);
    }

    remainder = (sum * 10) % 11;

    if ((remainder === 10) || (remainder === 11)) {
      remainder = 0;
    }

    if (remainder !== parseInt(cpf.substring(10, 11), 10)) {
      return { invalidCpf: true };
    }

    return null; // CPF válido
  }
}
