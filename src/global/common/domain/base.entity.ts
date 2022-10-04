import { BeforeInsert, BeforeUpdate, Column } from 'typeorm';
import { LocalDateTime } from '@js-joda/core';
import { LocalDateTimeTransformer } from '../../util/local-date-time.transformer.util';

export abstract class BaseEntity {
  @Column({ name: 'created_at', transformer: new LocalDateTimeTransformer(), type: 'timestamp' })
  createdAt: LocalDateTime;

  @Column({ name: 'updated_at', transformer: new LocalDateTimeTransformer(), type: 'timestamp' })
  updatedAt: LocalDateTime;

  @BeforeInsert()
  protected beforeInsert() {
    this.createdAt = LocalDateTime.now();
    this.updatedAt = LocalDateTime.now();
  }

  @BeforeUpdate()
  protected beforeUpdate() {
    this.updatedAt = LocalDateTime.now();
  }
}
