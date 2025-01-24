import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-event',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css']
})
export class CreateEventComponent {
  eventForm: FormGroup;
  selectedFile: File | null = null;
  previewUrl: string | null = null;

  constructor(private fb: FormBuilder) {
    this.eventForm = this.fb.group({
      eventType: ['tournament', Validators.required],
      eventName: ['', Validators.required],
      eventDate: ['', Validators.required],
      eventTime: ['', Validators.required],
      timezone: ['UTC-05:00', Validators.required],
      locationType: ['virtual', Validators.required],
      game: ['valorant', Validators.required],
      platform: ['pc', Validators.required],
      gameMode: ['team', Validators.required],
      teamSize: ['16', Validators.required],
      substitutes: ['', Validators.required]
    });
  }

  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.selectedFile = file;
      const reader = new FileReader();
      reader.onload = () => {
        this.previewUrl = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit(): void {
    if (this.eventForm.valid) {
      console.log(this.eventForm.value);
      // Aquí iría la lógica para enviar el formulario
    }
  }
  
}

