using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ATWMealsAPI.Migrations
{
    public partial class updatecountry : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Passports_Countries_CountryId",
                table: "Passports");

            migrationBuilder.AlterColumn<int>(
                name: "CountryId",
                table: "Passports",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

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

            migrationBuilder.AlterColumn<int>(
                name: "CountryId",
                table: "Passports",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddForeignKey(
                name: "FK_Passports_Countries_CountryId",
                table: "Passports",
                column: "CountryId",
                principalTable: "Countries",
                principalColumn: "Id");
        }
    }
}
