using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ATWMealsAPI.Migrations
{
    public partial class updateincludes : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Favorites_Meals_MealId",
                table: "Favorites");

            migrationBuilder.DropForeignKey(
                name: "FK_MealRatings_Meals_MealId",
                table: "MealRatings");

            migrationBuilder.DropIndex(
                name: "IX_MealRatings_MealId",
                table: "MealRatings");

            migrationBuilder.DropIndex(
                name: "IX_Favorites_MealId",
                table: "Favorites");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_MealRatings_MealId",
                table: "MealRatings",
                column: "MealId");

            migrationBuilder.CreateIndex(
                name: "IX_Favorites_MealId",
                table: "Favorites",
                column: "MealId");

            migrationBuilder.AddForeignKey(
                name: "FK_Favorites_Meals_MealId",
                table: "Favorites",
                column: "MealId",
                principalTable: "Meals",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_MealRatings_Meals_MealId",
                table: "MealRatings",
                column: "MealId",
                principalTable: "Meals",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
