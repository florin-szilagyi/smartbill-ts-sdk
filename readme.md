# SmartBill TypeScript SDK

[SmartBill API Documentation](https://api.smartbill.ro/)
GitHub: [https://github.com/florin-szilagyi/smartbill-ts-sdk](https://github.com/florin-szilagyi/smartbill-ts-sdk)
---

## English

### Overview
This SDK provides a convenient way to interact with the [SmartBill API](https://api.smartbill.ro/) from Node.js/TypeScript projects. It supports operations for invoices, proforma invoices (estimates), payments, configuration, and stock management.

### Features
- Create, view, and manage invoices and proforma invoices
- Send documents by email
- Download PDFs
- Manage payments and stock
- Full TypeScript support and validation

### Installation
```sh
pnpm add smartbill-ts-sdk
```

### Usage
#### Initialization
```typescript
import { SmartBillSDK } from 'smartbill-ts-sdk';

const sdk = new SmartBillSDK({
  email: process.env.SMARTBILL_EMAIL!,
  token: process.env.SMARTBILL_TOKEN!,
  verbose: true,
});
```

#### Create a Simple Invoice
```typescript
const invoicePayload = {
  companyVatCode: 'RO12345678',
  client: {
    name: 'Test Client',
    vatCode: 'RO12345678',
    isTaxPayer: true,
    address: 'Str. Test nr. 1',
    city: 'Bucharest',
    country: 'Romania',
    email: 'client@example.com',
    saveToDb: false,
  },
  seriesName: 'FCT',
  issueDate: '2025-04-19',
  products: [
    {
      name: 'Product 1',
      measuringUnitName: 'buc',
      currency: 'RON',
      quantity: 1,
      price: 100,
      taxName: 'Normala',
      taxPercentage: 19,
      saveToDb: false,
      isService: false,
    },
  ],
};
const response = await sdk.invoices.create(invoicePayload);
```

#### Download Invoice PDF
```typescript
const pdfBuffer = await sdk.invoices.getPdf({
  cif: 'RO12345678',
  seriesname: 'FCT',
  number: '123',
});
// Save pdfBuffer to file if needed
```

#### Create a Proforma Invoice (Estimate)
```typescript
const estimatePayload = {
  companyVatCode: 'RO12345678',
  client: { ... }, // same as above
  seriesName: 'PFA',
  issueDate: '2025-04-19',
  dueDate: '2025-05-19',
  products: [ ... ],
};
const response = await sdk.estimates.create(estimatePayload);
```

#### Send Document by Email
```typescript
await sdk.invoices.sendEmail({
  companyVatCode: 'RO12345678',
  seriesName: 'FCT',
  number: '123',
  type: 'invoice',
  to: 'client@example.com',
});
```

---

## Romanian / Română

### Prezentare generală
Acest SDK oferă o modalitate simplă de a interacționa cu [API-ul SmartBill](https://api.smartbill.ro/) din proiecte Node.js/TypeScript. Permite operațiuni pentru facturi, proforme, plăți, configurare și gestiune stocuri.

### Funcționalități
- Creare, vizualizare și gestionare facturi și proforme
- Trimitere documente pe email
- Descărcare PDF-uri
- Administrare plăți și stocuri
- Validare și suport complet TypeScript

### Instalare
```sh
pnpm add smartbill-ts-sdk
```

### Utilizare
#### Inițializare
```typescript
import { SmartBillSDK } from 'smartbill-ts-sdk';

const sdk = new SmartBillSDK({
  email: process.env.SMARTBILL_EMAIL!,
  token: process.env.SMARTBILL_TOKEN!,
  verbose: true,
});
```

#### Emitere Factură Simplă
```typescript
const payloadFactura = {
  companyVatCode: 'RO12345678',
  client: {
    name: 'Client Test',
    vatCode: 'RO12345678',
    isTaxPayer: true,
    address: 'Str. Test nr. 1',
    city: 'București',
    country: 'România',
    email: 'client@example.com',
    saveToDb: false,
  },
  seriesName: 'FCT',
  issueDate: '2025-04-19',
  products: [
    {
      name: 'Produs 1',
      measuringUnitName: 'buc',
      currency: 'RON',
      quantity: 1,
      price: 100,
      taxName: 'Normala',
      taxPercentage: 19,
      saveToDb: false,
      isService: false,
    },
  ],
};
const response = await sdk.invoices.create(payloadFactura);
```

#### Descărcare PDF Factură
```typescript
const pdfBuffer = await sdk.invoices.getPdf({
  cif: 'RO12345678',
  seriesname: 'FCT',
  number: '123',
});
// Salvează pdfBuffer într-un fișier dacă este nevoie
```

#### Emitere Proformă
```typescript
const payloadProforma = {
  companyVatCode: 'RO12345678',
  client: { ... }, // la fel ca mai sus
  seriesName: 'PFA',
  issueDate: '2025-04-19',
  dueDate: '2025-05-19',
  products: [ ... ],
};
const response = await sdk.estimates.create(payloadProforma);
```

#### Trimitere Document pe Email
```typescript
await sdk.invoices.sendEmail({
  companyVatCode: 'RO12345678',
  seriesName: 'FCT',
  number: '123',
  type: 'invoice',
  to: 'client@example.com',
});
```

---

## References
- [Official SmartBill API Docs](https://api.smartbill.ro/)
- See `tests/` for more advanced usage and edge cases.

---