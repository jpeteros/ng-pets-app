import { Component, OnInit } from '@angular/core';
import { OwnerService } from '../../services/owner.service';
import { Owner } from '../../entities/owner.entity';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  h1Style: boolean = false;
  loading: boolean;
  owners: Owner[];
  constructor(private ownerService: OwnerService) { }

  ngOnInit() {
    this.loading = true;
    this.ownerService.findAllOwners().then(
      res => {
        this.owners = res;
        this.loading = false;
      },
      error => {
        console.log(error);
      }
    );
  }

}
