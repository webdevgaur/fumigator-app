import { Injectable, OnInit, inject } from '@angular/core';
import { Firestore, collection, collectionData, addDoc, CollectionReference, DocumentData } from '@angular/fire/firestore';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class CrudService implements OnInit {

  private firestore: Firestore = inject(Firestore);
  licenses$!: Observable<FormData[]>;
  licensesCollection!: CollectionReference<DocumentData>;

  constructor() { 
    this.licensesCollection = collection(this.firestore, 'Companies/Products/Tiles');
    
  }

  ngOnInit(): void {
    
  }

  getFormData(): Observable<FormData[]> {
    return this.licenses$ = collectionData(this.licensesCollection) as Observable<FormData[]>;
  }

  createLicesnse(formData: FormData) {
    // return addDoc(this.licensesCollection, formData);
    addDoc(this.licensesCollection, formData).then((docRef) => {
      console.log("Document written with ID: ", docRef.id);
    }).catch((error) => {
      console.error("Error adding document: ", error);
    });
  }

}
