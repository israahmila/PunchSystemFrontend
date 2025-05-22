import { Injectable } from '@angular/core';
import { Poincon } from './poincon.model';

@Injectable({
  providedIn: 'root'
})
export class PoinconWizardService {
  step1Data: Partial<Poincon> | null = null;
  step2Data: { nombre: number; base: Partial<Poincon> } | null = null;
  generated: Poincon[] = [];
  file: File | null = null;
  existingData: any = null;
}

