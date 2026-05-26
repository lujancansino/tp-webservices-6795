import { ComponentFixture, TestBed } from "@angular/core/testing";

import { GeneradorQrComponent } from "./generador-qr.component";

describe("GeneradorQrComponent", () => {
  let component: GeneradorQrComponent;
  let fixture: ComponentFixture<GeneradorQrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GeneradorQrComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GeneradorQrComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
