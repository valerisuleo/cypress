import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-async',
  templateUrl: './async.component.html',
  styleUrls: ['./async.component.css']
})
export class AsyncComponent implements OnInit {

  all: any[];
  is404 = false;

  constructor(private service: ApiService) {}

  index() {
    const vm = this;

    vm.service.getAll()
    .subscribe((response) => {
      vm.all = response.json();
      // console.log(vm.all);
    }, error => {
      if (error) {
          vm.is404 = true;
      }

    });
  }

  ngOnInit() {
  }

}
