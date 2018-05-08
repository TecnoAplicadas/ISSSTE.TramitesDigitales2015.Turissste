﻿namespace ISSSTE.Tramites2015.Common.Security.Migrations
{
    using System;
    using System.Data.Entity.Migrations;

    public partial class RoleDependency : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "admin.IsssteRoleDependency",
                c => new
                {
                    ParentRoleId = c.String(nullable: false, maxLength: 128),
                    ChildRoleId = c.String(nullable: false, maxLength: 128),
                })
                .PrimaryKey(t => new { t.ParentRoleId, t.ChildRoleId })
                .ForeignKey("admin.AspNetRoles", t => t.ParentRoleId)
                .ForeignKey("admin.AspNetRoles", t => t.ChildRoleId)
                .Index(t => t.ParentRoleId)
                .Index(t => t.ChildRoleId);

        }

        public override void Down()
        {
            DropForeignKey("admin.IsssteRoleDependency", "ChildRoleId", "admin.AspNetRoles");
            DropForeignKey("admin.IsssteRoleDependency", "ParentRoleId", "admin.AspNetRoles");
            DropIndex("admin.IsssteRoleDependency", new[] { "ChildRoleId" });
            DropIndex("admin.IsssteRoleDependency", new[] { "ParentRoleId" });
            DropTable("admin.IsssteRoleDependency");
        }
    }
}
