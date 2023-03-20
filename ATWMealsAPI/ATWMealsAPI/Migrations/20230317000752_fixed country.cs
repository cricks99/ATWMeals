using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ATWMealsAPI.Migrations
{
    public partial class fixedcountry : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Countries_Passports_PassportId",
                table: "Countries");

            migrationBuilder.DropIndex(
                name: "IX_Countries_PassportId",
                table: "Countries");

            migrationBuilder.DropColumn(
                name: "PassportId",
                table: "Countries");

            migrationBuilder.AddColumn<int>(
                name: "CountryId",
                table: "Passports",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Passports_CountryId",
                table: "Passports",
                column: "CountryId");

            migrationBuilder.AddForeignKey(
                name: "FK_Passports_Countries_CountryId",
                table: "Passports",
                column: "CountryId",
                principalTable: "Countries",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Passports_Countries_CountryId",
                table: "Passports");

            migrationBuilder.DropIndex(
                name: "IX_Passports_CountryId",
                table: "Passports");

            migrationBuilder.DropColumn(
                name: "CountryId",
                table: "Passports");

            migrationBuilder.AddColumn<int>(
                name: "PassportId",
                table: "Countries",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Countries_PassportId",
                table: "Countries",
                column: "PassportId");

            migrationBuilder.AddForeignKey(
                name: "FK_Countries_Passports_PassportId",
                table: "Countries",
                column: "PassportId",
                principalTable: "Passports",
                principalColumn: "Id");
        }
    }
}
