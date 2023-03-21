using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ATWMealsAPI.Migrations
{
    public partial class flagURLAdd : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "FlagURL",
                table: "Countries",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "FlagURL",
                table: "Countries");
        }
    }
}
