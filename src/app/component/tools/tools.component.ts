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
  isFirstOpen: boolean = true;
  input: string = 'Cat';
  constructor(
    private ownerService: OwnerService
  ) { }

  ngOnInit() {
    this.loading = true;
    this.ownerService.findAllOwners().then(
      res => {
        this.owners = res;
        this.loading = false;
        this.segregateGender(this.owners, this.input);
      },
      error => {
        console.log(error);
      }
    );
  }

  segregateGender = (ownerList: any[] , input?: string) => {
    this.malePetNameList = [];
    this.femalePetNameList = [];
    const filteredMale = ownerList.filter((entry) => {
      return (entry.gender === 'Male');
    });
    const filteredFemale = ownerList.filter((entry) => {
      return (entry.gender === 'Female');
    });

    if (filteredMale) {
      this.generatePetName(filteredMale, 'male', input);
    }
    if (filteredFemale) {
      this.generatePetName(filteredFemale, 'female', input);
    }
  }

  generatePetName = (genderPetNames: any[], gender?: string, keyInPet?: string) => {
    const petNames = genderPetNames.map(o => {
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
      for (let j = 0 ; j < innerName.length; j++) {
        switch (gender) {
          case 'male':
            if (innerName[j].type === keyInPet) {
              this.malePetNameList.push(innerName[j].name ) ;
            }
            this.malePetNameList.sort();
            break;
          case 'female':
            if (innerName[j].type === keyInPet) {
              this.femalePetNameList.push(innerName[j].name);
            }
            this.femalePetNameList.sort();
            break;
          default:
          this.malePetNameList.push('Empty');
          this.femalePetNameList.push('Empty');
        }
      }
    }

  }


  triggerPetName(e: any, i: string) {
    this.segregateGender(this.owners, i );
  }


}