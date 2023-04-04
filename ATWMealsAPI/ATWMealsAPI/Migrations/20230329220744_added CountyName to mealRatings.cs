using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ATWMealsAPI.Migrations
{
    public partial class addedCountyNametomealRatings : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "CountryName",
                table: "MealRatings",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_MealRatings_MealId",
                table: "MealRatings",
                column: "MealId");

            migrationBuilder.AddForeignKey(
                name: "FK_MealRatings_Meals_MealId",
                table: "MealRatings",
                column: "MealId",
                principalTable: "Meals",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_MealRatings_Meals_MealId",
                table: "MealRatings");

            migrationBuilder.DropIndex(
                name: "IX_MealRatings_MealId",
                table: "MealRatings");

            migrationBuilder.DropColumn(
                name: "CountryName",
                table: "MealRatings");
        }
    }
}
