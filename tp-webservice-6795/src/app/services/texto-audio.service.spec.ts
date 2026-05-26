import { TestBed } from "@angular/core/testing";

import { TextoAudioService } from "./texto-audio.service";

describe("TextoAudioService", () => {
  let service: TextoAudioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TextoAudioService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
