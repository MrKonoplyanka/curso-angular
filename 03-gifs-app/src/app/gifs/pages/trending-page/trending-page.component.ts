import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, inject, signal, viewChild } from '@angular/core';
import { ListComponent } from '../../components/list/list.component';
import { GifService } from '../../services/gifs.service';
import { ScrollStateService } from '../../shared/services/scroll-state.service';



@Component({
  selector: 'app-trending',
  imports: [ListComponent],
  templateUrl: './trending-page.component.html',

})
export default class TrendingPageComponent implements AfterViewInit{


  gifService = inject (GifService);
  ScrollStateService = inject(ScrollStateService);

  scrollDivRef = viewChild<ElementRef<HTMLDivElement>>('groupDiv');

  ngAfterViewInit(): void {
    const scrollDiv = this.scrollDivRef()?.nativeElement;
    if(!scrollDiv) return;
    scrollDiv.scrollTop = this.ScrollStateService.trendingScrollState();
  }


  onScroll(event:Event){
    const scrollDiv = this.scrollDivRef()?.nativeElement;
    if(!scrollDiv) return;
    const scrollTop = scrollDiv.scrollTop;
    const clientHeight = scrollDiv.clientHeight;
    const scrollHeight = scrollDiv.scrollHeight;

    //console.log(scrollTop, clientHeight, scrollHeight);
    const isAtBottom = (scrollTop + clientHeight) >= (scrollHeight - 50);
    this.ScrollStateService.trendingScrollState.set(scrollTop);

    if(isAtBottom){
      this.gifService.loadTrendingGifs();
    }

  }
  gifs = this.gifService.trendingGifs;
}




