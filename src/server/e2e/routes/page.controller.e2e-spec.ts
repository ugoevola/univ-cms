const request = require('supertest');
import { HttpStatus } from '@nestjs/common';
import { TestServer } from '../test-server';

import { PageDto } from '../../app/dto/page.dto';

const adminAccount = require('../resources/account/admin.json');

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

    let createdPage: PageDto;

    it('should create page', async () => {
        createdPage = {
            name: 'page_test',
        };

        const res = await request(TestServer.getHttpServer()).post('/api/page')
            .set('auth', JSON.stringify(adminAccount))
            .send(createdPage);
        expect(res.status).toEqual(HttpStatus.CREATED);
        expect(res.body._id).toBeDefined();
        expect(res.body.reference).toBeDefined();
        expect(res.body.createdOn).toBeDefined();
        expect(res.body.name).toEqual(createdPage.name);

        createdPage = res.body;
    });

    it('should modify page', async () => {
        createdPage.name = 'testModifiy';
        const res = await request(TestServer.getHttpServer()).put(`/api/page/${createdPage.reference}`)
            .set('auth', JSON.stringify(adminAccount))
            .send(createdPage)
            .expect(HttpStatus.ACCEPTED);

        expect(res.body._id).toEqual(createdPage._id);
        expect(res.body.name).toEqual(createdPage.name);
        expect(res.body.reference).toEqual(createdPage.reference);
        expect(res.body.updatedOn).toBeDefined();

        createdPage = res.body;
    });

    it('should get page', async () => {
        const res = await request(TestServer.getHttpServer()).get(`/api/page/${createdPage.reference}`)
            .set('auth', JSON.stringify(adminAccount));

        expect(res.status).toEqual(HttpStatus.OK);
        expect(res.body._id).toEqual(createdPage._id);
        expect(res.body.name).toEqual(createdPage.name);
        expect(res.body.reference).toEqual(createdPage.reference);
        expect(res.body.updatedOn).toEqual(createdPage.updatedOn);
        expect(res.body.createdOn).toEqual(createdPage.createdOn);
    });

    it('should not found page', async () => {
        const res = await request(TestServer.getHttpServer()).get(`/api/page/fakeId`)
            .set('auth', JSON.stringify(adminAccount));

        expect(res.status).toEqual(HttpStatus.NOT_FOUND);
    });

    it('should delete page', async () => {
        await request(TestServer.getHttpServer()).delete(`/api/page/${createdPage.reference}`)
            .set('auth', JSON.stringify(adminAccount));

        const res = await request(TestServer.getHttpServer()).get(`/api/page/${createdPage.reference}`)
            .set('auth', JSON.stringify(adminAccount));

        expect(res.status).toEqual(HttpStatus.NOT_FOUND);
    });
});
