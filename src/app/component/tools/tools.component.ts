import { Component, OnInit } from '@angular/core';
import { OwnerService } from '../../services/owner.service';
import { Owner } from '../../entities/owner.entity';

@Component({
  templateUrl: './tools.component.html',
  selector: 'app-tools',
  styleUrls: ['./tools.component.scss']
})
export class ToolsComponent implements OnInit {
  loading: boolean;
  owners: Owner[];
  malePetNameList: string[] = [];
  femalePetNameList: string[] = [];
  constructor(
    private ownerService : OwnerService
  ) { }

  ngOnInit() {
    this.loading = true;
    this.ownerService.findAllOwners().then(
      res => {
        this.owners = res;
        this.loading = false;
        this.segregateGender(res);
      },
      error => {
        console.log(error);
      }
    );
  }

  segregateGender = (ownerList: any[]) => {
    const filteredMale = ownerList.filter((entry) => {
      return (entry.gender === 'Male');
    });

    if(filteredMale){
      this.generateMalePetName(filteredMale);
    }
    const petNames = filteredMale.map(o => {
        return o.pets;
    });
    Object.keys(petNames).forEach((key) => (petNames[key] == null) && delete petNames[key]);
    const filtered = petNames.filter((el) => {
      return el != null;
    });
  // tslint:disable-next-line: prefer-for-of
    for(let i = 0 ; i < filtered.length; i++) {
      const innerName = filtered[i];
  // tslint:disable-next-line: prefer-for-of
      for(let j = 0 ; j < innerName.length; j++) {
        this.malePetNameList.push(innerName[j].name);
      }
      this.malePetNameList.sort();
    }

    console.log(this.malePetNameList);

  }

  generateMalePetName = (malePetNames: string[]) => {

  }


}