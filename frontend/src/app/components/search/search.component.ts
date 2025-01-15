import { CommonModule } from '@angular/common';
import { SearchService } from '../../services/search.service';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  query: string = '';
  filtersVisible: boolean = false;
  filters: { [key: string]: boolean } = {
    communities: true,
    events: true,
    teams: true,
    users: true,
  };
  noResults: boolean = false;
  results: any = {
    communities: [],
    events: [],
    teams: [],
    users: [],
  };

  constructor(private searchService: SearchService) {}

  onSearch(): void {
    // Evitar búsqueda si el input está vacío
    if (this.query.trim() === '') {
      this.results = { communities: [], events: [], teams: [], users: [] };
      this.noResults = false;
      return; // Salir sin hacer nada si no hay texto
    }

    // Filtrar los tipos seleccionados
    const selectedTypes = Object.keys(this.filters).filter(key => this.filters[key]);

    // Si no hay filtros seleccionados, realizamos una búsqueda general
    if (selectedTypes.length === 0) {
      selectedTypes.push('communities', 'events', 'teams', 'users');
    }

    this.searchService.search(this.query, selectedTypes).subscribe({
      next: (data) => {
        this.results = {
          communities: data.communities || [],
          events: data.events || [],
          teams: data.teams || [],
          users: data.users || [],
        };

        // Comprobar si todos los resultados están vacíos
        this.noResults = Object.values(this.results).every((result: any) => result.length === 0);
      },
      error: (error) => console.error('Error:', error),
    });
  }

  toggleFilter(filter: string, event: Event) {
    this.filters[filter] = (event.target as HTMLInputElement).checked;
    this.onSearch(); // Re-ejecutar búsqueda al cambiar filtros
  }

  toggleFiltersVisibility(): void {
    this.filtersVisible = !this.filtersVisible;
  }
}