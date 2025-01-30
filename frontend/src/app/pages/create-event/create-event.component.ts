import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { EventService } from '../../services/events.service';

interface SocialLink {
  platform: string;
  url: string;
}
@Component({
  selector: 'app-create-event',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css']
})
export class CreateEventComponent implements OnInit {
  currentStep = 0;
  eventservice=inject(EventService)
  coverImage: string | null = null;
  eventForm: FormGroup;
  tournamentFormatForm: FormGroup;
  tournamentRulesForm: FormGroup;
  participantsForm: FormGroup;
  invitedPlayers: string[] = [];
  linksForm: FormGroup;
  socialLinks: SocialLink[] = [];
  showSuccessModal = false;
  coverPhoto = null;
  datafrominputs={
    
    name: '',
    startDate: '',
    startTime: '',
    timezone: '',
    location: '',
    game: '',
    platform: '',
    gameMode: '',
    teamSize: 0 ,
    substitutes: 0 ,
    format: '',
    rules: '',
    mustAcceptRules: false,
    participant: '',
    links: {} as { [key: string]: string }
  }
  participants: string []=[];

  steps = [
    'Descripción general',
    'Formato del torneo',
    'Reglas',
    'Participantes',
    'Links externos'
  ];

  platforms = [
    { name: 'Discord', placeholder: 'Link a Discord' },
    { name: 'Twitch', placeholder: 'Link a Twitch' },
    { name: 'YouTube', placeholder: 'Link a YouTube' },
    { name: 'Instagram', placeholder: 'Link a Instagram' },
    { name: 'Facebook', placeholder: 'Link a Facebook' }
  ];

  constructor(private fb: FormBuilder) {
    this.eventForm = this.fb.group({
      eventType: [''],
      tournamentName: [''],
      startDate: [''],
      startTime: [''],
      timezone: [''],
      locationType: [''],
      gameType: [''],
      platform: [''],
      participantType: [''],
      teamSize: [''],
      substitutesCount: ['']
    });
    this.tournamentFormatForm = this.fb.group({
      matchType: [''],
      phaseType: [''],
      phaseName: [''],
      tournamentOrder: [''],
      participantsCount: [''],
      allowBreaks: [''],
      qualifiersCount: [''],
      positioning: [''],
      additionalSettings: [''],
      enableChatRooms: ['']
    });
    this.tournamentRulesForm = this.fb.group({
      tournamentRules: [''],
      aceptrules: ['']
    });
    
      this.participantsForm = this.fb.group({
        playerInput: ['', Validators.required]
    });

    this.linksForm = this.fb.group({
      linkInput: ['', [Validators.required, Validators.pattern('https?://.+')]]
    });
    
  }

  ngOnInit(): void {}

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    this.coverPhoto= file
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.coverImage = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  setStep(index: number): void {
    this.currentStep = index;
  }
  addPlayer() {
    const playerInput = this.participantsForm.get('playerInput');
    if (playerInput && playerInput.valid) {
      this.invitedPlayers.push(playerInput.value);
      playerInput.reset();
    }
  }

  removePlayer(index: number) {
    this.invitedPlayers.splice(index, 1);
  }
  nextStep(): void {
    if (this.currentStep < this.steps.length - 1) {
      this.currentStep++;
    }
  }
  previousStep(): void {
    if (this.currentStep > 0) {
      this.currentStep--;
    }
  }
  addLink(platform: string) {
    const linkInput = this.linksForm.get('linkInput');
    if (linkInput && linkInput.valid) {
      this.socialLinks.push({
        platform: platform,
        url: linkInput.value
      });
      linkInput.reset();
    }
  }

  removeLink(index: number) {
    this.socialLinks.splice(index, 1);
  }

  createEvent() {
    // Aquí iría la lógica para crear el evento
    console.log('Evento creado con links:', this.socialLinks);
    this.showSuccessModal = true;
    console.log (this.datafrominputs)
    console.log (this.participants)
    const formData = new FormData();
      if (this.coverPhoto){
        formData.append('coverPhoto', this.coverPhoto)
      }
      
      formData.append('name', (this.datafrominputs.name))
      formData.append('startDate', (this.datafrominputs.startDate))
      formData.append('timezone', (this.datafrominputs.timezone))
      formData.append('location', (this.datafrominputs.location))
      formData.append('game', (this.datafrominputs.game))
      formData.append('platform', (this.datafrominputs.platform))
      formData.append('gameMode', (this.datafrominputs.gameMode))
      formData.append('teamSize', JSON.stringify(Number(this.datafrominputs.teamSize)))
      formData.append('substitutes', JSON.stringify(Number(this.datafrominputs.substitutes)))
      formData.append('format', (this.datafrominputs.format))
      formData.append('rules', (this.datafrominputs.rules))
      formData.append('mustAcceptRules', JSON.stringify(this.datafrominputs.mustAcceptRules))
      formData.append('participants', JSON.stringify(this.participants))
      formData.append('links', JSON.stringify(this.datafrominputs.links))
      formData.append('createdBy', '6761bb64d683cd858ecc9bf4' )
      formData.append('teamId', '677dcc2270238dc5fcdb8bbb')
      formData.append('participantsLimit',  JSON.stringify (10))

      this.eventservice.createEvent(formData).subscribe((res: any) => {
      console.log (res)
      })
  }

  viewEvent() {
    this.showSuccessModal = false;
    // Aquí iría la lógica para navegar al evento creado
    console.log('Navegando al evento...');
  }

  closeModal() {
    this.showSuccessModal = false;
  }

  setlocation(location: string) {
  this.datafrominputs.location=location;
  }

  setGameMode(gameMode: string) {
    this.datafrominputs.gameMode=gameMode;
  }
  setFormat(format: string) {
    this.datafrominputs.format=format;
  } 
  setAcceptrules(accept: boolean) {
    this.datafrominputs.mustAcceptRules=accept;
  } 
  addParticipant(participant: string) {
    this.participants.push(participant)
  }
  onchage(){
    console.log(this.datafrominputs.name);
  }
}



