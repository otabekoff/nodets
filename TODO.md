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



And what about src/features/auth/__tests__ folder?



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



