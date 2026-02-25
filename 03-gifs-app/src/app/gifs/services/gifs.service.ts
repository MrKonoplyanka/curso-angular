import { HttpClient } from '@angular/common/http';
import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { environment } from '@environments/environment';
import type { GiphyResponse } from '../interfaces/giphy.interfaces';
import { Gif } from '../interfaces/gif.interface';
import { GifMapper } from '../mapper/gif.mapper';
import { map, tap } from 'rxjs';

//Record<string, Gif[]>;


const loadSearchFromLocalStorage = () => {
  const gifsFromLocalStorage = localStorage.getItem('search-gifs') ?? '{}';
  const gifs = JSON.parse(gifsFromLocalStorage);
  return gifs;
}
const loadTrendingFromLocalStorage = () => {
  const gifsFromLocalStorage = localStorage.getItem('trending-gifs') ?? '{}';
  const gifs = JSON.parse(gifsFromLocalStorage);
  return gifs;
}

@Injectable({ providedIn: 'root' })
export class GifService {

  private http = inject(HttpClient);

  trendingGifs = signal<Gif[]>(loadTrendingFromLocalStorage());
  trendingGifsLoading = signal(false);
  offset = signal(0);

  trendingGifGroup = computed<Gif[][]>(() => {

    const groups = [];
    for (let i = 0; i < this.trendingGifs().length; i += 3) {
      groups.push(this.trendingGifs().slice(i, i + 3));
    }

    return groups;

  })

  searchHistory = signal<Record<string, Gif[]>>(loadSearchFromLocalStorage());
  searchHistoryKeys = computed(() => Object.keys(this.searchHistory()));


  saveGifsToLocalStorage = effect(() => {
    localStorage.setItem('search-gifs', JSON.stringify(this.searchHistory()));
    localStorage.setItem('trending-gifs', JSON.stringify(this.trendingGifs()));
  })

  constructor() {
    this.loadTrendingGifs();

  }

  loadTrendingGifs() {

    if (this.trendingGifsLoading()) return;
    this.trendingGifsLoading.set(true);

    this.http.get<GiphyResponse>(`${environment.giphyURL}/gifs/trending`,
      {
        params: {
          api_key: environment.apiKey,
          limit: 20,
          offset: this.offset().toString(),
        }
      }
    ).subscribe((resp) => {
      const gifs = GifMapper.mapGiphyItemsToGifArray(resp.data);
      this.trendingGifs.update(currentGifs => [...currentGifs, ...gifs]);
      this.trendingGifsLoading.set(false);
      this.offset.set(this.offset().valueOf()+20);

    });
  }

  loadsearchGifs(query: string) {
    return this.http.get<GiphyResponse>(`${environment.giphyURL}/gifs/search`,
      {
        params: {
          api_key: environment.apiKey,
          q: query,
          limit: 20,
        }
      }
    ).pipe(
      map(({ data }) => data),
      map((items) => GifMapper.mapGiphyItemsToGifArray(items)),
      tap(items => {
        this.searchHistory.update(history => ({
          ...history,
          [query.toLowerCase()]: items,

        }));

      })
    )
  }
  getHistoryGifs(query: string) {
    return this.searchHistory()[query] ?? [];
  }
}
