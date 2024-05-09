import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';

// Donot look at this this module is incomplete. Will complete it later when I find time
describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
