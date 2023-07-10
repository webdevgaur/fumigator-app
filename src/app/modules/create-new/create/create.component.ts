import { Component, OnInit, inject } from '@angular/core';
import { getAuth } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CrudService } from 'src/app/services/crud.service';
import jsPDF, { jsPDFAPI } from 'jspdf';
import html2canvas from 'html2canvas';
import domtoimage from 'dom-to-image';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  private fb = inject(FormBuilder);
  private db = inject(CrudService);
  isReadyForSubmit: boolean = false;
  fumigationForm!: FormGroup;
  fumigantOptions: string[] = ['Methyl Bromide', 'Phosphine', 'Sulfuryl Fluoride', 'Chloropicrin', 'Methyl Iodide', '1,3-Dichloropropene', 'Ethylene Oxide', 'Other'];
  fumigationDosageOptions: string[] = ['48 g/m^3', '100 g/m^3', '200 g/m^3'];
  fumigationDurationOptions: string[] = ['24 hours', '48 hours', '72 hours'];
  isFumigationGastightOptions: string[] = ['Yes', 'No'];
  packagingMaterialOptions: string[] = ['Pallet Packing', 'Plastic Packing', 'Wood Packing', 'Other'];
  finalFormData!: FormData;
  certificationDeclaration!: string;

  doc = new jsPDF();


  // const pattern = /^(?:[A-Z]{4}[0-9]{7})(?:,(?:[A-Z]{4}[0-9]{7}))*$/; --> Regex pattern for comma delimited container numbers

  ngOnInit(): void {

    this.buildForm();
    this.initialiseFormForDemo();
    this.certificationDeclaration = `This is to certify that the goods described below were treated in accordance with the fumigation treatment requirements of importing country ${this.destinationPort?.value} and declared that the consignment has been verified free of impervious surfaces/layers such as plastic wrapping or laminated plastic films, lacquered or painted surfaces, aluminium foil, tarred or waxed paper etc. that may adversely affect the penetration of the fumigant, prior to fumigation. The Certificate is valid for the consignments shipped within 21 days from the date of completion of fumigation.`;
    // this.doc.text('Hello world!', 10, 10);
  }

  buildForm() {
    this.fumigationForm = this.fb.group({
      treatmentCertificateNumber: [''],
      brandName: [''],
      dateOfIssue: [''],
      fumigantName: [this.fumigantOptions[0]],
      fumigationDate: [''],
      fumigationPlace: [''],
      fumigationLoadingPort: [''],
      fumigationDosage: [this.fumigationDosageOptions[0]],
      fumigationDuration: [this.fumigationDurationOptions[0]],
      fumigationTemperature: [''],
      isFumigationGastight: [this.isFumigationGastightOptions[0]],
      fumigationContainerNumbers: [''],
      exporterNameAndAddress: [''],
      importerNameAndAddress: [''],
      cargoDescription: [''],
      destinationPort: ['temp value'],
      invoiceNumber: [''],
      cotainerHeight: [''],
      containerWidth: [''],
      materialQuantityInfo: this.fb.group({
        noOfPallets: [''],
        noOfBoxes: [''],
        totalArea: [''],
      }),
      materialWeightInfo: this.fb.group({
        netWeight: [''],
        grossWeight: [''],
      }),
      packagingMaterial: [this.packagingMaterialOptions[0]],
    });
  }

  initialiseFormForDemo() {
    let currentDate = new Date();
    let tomorrowDate = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
    this.fumigationForm.patchValue({
      treatmentCertificateNumber: 'CF/AEJEA/LC/065',
      brandName: 'Demo Brand',
      dateOfIssue: tomorrowDate,
      fumigantName: this.fumigantOptions[0],
      fumigationDate: currentDate,
      fumigationPlace: 'Demo Place',
      fumigationLoadingPort: 'Demo Loading Port',
      fumigationDosage: this.fumigationDosageOptions[0],
      fumigationDuration: this.fumigationDurationOptions[0],
      fumigationTemperature: 21,
      isFumigationGastight: this.isFumigationGastightOptions[0],
      fumigationContainerNumbers: 'BAXU2623527, BAXU2638907, UNIU2074924, BAXU2651072, BAXU2622053, UNIU2072177, BAXU2658478, BAXU2653497, BAXU2624539, BAXU2669030, BAXU2604260, BAXU2615239, BAXU2659561',
      exporterNameAndAddress: `LAVISH CERAMICS,
      8-A NATIONAL HIGHWAY,
      LAKHDHIRPUR ROAD,
      MORBI. GUJARAT, INDIA`,
      importerNameAndAddress: `TO THE ORDER
      (*Consignment details as declared by shipper.)`,
      cargoDescription: 'Glazed Porcelain Tile - HSN CODE69072100',
      destinationPort: 'JEBEL ALI UAE',
      invoiceNumber: `LC-23-019 DTD.${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`,
      cotainerHeight: '13',
      containerWidth: '20',
      materialQuantityInfo: {
        noOfPallets: '351',
        noOfBoxes: '14564',
        totalArea: '17476.80',
      },
      materialWeightInfo: {
        netWeight: '356750.68',
        grossWeight: '363770.68',
      },
      packagingMaterial: this.packagingMaterialOptions[0],
    });
  }

  submitInfo() {
    this.finalFormData = this.fumigationForm.value;
    this.isReadyForSubmit = true;
    setTimeout(() => {
      this.print();
    }, 0);
    // this.db.createLicesnse(this.finalFormData);
    // this.fumigationForm.reset();
    // this.doc.text('Hello world!', 10, 10);
    
    // html2canvas(document.querySelector('#fumigation-certificate') as HTMLElement,);
    // this.doc.save('a4.pdf');
  }

  print() {
    var node: Node = document.getElementById('license-html') as HTMLElement;
    var options = {
      quality: 1,
      bgcolor: 'white',
    };
    domtoimage.toJpeg(node, options).then(function (dataUrl: any) {
      var doc = new jsPDF("p", "mm", undefined, false);
      doc.addImage(dataUrl, 'JPEG', 4 , 10, 200, 160);
      doc.save(`Sample license - ${Math.floor(Math.random() * 1000)}.pdf`);
    });
  }

  get noOfPallets() {
    return this.fumigationForm.get('materialQuantityInfo.noOfPallets');
  }

  get noOfBoxes() {
    return this.fumigationForm.get('materialQuantityInfo.noOfBoxes');
  }

  get totalArea() {
    return this.fumigationForm.get('materialQuantityInfo.totalArea');
  }

  get netWeight() {
    return this.fumigationForm.get('materialWeightInfo.netWeight');
  }

  get grossWeight() {
    return this.fumigationForm.get('materialWeightInfo.grossWeight');
  }

  get treatmentCertificateNumber() {
    return this.fumigationForm.get('treatmentCertificateNumber');
  }

  get brandName() {
    return this.fumigationForm.get('brandName');
  }

  get dateOfIssue() {
    return this.fumigationForm.get('dateOfIssue');
  }

  get fumigantName() {
    return this.fumigationForm.get('fumigantName');
  }

  get fumigationDate() {
    return this.fumigationForm.get('fumigationDate');
  }

  get fumigationPlace() {
    return this.fumigationForm.get('fumigationPlace');
  }

  get fumigationLoadingPort() {
    return this.fumigationForm.get('fumigationLoadingPort');
  }

  get fumigationDosage() {
    return this.fumigationForm.get('fumigationDosage');
  }

  get fumigationDuration() {
    return this.fumigationForm.get('fumigationDuration');
  }

  get fumigationTemperature() {
    return this.fumigationForm.get('fumigationTemperature');
  }

  get isFumigationGastight() {
    return this.fumigationForm.get('isFumigationGastight');
  }

  get fumigationContainerNumbers() {
    return this.fumigationForm.get('fumigationContainerNumbers');
  }

  get exporterNameAndAddress() {
    return this.fumigationForm.get('exporterNameAndAddress');
  }

  get importerNameAndAddress() {
    return this.fumigationForm.get('importerNameAndAddress');
  }

  get cargoDescription() {
    return this.fumigationForm.get('cargoDescription');
  }

  get destinationPort() {
    return this.fumigationForm.get('destinationPort');
  }

  get invoiceNumber() {
    return this.fumigationForm.get('invoiceNumber');
  }

  get cotainerHeight() {
    return this.fumigationForm.get('cotainerHeight');
  }

  get containerWidth() {
    return this.fumigationForm.get('containerWidth');
  }

  get packagingMaterial() {
    return this.fumigationForm.get('packagingMaterial');
  }


}
