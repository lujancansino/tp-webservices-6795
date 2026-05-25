import { TestBed } from "@angular/core/testing";

import { ConversorServices } from "./conversor.services";

describe("ConversorServices", () => {
  let service: ConversorServices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConversorServices);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
