import { Component, OnInit, inject } from '@angular/core';
import { getAuth } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  
  private fb = inject(FormBuilder);
  fumigationForm!: FormGroup;
  fumigantOptions: string[] = ['Methyl Bromide', 'Phosphine', 'Sulfuryl Fluoride', 'Chloropicrin', 'Methyl Iodide', '1,3-Dichloropropene', 'Ethylene Oxide', 'Other'];
  fumigationDosageOptions: string[] = ['48 g/m^3', '100 g/m^3', '200 g/m^3'];
  fumigationDurationOptions: string[] = ['24 hours', '48 hours', '72 hours'];
  isFumigationGastightOptions: string[] = ['Yes', 'No'];

  // const pattern = /^(?:[A-Z]{4}[0-9]{7})(?:,(?:[A-Z]{4}[0-9]{7}))*$/; --> Regex pattern for comma delimited container numbers

  ngOnInit(): void {
    this.fumigationForm = this.fb.group({
      fumigantName: [''],
      fumigationDate: [''],
      fumigationPlace: [''],
      fumigationLoadingPort: [''],
      fumigationDosage: [''],
      fumigationDuration: [''],
      fumigationTemperature: [''],
      isFumigationGastight: [''],
      fumigationContainerNumbers: [''],
      exporterNameAndAddress: [''],
      importerNameAndAddress: [''],
      cargoDescription: [''],
      destinationPort: [''],
      invoiceNumber: [''],
    });
    // this.fumigationForm.valueChanges.subscribe(console.log);
  }

  get fumigantName() {
    return this.fumigationForm.get('fumigantName');
  }

}
