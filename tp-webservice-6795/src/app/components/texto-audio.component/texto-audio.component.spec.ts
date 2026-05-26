import { ComponentFixture, TestBed } from "@angular/core/testing";

import { TextoAudioComponent } from "./texto-audio.component";

describe("TextoAudioComponent", () => {
  let component: TextoAudioComponent;
  let fixture: ComponentFixture<TextoAudioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TextoAudioComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TextoAudioComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
