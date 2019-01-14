const request = require('supertest');
import { HttpStatus } from '@nestjs/common';
import { TestServer } from '../test-server';
import { default as adminAccount } from '../resources/account/admin';
import * as lodash from 'lodash';
import { ContentDto } from '../../app/dto/content.dto';
import { ContentType } from '@shared/enum/content-type.enum';

/**
 * Test des différentes routes du PageController
 */
describe('e2e - PageController', () => {

  beforeAll(async () => {
    TestServer.getLogger().info('Starting test');
    try {
      await TestServer.bootstrap();
    } catch (err) {
      TestServer.getLogger().error('Starting test fail', err);
      throw new Error('Starting test fail');
    }
  });

  afterAll(async () => {
    await TestServer.getApplication().close();
  });

  let createdContent: ContentDto;

  it('should create content', async () => {
    createdContent = {
      name: 'page_test',
      description : 'description',
      content: '<p> my content {{test}}</p>',
      type: ContentType.ARTICLE
    };

    const res = await request(TestServer.getHttpServer()).post('/api/content')
      .set('auth', JSON.stringify(adminAccount))
      .send(createdContent);
    expect(res.status).toEqual(HttpStatus.CREATED);
    expect(res.body._id).toBeDefined();
    expect(res.body.reference).toBeDefined();
    expect(res.body.createdOn).toBeDefined();
    expect(res.body.name).toEqual(createdContent.name);
    expect(res.body.content).toEqual(createdContent.content);

    createdContent = res.body;
  });

  it('should not create content with the same name', async () => {
    const newPage = lodash.cloneDeep(createdContent);
    delete newPage._id;
    delete newPage.reference;

    const res = await request(TestServer.getHttpServer()).post('/api/content')
      .set('auth', JSON.stringify(adminAccount))
      .send(newPage);

    expect(res.status).toEqual(HttpStatus.CONFLICT);
    expect(res.body.code).toEqual('already_exist');
  });

  it('should modify content', async () => {
    createdContent.name = 'testModifiy';
    createdContent.content = '<p> new content </p>';

    const res = await request(TestServer.getHttpServer()).put(`/api/content/${createdContent.reference}`)
      .set('auth', JSON.stringify(adminAccount))
      .send(createdContent);

    expect(res.status).toEqual(HttpStatus.OK);
    expect(res.body._id).toEqual(createdContent._id);
    expect(res.body.name).toEqual(createdContent.name);
    expect(res.body.reference).toEqual(createdContent.reference);
    expect(res.body.content).toEqual(createdContent.content);
    expect(res.body.updatedOn).toBeDefined();

    createdContent = res.body;
  });

  it('should get content', async () => {
    const res = await request(TestServer.getHttpServer()).get(`/api/content/${createdContent.reference}`)
      .set('auth', JSON.stringify(adminAccount));

    expect(res.status).toEqual(HttpStatus.OK);
    expect(res.body._id).toEqual(createdContent._id);
    expect(res.body.name).toEqual(createdContent.name);
    expect(res.body.content).toEqual(createdContent.content);
    expect(res.body.reference).toEqual(createdContent.reference);
    expect(res.body.updatedOn).toEqual(createdContent.updatedOn);
    expect(res.body.createdOn).toEqual(createdContent.createdOn);
  });

  it('should not found content', async () => {
    const res = await request(TestServer.getHttpServer()).get(`/api/content/fakeId`)
      .set('auth', JSON.stringify(adminAccount));

    expect(res.status).toEqual(HttpStatus.NOT_FOUND);
  });

  it('should liste content', async () => {
    const res = await request(TestServer.getHttpServer()).get(`/api/content/list`)
      .set('auth', JSON.stringify(adminAccount));

    expect(res.status).toEqual(HttpStatus.OK);
    expect(res.body.length).toEqual(1);
  });

  it('should delete content', async () => {
    await request(TestServer.getHttpServer()).delete(`/api/content/${createdContent.reference}`)
      .set('auth', JSON.stringify(adminAccount));

    const res = await request(TestServer.getHttpServer()).get(`/api/content/${createdContent.reference}`)
      .set('auth', JSON.stringify(adminAccount));

    expect(res.status).toEqual(HttpStatus.NOT_FOUND);
  });
});
