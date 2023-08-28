import { Router } from '@angular/router';
import { ClientService } from 'src/app/shared/client.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private clienteService: ClientService,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  profileForm = this.formBuilder.group({
    cpf: [''],
    password: ['']
  });

  ngOnInit() {
  }

  async onSubmit() {
    try {

      const result = await this.clienteService.login(this.profileForm.value);
      console.log(`Login efetuado: ${result}`);

      // navego para a rota vazia novamente
      this.router.navigate(['']);
    } catch (error) {
      console.error(error);
    }
  }
}
