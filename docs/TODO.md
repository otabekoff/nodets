// ============================================================================
// Migration workflow:
// ============================================================================
// 1. Initial setup
npm run db:generate // Generate Prisma client

// 2. Create migration
npm run db:migrate // Create and apply migration

// 3. Seed database
npm run db:seed // Run seed script

// 4. Open Prisma Studio
npm run db:studio // Visual database editor

## Cache usagge in service

```ts
// ============================================================================
// Usage Example in Service
// ============================================================================
import { injectable, inject } from 'inversify';
import { TYPES } from '@core/di/types.js';
import { ICacheService } from '@infrastructure/cache/cache.interface.js';

@injectable()
export class UserService {
  constructor(@inject(TYPES.CacheService) private cache: ICacheService) {}

  async getUserById(id: string): Promise<User | null> {
    // Try cache first
    const cacheKey = `user:${id}`;
    const cached = await this.cache.get<User>(cacheKey);

    if (cached) {
      return cached;
    }

    // Fetch from database
    const user = await this.repository.findById(id);

    // Cache for 1 hour
    if (user) {
      await this.cache.set(cacheKey, user, 3600);
    }

    return user;
  }
}
```

why removed npm uninstall jest ts-jest @types/jest mongoose winston morgan? are we using instrad of these? 

Why removed src/core/logger/stream.ts or was it needed and you forgot it? Tell the truth.

What about src/core/types/global.d.ts or did you renamed it to src/core/types/common.types.ts and btw why it is not .d.ts and it is .types.ts?

What about src/core/utils/api.helper.ts, src/core/utils/auth.helper.ts?

What about these? Where are they now, divided according to clean architecture? How?

src/features/auth/auth.controller.ts

src/features/auth/auth.service.ts

src/features/auth/auth.repository.ts

src/features/auth/auth.dto.ts

src/features/auth/auth.v1.ts

src/features/auth/auth.v2.ts

src/features/auth/auth.types.ts

src/features/auth/auth.constants.ts

src/features/auth/auth.validators.ts

And what about src/features/auth/**tests** folder?

And what about these?

src/features/users

src/features/users/controllers

src/features/users/services

src/features/users/dtos

src/features/users/controllers/user.controller.v1.ts

src/features/users/controllers/user.controller.v2.ts

src/features/users/services/user.service.ts

src/features/users/services/user.service.v2.ts

src/features/users/dtos/user.dto.v1.ts

src/features/users/dtos/user.dto.v2.ts

What about src/infrastructure/cache/redis.client.ts?

What has been done to these:

src/tests/features

src/tests/features/users

src/tests/features/auth
