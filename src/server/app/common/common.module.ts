import { Module } from '@nestjs/common';
import { UnivCache } from '@common/cache.storage';

const services = [
  UnivCache,
];

@Module({
  imports: [],
  providers: [...services],
  exports : [...services],
})
export class CommonModule {}
