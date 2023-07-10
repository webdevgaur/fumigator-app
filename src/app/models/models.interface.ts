export interface FormData {
    treatmentCertificateNumber: string;
    brandName: string;
    dateOfIssue: Date;
    fumigantName: string;
    fumigationDate: Date;
    fumigationPlace: string;
    fumigationLoadingPort: string;
    fumigationDosage: string;
    fumigationDuration: string;
    fumigationTemperature: string;
    isFumigationGastight: string;
    fumigationContainerNumbers: string;
    exporterNameAndAddress: string;
    importerNameAndAddress: string;
    cargoDescription: string;
    destinationPort: string;
    invoiceNumber: string;
    cotainerHeight: string;
    containerWidth: string;
    materialQuantityInfo: {
        noOfPallets: string;
        noOfBoxes: string;
        totalArea: string;
    };
    materialWeightInfo: {
        netWeight: string;
        grossWeight: string;
    };
    packagingMaterial: string;
}