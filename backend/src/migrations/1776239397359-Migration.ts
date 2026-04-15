import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1776239397359 implements MigrationInterface {
    name = 'Migration1776239397359'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."skills_category_enum" AS ENUM('languages', 'frameworks', 'databases', 'devops', 'tools', 'other')`);
        await queryRunner.query(`CREATE TABLE "skills" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "category" "public"."skills_category_enum" NOT NULL DEFAULT 'other', "iconUrl" character varying, "proficiencyLevel" integer NOT NULL DEFAULT '0', "sortOrder" integer NOT NULL DEFAULT '0', "isVisible" boolean NOT NULL DEFAULT true, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_0d3212120f4ecedf90864d7e298" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "jobs" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "company" character varying NOT NULL, "title" character varying NOT NULL, "description" text, "highlights" text array NOT NULL DEFAULT '{}', "location" character varying, "startDate" date NOT NULL, "endDate" date, "logoUrl" character varying, "companyUrl" character varying, "sortOrder" integer NOT NULL DEFAULT '0', "isVisible" boolean NOT NULL DEFAULT true, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_cf0a6c42b72fcc7f7c237def345" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "education" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "institution" character varying NOT NULL, "degree" character varying NOT NULL, "field" character varying, "startDate" date, "endDate" date, "logoUrl" character varying, "description" text, "sortOrder" integer NOT NULL DEFAULT '0', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_bf3d38701b3030a8ad634d43bd6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."blog_posts_status_enum" AS ENUM('draft', 'published', 'archived')`);
        await queryRunner.query(`CREATE TYPE "public"."blog_posts_source_enum" AS ENUM('manual', 'imported', 'ai_generated')`);
        await queryRunner.query(`CREATE TABLE "blog_posts" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "slug" character varying NOT NULL, "excerpt" text, "content" text NOT NULL, "coverImageUrl" character varying, "originalUrl" character varying, "status" "public"."blog_posts_status_enum" NOT NULL DEFAULT 'draft', "source" "public"."blog_posts_source_enum" NOT NULL DEFAULT 'manual', "readTimeMinutes" integer NOT NULL DEFAULT '0', "viewCount" integer NOT NULL DEFAULT '0', "publishedAt" TIMESTAMP, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_5b2818a2c45c3edb9991b1c7a51" UNIQUE ("slug"), CONSTRAINT "PK_dd2add25eac93daefc93da9d387" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "blog_tags" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "slug" character varying NOT NULL, CONSTRAINT "UQ_eebefefef8fb6e935ba77d0a6ac" UNIQUE ("name"), CONSTRAINT "UQ_afc33ebb304bb6ee9dc0a26c5d9" UNIQUE ("slug"), CONSTRAINT "PK_8880485f371f1892310811845c8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "blog_posts_tags" ("blog_post_id" uuid NOT NULL, "blog_tag_id" uuid NOT NULL, CONSTRAINT "PK_c3389fe83c081d85c6f1aa7e1dd" PRIMARY KEY ("blog_post_id", "blog_tag_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_09f002a4e14d45d2155829f060" ON "blog_posts_tags" ("blog_post_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_6351e724c2b8c2a066acd14c5b" ON "blog_posts_tags" ("blog_tag_id") `);
        await queryRunner.query(`ALTER TABLE "blog_posts_tags" ADD CONSTRAINT "FK_09f002a4e14d45d2155829f060a" FOREIGN KEY ("blog_post_id") REFERENCES "blog_posts"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "blog_posts_tags" ADD CONSTRAINT "FK_6351e724c2b8c2a066acd14c5bc" FOREIGN KEY ("blog_tag_id") REFERENCES "blog_tags"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "blog_posts_tags" DROP CONSTRAINT "FK_6351e724c2b8c2a066acd14c5bc"`);
        await queryRunner.query(`ALTER TABLE "blog_posts_tags" DROP CONSTRAINT "FK_09f002a4e14d45d2155829f060a"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_6351e724c2b8c2a066acd14c5b"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_09f002a4e14d45d2155829f060"`);
        await queryRunner.query(`DROP TABLE "blog_posts_tags"`);
        await queryRunner.query(`DROP TABLE "blog_tags"`);
        await queryRunner.query(`DROP TABLE "blog_posts"`);
        await queryRunner.query(`DROP TYPE "public"."blog_posts_source_enum"`);
        await queryRunner.query(`DROP TYPE "public"."blog_posts_status_enum"`);
        await queryRunner.query(`DROP TABLE "education"`);
        await queryRunner.query(`DROP TABLE "jobs"`);
        await queryRunner.query(`DROP TABLE "skills"`);
        await queryRunner.query(`DROP TYPE "public"."skills_category_enum"`);
    }

}
