import { injectable } from 'inversify';
import { nanoid } from 'nanoid';

interface RegisterDto {
  email: string;
  name: string;
  password: string;
}

interface LoginDto {
  email: string;
  password: string;
}

@injectable()
export class AuthService {
  // Minimal in-memory store for demo
  private users: Array<{ id: string; email: string; name: string; password: string }> = [];

  async register(dto: RegisterDto) {
    const user = {
      id: nanoid(),
      email: dto.email,
      name: dto.name,
      password: dto.password,
    };
    this.users.push(user);
    return { id: user.id, email: user.email, name: user.name };
  }

  async login(dto: LoginDto) {
    // Very simple authentication for demo only
    const user = this.users.find((u) => u.email === dto.email && u.password === dto.password);
    if (!user) throw new Error('Invalid credentials');
    return `token-${user.id}`;
  }
}
