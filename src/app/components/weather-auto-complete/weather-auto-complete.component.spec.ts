import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherAutoCompleteComponent } from './weather-auto-complete.component';

describe('WeatherAutoCompleteComponent', () => {
  let component: WeatherAutoCompleteComponent;
  let fixture: ComponentFixture<WeatherAutoCompleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeatherAutoCompleteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WeatherAutoCompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
