namespace MISA.Entities.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Initial : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Customers",
                c => new
                    {
                        refID = c.Guid(nullable: false, defaultValueSql: "newid()", identity: true),
                        customerId = c.String(nullable: false, maxLength: 128),
                        customerName = c.String(nullable: false),
                        phone = c.String(nullable: false),
                        customerGroup = c.String(),
                        company = c.String(),
                        taxCode = c.String(),
                        andress = c.String(),
                        email = c.String(),
                        membershipCard = c.String(),
                        levelCard = c.String(),
                        born = c.DateTime(nullable: false),
                        note = c.String(),
                        member5food = c.String(),
                        status = c.String(),
                    })
                .PrimaryKey(t => new { t.refID, t.customerId });
            
        }
        
        public override void Down()
        {
            DropTable("dbo.Customers");
        }
    }
}
