import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    const textElements = document.querySelectorAll(
      '.title-f, .title-s, .title-t'
    ) as NodeListOf<HTMLElement>;

    // Reducing subtitle traffic
    const textX = (window.innerWidth / 2 - event.clientX) / 100;
    const textY = (window.innerHeight / 2 - event.clientY) / 100;

    textElements.forEach((element) => {
      element.style.transform = `translate(${textX}px, ${textY}px)`;
    });
  }

  @HostListener('document:mouseleave', ['$event'])
  onMouseLeave() {
    const textElements = document.querySelectorAll(
      '.title-f, .title-s, .title-t'
    ) as NodeListOf<HTMLElement>;

    textElements.forEach((element) => {
      element.style.transform = 'translate(0, 0)';
    });
  }
}
